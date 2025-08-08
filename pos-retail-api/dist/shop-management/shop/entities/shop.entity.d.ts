import { User } from '../../user/entities/user.entity';
import { Supplier } from 'src/item-management/supplier/entities/supplier.entity';
export declare class Shop {
    id: number;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    users: User[];
    suppliers: Supplier[];
}
