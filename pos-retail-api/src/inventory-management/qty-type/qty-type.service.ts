import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QtyType } from './entities/qty-type.entity';
import { CreateQtyTypeDto } from './dto/create-qty-type.dto';
import { UpdateQtyTypeDto } from './dto/update-qty-type.dto';
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';

@Injectable()
export class QtyTypeService {
    constructor(
        @InjectRepository(QtyType)
        private readonly qtyTypeRepository: Repository<QtyType>,
        @InjectRepository(Shop)
        private readonly shopRepository: Repository<Shop>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createDto: CreateQtyTypeDto): Promise<QtyType> {
        const { name, mainQtyId, primaryWeightTo, shopId, createdById, updatedById } = createDto;

        const [shop, createdBy, updatedBy] = await Promise.all([
            this.shopRepository.findOneBy({ id: shopId }),
            this.userRepository.findOneBy({ id: createdById }),
            this.userRepository.findOneBy({ id: updatedById }),
        ]);

        let mainQty: QtyType | undefined;
        if (mainQtyId) {
            mainQty = await this.qtyTypeRepository.findOneBy({ id: mainQtyId });
        }

        const qtyType = this.qtyTypeRepository.create({
            name,
            mainQty,
            primaryWeightTo,
            shop,
            createdBy,
            updatedBy,
        });

        return await this.qtyTypeRepository.save(qtyType);
    }

    async findByShop(shopId: number): Promise<QtyType[]> {
        return await this.qtyTypeRepository.find({
            where: { shop: { id: shopId } },
            relations: ['shop'],
        });
        
    }

    async findAll(): Promise<QtyType[]> {
        return await this.qtyTypeRepository.find({
            relations: ['shop', 'createdBy', 'updatedBy', 'mainQty'],
        });
    }

    async findOne(id: number): Promise<QtyType> {
        return await this.qtyTypeRepository.findOne({
            where: { id },
            relations: ['shop', 'createdBy', 'updatedBy', 'mainQty'],
        });
    }

    async update(id: number, updateDto: UpdateQtyTypeDto): Promise<QtyType> {
        const qtyType = await this.qtyTypeRepository.findOne({
            where: { id },
            relations: ['mainQty', 'shop', 'updatedBy'],
        });

        if (!qtyType) throw new Error('QtyType not found');

        const { name, mainQtyId, primaryWeightTo, shopId, updatedById } = updateDto;

        if (name) qtyType.name = name;
        if (primaryWeightTo !== undefined) qtyType.primaryWeightTo = primaryWeightTo;

        if (mainQtyId !== undefined) {
            qtyType.mainQty = await this.qtyTypeRepository.findOneBy({ id: mainQtyId });
        }

        if (shopId !== undefined) {
            qtyType.shop = await this.shopRepository.findOneBy({ id: shopId });
        }

        if (updatedById !== undefined) {
            qtyType.updatedBy = await this.userRepository.findOneBy({ id: updatedById });
        }

        return await this.qtyTypeRepository.save(qtyType);
    }

    async remove(id: number): Promise<void> {
        await this.qtyTypeRepository.delete(id);
    }
}