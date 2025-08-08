import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Shop } from '../shop/entities/shop.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly shopRepository;
    constructor(userRepository: Repository<User>, shopRepository: Repository<Shop>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findOneByUserNameAndPassword(userName: string, password: string): Promise<User | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
}
