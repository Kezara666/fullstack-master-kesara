import { Product } from 'src/item-management/products/entities/product.entity';
import { QtyType } from 'src/inventory-management/qty-type/entities/qty-type.entity';
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';
export declare class Qty {
    id: number;
    product?: Product;
    qtyType?: QtyType;
    qty: number;
    createdAt: Date;
    updatedAt: Date;
    shop: Shop;
    createdBy?: User;
    updatedBy?: User;
}
