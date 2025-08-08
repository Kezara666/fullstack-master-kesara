import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductPrice } from './entities/product-price.entity';
import { CreateProductPriceDto } from './dto/create-product-price.dto';
import { UpdateProductPriceDto } from './dto/update-product-price.dto';
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ProductPriceService {
  constructor(
    @InjectRepository(ProductPrice)
    private readonly productPriceRepository: Repository<ProductPrice>,
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductPriceDto: CreateProductPriceDto): Promise<ProductPrice> {
    const {
      productId,
      shopId,
      createdById,
      updatedById,
      ...rest
    } = createProductPriceDto;

    const [product, shop, createdBy, updatedBy] = await Promise.all([
      this.productRepository.findOneBy({ id: productId }),
      this.shopRepository.findOneBy({ id: shopId }),
      this.userRepository.findOneBy({ id: createdById }),
      this.userRepository.findOneBy({ id: updatedById }),
    ]);

    if (!product || !shop || !createdBy || !updatedBy) {
      throw new Error('Invalid references found');
    }

    const price = this.productPriceRepository.create({
      ...rest,
      product,
      shop,
      createdBy,
      updatedBy,
    });

    return await this.productPriceRepository.save(price);
  }

  async findAll(): Promise<ProductPrice[]> {
    return await this.productPriceRepository.find({
      relations: ['product', 'shop', 'createdBy', 'updatedBy'],
    });
  }

  async findByShop(shopId: number): Promise<ProductPrice[]> {
    return await this.productPriceRepository.find({
      where: { shop: { id: shopId } },
      relations: ['product', 'shop', 'createdBy', 'updatedBy'],
    });
  }

  async findOne(id: number): Promise<ProductPrice> {
    return await this.productPriceRepository.findOneOrFail({
      where: { id },
      relations: ['product', 'shop', 'createdBy', 'updatedBy'],
    });
  }

  async update(id: number, updateProductPriceDto: UpdateProductPriceDto): Promise<ProductPrice> {
    const price = await this.productPriceRepository.findOne({
      where: { id },
      relations: ['product', 'shop', 'updatedBy'],
    });

    if (!price) {
      throw new Error(`ProductPrice with ID ${id} not found`);
    }

    const { productId, shopId, updatedById, ...rest } = updateProductPriceDto;

    // Update basic fields
    Object.assign(price, rest);

    // Update product relation if provided
    if (productId !== undefined) {
      const product = await this.productRepository.findOneBy({ id: productId });
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      price.product = product;
    }

    // Update shop relation if provided
    if (shopId !== undefined) {
      const shop = await this.shopRepository.findOneBy({ id: shopId });
      if (!shop) {
        throw new Error(`Shop with ID ${shopId} not found`);
      }
      price.shop = shop;
    }

    // Update updatedBy relation if provided
    if (updatedById !== undefined) {
      const user = await this.userRepository.findOneBy({ id: updatedById });
      if (!user) {
        throw new Error(`User with ID ${updatedById} not found`);
      }
      price.updatedBy = user;
    }

    await this.productPriceRepository.save(price);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.productPriceRepository.delete(id);
  }
}