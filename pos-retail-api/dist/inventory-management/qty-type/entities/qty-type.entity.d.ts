import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';
export declare class QtyType {
    id: number;
    name: string;
    mainQty?: QtyType;
    primaryWeightTo: number;
    shop: Shop;
    createdBy: User;
    updatedBy: User;
    createdAt: Date;
    updatedAt: Date;
}
