import { HttpStatus } from '@nestjs/common';
import { QtyTypeService } from './qty-type.service';
import { CreateQtyTypeDto } from './dto/create-qty-type.dto';
import { UpdateQtyTypeDto } from './dto/update-qty-type.dto';
import { QtyType } from './entities/qty-type.entity';
export declare class QtyTypeController {
    private readonly service;
    constructor(service: QtyTypeService);
    create(dto: CreateQtyTypeDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: QtyType;
    }>;
    findAll(): Promise<QtyType[]>;
    findByShop(shopId: number): Promise<QtyType[]>;
    findOne(id: number): Promise<QtyType>;
    update(id: number, dto: UpdateQtyTypeDto): Promise<QtyType>;
    remove(id: number): Promise<void>;
}
