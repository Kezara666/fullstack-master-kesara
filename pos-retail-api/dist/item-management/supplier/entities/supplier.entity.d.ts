import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';
export declare class Supplier {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    shop: Shop;
    createdBy?: User;
    updatedBy?: User;
}
