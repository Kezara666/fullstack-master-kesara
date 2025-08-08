import { Repository } from 'typeorm';
import { QtyType } from './entities/qty-type.entity';
import { CreateQtyTypeDto } from './dto/create-qty-type.dto';
import { UpdateQtyTypeDto } from './dto/update-qty-type.dto';
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';
export declare class QtyTypeService {
    private readonly qtyTypeRepository;
    private readonly shopRepository;
    private readonly userRepository;
    constructor(qtyTypeRepository: Repository<QtyType>, shopRepository: Repository<Shop>, userRepository: Repository<User>);
    create(createDto: CreateQtyTypeDto): Promise<QtyType>;
    findByShop(shopId: number): Promise<QtyType[]>;
    findAll(): Promise<QtyType[]>;
    findOne(id: number): Promise<QtyType>;
    update(id: number, updateDto: UpdateQtyTypeDto): Promise<QtyType>;
    remove(id: number): Promise<void>;
}
