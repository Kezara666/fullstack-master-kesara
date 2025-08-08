import { Product } from "src/item-management/products/entities/product.entity";
import { QtyType } from "src/inventory-management/qty-type/entities/qty-type.entity";
import { Invoice } from "src/sale-management/invoice/entities/invoice.entity";
import { Shop } from "src/shop-management/shop/entities/shop.entity";
import { User } from "src/shop-management/user/entities/user.entity";
import { ProductPrice } from "src/item-management/product-prices/entities/product-price.entity";
export declare class ItemSell {
    id: number;
    product?: Product;
    productPrice: ProductPrice;
    invoice: Invoice;
    invoiceId: number;
    qtyType?: QtyType;
    qty: number;
    qntPrice: number;
    pendingdAmount: number;
    completedItemSell: boolean;
    createdAt: Date;
    updatedAt: Date;
    shop: Shop;
    createdBy: User;
    updatedBy: User;
}
