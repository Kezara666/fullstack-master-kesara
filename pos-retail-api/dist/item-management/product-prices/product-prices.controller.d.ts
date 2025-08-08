import { CreateProductPriceDto } from './dto/create-product-price.dto';
import { UpdateProductPriceDto } from './dto/update-product-price.dto';
import { ProductPriceService } from './product-prices.service';
export declare class ProductPriceController {
    private readonly service;
    constructor(service: ProductPriceService);
    create(dto: CreateProductPriceDto): Promise<import("./entities/product-price.entity").ProductPrice>;
    findAll(): Promise<import("./entities/product-price.entity").ProductPrice[]>;
    findByShop(shopId: number): Promise<import("./entities/product-price.entity").ProductPrice[]>;
    findOne(id: number): Promise<import("./entities/product-price.entity").ProductPrice>;
    update(id: number, dto: UpdateProductPriceDto): Promise<import("./entities/product-price.entity").ProductPrice>;
    remove(id: number): Promise<void>;
}
