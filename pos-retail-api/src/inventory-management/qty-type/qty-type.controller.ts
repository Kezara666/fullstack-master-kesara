import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
} from '@nestjs/common';
import { QtyTypeService } from './qty-type.service';
import { CreateQtyTypeDto } from './dto/create-qty-type.dto';
import { UpdateQtyTypeDto } from './dto/update-qty-type.dto';
import { QtyType } from './entities/qty-type.entity';

@Controller('qty-types')
export class QtyTypeController {
    constructor(private readonly service: QtyTypeService) { }

    @Post()
    async create(@Body() dto: CreateQtyTypeDto) {
        const qtyType = await this.service.create(dto);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'QtyType created successfully',
            data: qtyType,
        };
    }

    @Get()
    async findAll() {
        return await this.service.findAll();
    }
    @Get('shop/:shopId')
    async findByShop(@Param('shopId') shopId: number): Promise<QtyType[]> {
        return await this.service.findByShop(shopId);
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.service.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() dto: UpdateQtyTypeDto,
    ) {
        return await this.service.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return await this.service.remove(id);
    }
}