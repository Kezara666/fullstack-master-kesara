import { QtyType } from 'src/inventory-management/qty-type/entities/qty-type.entity';
import { ProductPrice } from 'src/item-management/product-prices/entities/product-price.entity';
import { Supplier } from 'src/item-management/supplier/entities/supplier.entity';
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';
export declare class Product {
    id: number;
    name: string;
    description: string;
    barCode: string;
    qrCode: string;
    category: string;
    subcategory: string;
    currentPrice: number;
    warranty: number;
    supplier: Supplier;
    productPrice: ProductPrice;
    qtyType: QtyType;
    qty: number;
    shop: Shop;
    createdBy: User;
    updatedBy: User;
    createdAt: Date;
    updatedAt: Date;
}
