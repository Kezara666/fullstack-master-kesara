import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { User } from 'src/shop-management/user/entities/user.entity';
import { Supplier } from 'src/item-management/supplier/entities/supplier.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) { }

  create(createShopDto: CreateShopDto): Promise<Shop> {
    const shop = this.shopRepository.create(createShopDto);
    return this.shopRepository.save(shop);
  }

  findAll(): Promise<Shop[]> {
    return this.shopRepository.find({ relations: ['users'] });
  }

  findOne(id: number): Promise<Shop> {
    return this.shopRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  update(id: number, updateShopDto: UpdateShopDto): Promise<Shop> {
    return this.shopRepository.save({ id, ...updateShopDto });
  }

  async remove(id: number): Promise<void> {
  // Step 1: Delete all suppliers related to the shop
  await this.supplierRepository.delete({ shop: { id } });

  // Step 2: Delete users associated with the shop
  await this.userRepository.delete({ shopId: id });

  // Step 3: Delete the shop itself
  await this.shopRepository.delete(id);
}
}
