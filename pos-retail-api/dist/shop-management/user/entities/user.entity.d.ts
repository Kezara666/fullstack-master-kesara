import { Shop } from '../../shop/entities/shop.entity';
export declare class User {
    id: number;
    name: string;
    userName: string;
    password: string;
    email?: string;
    phoneNumber?: string;
    idNumber?: string;
    role?: string;
    createdAt: Date;
    updatedAt: Date;
    shop: Shop;
    shopId: number;
}
