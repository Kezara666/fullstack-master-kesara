import { Customer } from "src/sale-management/customer/entities/customer.entity";
import { ItemSell } from "src/sale-management/item-sell/entities/item-sell.entity";
import { Shop } from "src/shop-management/shop/entities/shop.entity";
import { User } from "src/shop-management/user/entities/user.entity";
export declare class Invoice {
    id: number;
    itemsSelled: ItemSell[];
    customer?: Customer;
    total: number;
    status: number;
    discount: number;
    netTotal: number;
    completedItemSell: boolean;
    createdAt: Date;
    updatedAt: Date;
    shop: Shop;
    createdBy?: User;
    updatedBy?: User;
}
