import { Repository } from 'typeorm';
import { ProductPrice } from './entities/product-price.entity';
import { CreateProductPriceDto } from './dto/create-product-price.dto';
import { UpdateProductPriceDto } from './dto/update-product-price.dto';
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';
import { Product } from '../products/entities/product.entity';
export declare class ProductPriceService {
    private readonly productPriceRepository;
    private readonly shopRepository;
    private readonly userRepository;
    private readonly productRepository;
    constructor(productPriceRepository: Repository<ProductPrice>, shopRepository: Repository<Shop>, userRepository: Repository<User>, productRepository: Repository<Product>);
    create(createProductPriceDto: CreateProductPriceDto): Promise<ProductPrice>;
    findAll(): Promise<ProductPrice[]>;
    findByShop(shopId: number): Promise<ProductPrice[]>;
    findOne(id: number): Promise<ProductPrice>;
    update(id: number, updateProductPriceDto: UpdateProductPriceDto): Promise<ProductPrice>;
    remove(id: number): Promise<void>;
}
