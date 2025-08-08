import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';


@Injectable()
export class SupplierService {
    constructor(
        @InjectRepository(Supplier)
        private readonly supplierRepository: Repository<Supplier>,
        @InjectRepository(Shop)
        private readonly shopRepository: Repository<Shop>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
        const { name, shopId, createdById } = createSupplierDto;

        const [shop, createdBy] = await Promise.all([
            this.shopRepository.findOneBy({ id: shopId }),
            this.userRepository.findOneBy({ id: createdById }),
        ]);

        if (!shop || !createdBy) {
            throw new Error('Shop or User not found');
        }

        const supplier = this.supplierRepository.create({
            name,
            shop,
            createdBy,
            updatedBy: createdBy,
        });

        return await this.supplierRepository.save(supplier);
    }

    async findAllSpecificShop(id: number): Promise<Supplier[]> {
        return await this.supplierRepository.find({
            where: { shop: { id } },
            relations: ['shop', 'createdBy', 'updatedBy'],
        });
    }

    async update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
        const { name, shopId, updatedById } = updateSupplierDto;

        const supplier = await this.supplierRepository.findOne({
            where: { id },
            relations: ['shop', 'updatedBy'],
        });

        if (!supplier) {
            throw new Error('Supplier not found');
        }

        if (shopId) {
            const shop = await this.shopRepository.findOneBy({ id: shopId });
            if (!shop) throw new Error('Shop not found');
            supplier.shop = shop;
        }

        if (updatedById) {
            const updatedBy = await this.userRepository.findOneBy({ id: updatedById });
            if (!updatedBy) throw new Error('User not found');
            supplier.updatedBy = updatedBy;
        }

        if (name) supplier.name = name;

        return await this.supplierRepository.save(supplier);
    }

    async findAll(): Promise<Supplier[]> {
        return await this.supplierRepository.find({
            relations: ['shop', 'createdBy', 'updatedBy'],
        });
    }

    async findOne(id: number): Promise<Supplier> {
        return await this.supplierRepository.findOne({
            where: { id },
            relations: ['shop', 'createdBy', 'updatedBy'],
        });
    }

    async remove(id: number): Promise<void> {
        await this.supplierRepository.delete(id);
    }
}