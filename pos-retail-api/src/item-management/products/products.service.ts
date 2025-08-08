import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QtyType } from '../../inventory-management/qty-type/entities/qty-type.entity';
import { Supplier } from '../supplier/entities/supplier.entity';
import { ProductPrice } from '../product-prices/entities/product-price.entity';
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';
import { Qty } from 'src/inventory-management/qty/entities/qty.entity';
import { CreateProductWithDependenciesDto } from './dto/create-product-with-dependencies.dto';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductPrice)
    private readonly productPriceRepository: Repository<ProductPrice>,
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
    @InjectRepository(QtyType)
    private readonly qtyTypeRepository: Repository<QtyType>,
    @InjectRepository(Qty)
    private readonly qtyRepository: Repository<Qty>,
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const {
      supplierId,
      qtyTypeId,
      productPriceId,
      shopId,
      createdById,
      updatedById,
      ...rest
    } = createProductDto;

    const [supplier, qtyType, shop, createdBy, updatedBy] = await Promise.all([
      this.supplierRepository.findOneBy({ id: supplierId }),
      this.qtyTypeRepository.findOneBy({ id: qtyTypeId }),
      this.shopRepository.findOneBy({ id: shopId }),
      this.userRepository.findOneBy({ id: createdById }),
      this.userRepository.findOneBy({ id: updatedById }),
    ]);

    if (!supplier || !qtyType || !shop || !createdBy || !updatedBy) {
      throw new NotFoundException('Invalid references found');
    }

    let productPrice = null;
    if (productPriceId !== undefined) {
      productPrice = await this.productPriceRepository.findOneBy({ id: productPriceId });
      if (!productPrice) {
        throw new NotFoundException(`ProductPrice with ID ${productPriceId} not found`);
      }
    }

    const product = this.productRepository.create({
      ...rest,
      supplier,
      qtyType,
      productPrice,
      shop,
      createdBy,
      updatedBy,
    });

    return await this.productRepository.save(product);
  }

  async createProductWithDependencies(
    createDto: CreateProductWithDependenciesDto,
  ): Promise<Product> {
    return this.entityManager.transaction(async transactionalEntityManager => {
      const supplier = await transactionalEntityManager.findOneBy(Supplier, { id: createDto.supplierId });
      if (!supplier) {
        throw new NotFoundException(`Supplier with ID ${createDto.supplierId} not found.`);
      }

      const qtyType = await transactionalEntityManager.findOneBy(QtyType, { id: createDto.qtyTypeId });
      if (!qtyType) {
        throw new NotFoundException(`Quantity Type with ID ${createDto.qtyTypeId} not found.`);
      }

      const shop = await transactionalEntityManager.findOneBy(Shop, { id: createDto.shopId });
      if (!shop) {
        throw new NotFoundException(`Shop with ID ${createDto.shopId} not found.`);
      }

      const createdBy = await transactionalEntityManager.findOneBy(User, { id: createDto.createdById });
      if (!createdBy) {
        throw new NotFoundException(`User with ID ${createDto.createdById} (created by) not found.`);
      }

      const updatedBy = await transactionalEntityManager.findOneBy(User, { id: createDto.updatedById });
      if (!updatedBy) {
        throw new NotFoundException(`User with ID ${createDto.updatedById} (updated by) not found.`);
      }

      const productToCreate = transactionalEntityManager.create(Product, {
        name: createDto.name,
        description: createDto.description,
        barCode: createDto.barCode,
        qrCode: createDto.qrCode,
        category: createDto.category,
        subcategory: createDto.subcategory,
        currentPrice: createDto.currentPrice,
        warranty: createDto.warranty,
        qty: createDto.qty,
        shop: shop,
        createdBy: createdBy,
        updatedBy: updatedBy,
        supplier: supplier,
        qtyType: qtyType,
        createdAt: new Date(),
        updatedAt : new Date()
      });

      const savedProduct = await transactionalEntityManager.save(productToCreate);

      const productPriceToCreate = transactionalEntityManager.create(ProductPrice, {
        ...createDto.productPrice,
        product: savedProduct,
        shop: shop,
        createdBy: createdBy,
        updatedBy: updatedBy
      });

      const savedProductPrice = await transactionalEntityManager.save(productPriceToCreate);

      savedProduct.productPrice = savedProductPrice;
      savedProduct.currentPrice = savedProductPrice.primarySalePrice;

      await transactionalEntityManager.save(savedProduct);

      const qtyToCreate = transactionalEntityManager.create(Qty, {
        product: savedProduct,
        qtyType: qtyType,
        qty: createDto.qtyData.qty,
        shop: shop,
        createdBy: createdBy,
        updatedBy: updatedBy
      });

      await transactionalEntityManager.save(qtyToCreate);

      return savedProduct;
    });
  }


  async findAll(): Promise<Product[]> {
    const product =  await this.productRepository.find({
      relations: ['supplier', 'qtyType', 'shop', 'createdBy', 'updatedBy','productPrice'],
    });
    if (!product) {
      throw new NotFoundException(`Product Not Founds`);
    }
    return product;
  }

  async findByShop(shopId: number): Promise<Product[]> {
    const product =  await this.productRepository.find({
      where: { shop: { id: shopId } },
      relations: ['supplier', 'qtyType', 'shop', 'createdBy', 'updatedBy','productPrice'],
    });

    if (!product) {
      throw new NotFoundException(`Product Not Founds`);
    }
    return product;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['supplier', 'qtyType', 'productPrice', 'shop', 'createdBy', 'updatedBy','productPrice'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['supplier', 'qtyType', 'productPrice', 'shop', 'createdBy', 'updatedBy','productPrice'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const {
      supplierId,
      qtyTypeId,
      productPriceId,
      shopId,
      updatedById,
      ...rest
    } = updateProductDto;

    // Update basic fields
    Object.assign(product, rest);

    // Handle Supplier
    if (supplierId !== undefined) {
      const supplier = await this.supplierRepository.findOneBy({ id: supplierId });
      if (!supplier) {
        throw new NotFoundException(`Supplier with ID ${supplierId} not found`);
      }
      product.supplier = supplier;
    }

    // Handle QtyType
    if (qtyTypeId !== undefined) {
      const qtyType = await this.qtyTypeRepository.findOneBy({ id: qtyTypeId });
      if (!qtyType) {
        throw new NotFoundException(`QtyType with ID ${qtyTypeId} not found`);
      }
      product.qtyType = qtyType;
    }

    // Handle ProductPrice
    if (productPriceId !== undefined) {
      const productPrice = await this.productPriceRepository.findOneBy({ id: productPriceId });
      if (!productPrice) {
        throw new NotFoundException(`ProductPrice with ID ${productPriceId} not found`);
      }
      product.productPrice = productPrice;
    }

    // Handle Shop
    if (shopId !== undefined) {
      const shop = await this.shopRepository.findOneBy({ id: shopId });
      if (!shop) {
        throw new NotFoundException(`Shop with ID ${shopId} not found`);
      }
      product.shop = shop;
    }

    // Handle Updated By
    if (updatedById !== undefined) {
      const updatedBy = await this.userRepository.findOneBy({ id: updatedById });
      if (!updatedBy) {
        throw new NotFoundException(`User with ID ${updatedById} not found`);
      }
      product.updatedBy = updatedBy;
    }

    await this.productRepository.save(product);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    // Step 1: Find the product first
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['productPrice'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Step 2: Clear link to ProductPrice before deleting it
    if (product.productPrice) {
      product.productPrice = null;
      await this.productRepository.save(product);
    }

    // Step 3: Delete all ProductPrice entries linked to this product
    await this.productPriceRepository.delete({ productId: id });

    // Step 4: Delete Qty entries linked to this product
    await this.qtyRepository.delete({ product: { id } });

    // Step 5: Delete the product itself
    await this.productRepository.delete(id);
  }

  async setProductCurrentPrice(productPriceId: number): Promise<void> {
    const price = await this.productPriceRepository.findOneBy({ id: productPriceId });
    if (!price) {
      throw new Error(`ProductPrice not found for ID: ${productPriceId}`);
    }

    const product = await this.productRepository.findOneBy({ id: price.productId });
    if (!product) {
      throw new Error(`Product not found for price ID: ${price.id}`);
    }

    product.currentPrice = price.primarySalePrice;
    product.productPrice = price;

    await this.productRepository.save(product);
  }
}