import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';
export declare class SupplierService {
    private readonly supplierRepository;
    private readonly shopRepository;
    private readonly userRepository;
    constructor(supplierRepository: Repository<Supplier>, shopRepository: Repository<Shop>, userRepository: Repository<User>);
    create(createSupplierDto: CreateSupplierDto): Promise<Supplier>;
    findAllSpecificShop(id: number): Promise<Supplier[]>;
    update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<Supplier>;
    findAll(): Promise<Supplier[]>;
    findOne(id: number): Promise<Supplier>;
    remove(id: number): Promise<void>;
}
