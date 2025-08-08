import { Product } from "src/item-management/products/entities/product.entity";
import { Shop } from "src/shop-management/shop/entities/shop.entity";
import { User } from "src/shop-management/user/entities/user.entity";
export declare class ProductPrice {
    id: number;
    wholeSalePrice: number;
    broughtPrice: number;
    primarySalePrice: number;
    productId: number;
    product: Product;
    shop: Shop;
    createdBy: User;
    updatedBy: User;
    createdAt: Date;
    updatedAt: Date;
}
