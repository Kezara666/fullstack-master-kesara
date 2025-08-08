import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQtyDto } from './dto/create-qty.dto';
import { UpdateQtyDto } from './dto/update-qty.dto';
import { Qty } from './entities/qty.entity';
import { Product } from 'src/item-management/products/entities/product.entity';
import { QtyType } from 'src/inventory-management/qty-type/entities/qty-type.entity';
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';

@Injectable()
export class QtyService {
  constructor(
    @InjectRepository(Qty)
    private readonly qtyRepository: Repository<Qty>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(QtyType)
    private readonly qtyTypeRepository: Repository<QtyType>,
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createQtyDto: CreateQtyDto): Promise<Qty> {
    const { productId, qtyTypeId, qty, shopId, createdById, updatedById } = createQtyDto;

    return await this.productRepository.manager.transaction(async (transactionalEntityManager) => {
      // Fetch all necessary entities in parallel within the transaction
      const [product, qtyType, shop, createdBy, updatedBy] = await Promise.all([
        transactionalEntityManager.findOneBy(Product, { id: productId }),
        transactionalEntityManager.findOneBy(QtyType, { id: qtyTypeId }),
        transactionalEntityManager.findOneBy(Shop, { id: shopId }),
        transactionalEntityManager.findOneBy(User, { id: createdById }),
        transactionalEntityManager.findOneBy(User, { id: updatedById }),
      ]);

      // Validate references
      if (!product || !qtyType || !shop || !createdBy || !updatedBy) {
        throw new Error('Invalid references found');
      }

      // Calculate new total quantity
      const totalQty = product.qty + qty;

      // Update product quantity
      await transactionalEntityManager.update(Product, { id: productId }, { qty: totalQty });

      // Create new Qty record
      const qtyRecord = transactionalEntityManager.create(Qty, {
        product,
        qtyType,
        qty,
        shop,
        createdBy,
        updatedBy,
      });

      // Save and return the new Qty record
      return await transactionalEntityManager.save(Qty, qtyRecord);
    });
  }


  async findAll(): Promise<Qty[]> {
    return await this.qtyRepository.find({
      relations: ['product', 'qtyType', 'shop', 'createdBy', 'updatedBy'],
    });
  }

  async findByShop(shopId: number): Promise<Qty[]> {
    // Optional: Check if the shop exists
    const shopExists = await this.shopRepository.exists({ where: { id: shopId } });
    if (!shopExists) {
      throw new NotFoundException(`Shop with ID ${shopId} not found.`);
    }

    const qtys = await this.qtyRepository.find({
      where: {
        shop: { id: shopId }, // Filter by the shop relation's ID
      },
      relations: ['product', 'qtyType', 'shop', 'createdBy', 'updatedBy'], // Include relevant relations
    });


    return qtys;
  }

  async findOne(id: number): Promise<Qty> {
    return await this.qtyRepository.findOne({
      where: { id },
      relations: ['product', 'qtyType', 'shop', 'createdBy', 'updatedBy'],
    });
  }

  async update(id: number, updateQtyDto: UpdateQtyDto): Promise<Qty> {
    const qtyRecord = await this.qtyRepository.findOne({
      where: { id },
      relations: ['product', 'qtyType', 'shop', 'updatedBy'],
    });

    if (!qtyRecord) throw new Error('Qty record not found');

    const { productId, qtyTypeId, qty, shopId, updatedById } = updateQtyDto;

    if (productId) qtyRecord.product = await this.productRepository.findOneBy({ id: productId });
    if (qtyTypeId) qtyRecord.qtyType = await this.qtyTypeRepository.findOneBy({ id: qtyTypeId });
    if (qty !== undefined) qtyRecord.qty = qty;
    if (shopId) qtyRecord.shop = await this.shopRepository.findOneBy({ id: shopId });
    if (updatedById) qtyRecord.updatedBy = await this.userRepository.findOneBy({ id: updatedById });

    return await this.qtyRepository.save(qtyRecord);
  }

  async remove(id: number): Promise<void> {
    await this.qtyRepository.delete(id);
  }
}