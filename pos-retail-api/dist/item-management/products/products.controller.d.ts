import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { CreateProductWithDependenciesDto } from './dto/create-product-with-dependencies.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<Product>;
    createWithDependencies(createDto: CreateProductWithDependenciesDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findByShop(shopId: number): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<void>;
    setCurrentPrice(productId: string, productPriceId: number): Promise<void>;
}
