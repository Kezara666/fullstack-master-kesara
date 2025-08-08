import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Shop } from '../shop/entities/shop.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const shop = await this.shopRepository.findOneBy({ id: createUserDto.shopId });
    const user = this.userRepository.create({ ...createUserDto, shop });
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['shop'] });
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['shop'],
    });
  }

  async findOneByUserNameAndPassword(userName: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { userName },
      relations: ['shop'],
    });

    if (!user) {
      return null;
    }

    // Compare provided password with hashed password
    //const isPasswordValid = await crypto.compare(password, user.password);
    if (password && user.password === password) {
      return user;
    } else {
      return null
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.shopId) {
      const shop = await this.shopRepository.findOneBy({ id: updateUserDto.shopId });
      updateUserDto['shop'] = shop;
    }
    return this.userRepository.save({ id, ...updateUserDto });
  }

  remove(id: number): Promise<void> {
    return this.userRepository.delete(id).then();
  }
}
