import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { async } from "rxjs";
import { Product } from "src/item-management/products/entities/product.entity";
import { Repository } from "typeorm";
import { ItemSell } from "../item-sell/entities/item-sell.entity";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";
import { Invoice } from "./entities/invoice.entity";
import { Shop } from "src/shop-management/shop/entities/shop.entity";
import { User } from "src/shop-management/user/entities/user.entity";
import { Customer } from "../customer/entities/customer.entity";
import { QtyType } from "src/inventory-management/qty-type/entities/qty-type.entity";
import { ProductPrice } from "src/item-management/product-prices/entities/product-price.entity";

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(ItemSell)
    private itemSellRepository: Repository<ItemSell>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const queryRunner = this.invoiceRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Step 1: Create and save invoice
      const { itemsSelled: itemsSelledDtos, ...invoiceData } = createInvoiceDto;

      const [shop, createdBy, updatedBy, customer] = await Promise.all([
        queryRunner.manager.findOneBy(Shop, { id: invoiceData.shopId }),
        queryRunner.manager.findOneBy(User, { id: invoiceData.createdById }),
        queryRunner.manager.findOneBy(User, { id: invoiceData.updatedById }),
        invoiceData.customerId ? queryRunner.manager.findOneBy(Customer, { id: invoiceData.customerId }) : null,
      ]);

      if (!shop || !createdBy || !updatedBy) {
        throw new NotFoundException('Invalid shop, createdBy, or updatedBy references');
      }

      // Step 2: Create invoice data
      const completeInvoiceData = {
        total: invoiceData.total || 0, // Will be updated later
        discount: invoiceData.discount || 0,
        netTotal: invoiceData.netTotal || 0, // Will be updated later
        completedItemSell: invoiceData.completedItemSell ?? true,
        createdAt: invoiceData.createdAt || new Date(),
        updatedAt: invoiceData.updatedAt || new Date(),
        shop,
        createdBy,
        updatedBy,
        customer: customer || null,
      };

      // Create and save invoice
      const invoice = queryRunner.manager.create(Invoice, completeInvoiceData);
      const savedInvoice = await queryRunner.manager.save(Invoice, invoice);


      let total = 0;

      // Step 2: Process each item in itemsSelled
      for (const itemDto of itemsSelledDtos) {
        const [product, qtyType, productPrice] = await Promise.all([
          queryRunner.manager.findOne(Product, {
            where: { id: itemDto.productId },
            relations: ['qtyType'],
          }),
          queryRunner.manager.findOneBy(QtyType, { id: itemDto.qtyTypeId }),
          itemDto.productPriceId ? queryRunner.manager.findOneBy(ProductPrice, { id: itemDto.productPriceId }) : null,
        ]);

        if (!product) {
          throw new NotFoundException(`Product with ID ${itemDto.productId} not found`);
        }
        if (!qtyType) {
          throw new NotFoundException(`QtyType with ID ${itemDto.qtyTypeId} not found`);
        }
        if (itemDto.productPriceId && !productPrice) {
          throw new NotFoundException(`ProductPrice with ID ${itemDto.productPriceId} not found`);
        }

        if (product.qty < itemDto.qty) {
          throw new Error(`Insufficient stock for product ${product.name}`);
        }

        // Deduct quantity from product (temporary)
        product.qty -= itemDto.qty;
        await queryRunner.manager.save(Product, product);


        // Create ItemSell
        const itemSell = queryRunner.manager.create(ItemSell, {
          qty: itemDto.qty,
          qntPrice: itemDto.qntPrice,
          product,
          productPrice: productPrice || null,
          invoiceId: savedInvoice.id, // Ensure invoiceId is set correctly
          invoice: await queryRunner.manager.findOneBy(Invoice, { id: savedInvoice.id }),
          qtyType,
          pendingAmount: itemDto.pendingdAmount || 0,
          completedItemSell: itemDto.completedItemSell ?? true,
          shop: shop,
          createdBy: createdBy,
          updatedBy: updatedBy
        });

        console.log('itemSell before save:', { ...itemSell, invoiceId: itemSell.invoice.id });
        const savedItemSell = await queryRunner.manager.save(ItemSell, itemSell);
        console.log('itemSell after save:', { ...savedItemSell, invoiceId: savedItemSell.invoice });

        total += itemSell.qntPrice;
      }

      // Step 3: Update invoice total
      savedInvoice.total = total;
      savedInvoice.netTotal = total - savedInvoice.discount;
      await queryRunner.manager.save(savedInvoice);

      // Commit transaction
      await queryRunner.commitTransaction();

      // Step 4: Return the updated invoice with relations
      return await this.invoiceRepository.findOne({
        where: { id: savedInvoice.id },
        relations: {
          itemsSelled: {
            product: true,
            qtyType: true,
            productPrice: true
          },
        },
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Invoice[]> {
    return await this.invoiceRepository.find({
      relations: {
        itemsSelled: {
          product: true,
          qtyType: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['itemsSelled', 'itemsSelled.product'],
    });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return invoice;
  }

  async findByShopId(shopId: number): Promise<Invoice[]> {
    const invoices = await this.invoiceRepository.find({
      where: {
        shop: { id: shopId },
      },
      relations: {
        itemsSelled: {
          product: true,
          qtyType: true,
          productPrice: true,
        },
        shop: true,
        createdBy: true,
        updatedBy: true,
        customer: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (!invoices || invoices.length === 0) {
      throw new NotFoundException(`No invoices found for shop ID ${shopId}`);
    }

    return invoices;
  }


  async update(id: number, updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({ where: { id } });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    await this.invoiceRepository.update(id, updateInvoiceDto);
    return await this.invoiceRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const invoice = await this.invoiceRepository.findOne({ where: { id } });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    await this.invoiceRepository.remove(invoice);
  }
}
