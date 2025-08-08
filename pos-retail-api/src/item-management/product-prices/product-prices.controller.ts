import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CreateProductPriceDto } from './dto/create-product-price.dto';
import { UpdateProductPriceDto } from './dto/update-product-price.dto';
import { ProductPriceService } from './product-prices.service';

@Controller('product-prices')
export class ProductPriceController {
    constructor(private readonly service: ProductPriceService) { }

    @Post()
    async create(@Body() dto: CreateProductPriceDto) {
        return await this.service.create(dto);
    }

    @Get()
    async findAll() {
        return await this.service.findAll();
    }

    @Get('shop/:shopId')
    async findByShop(@Param('shopId') shopId: number) {
        return await this.service.findByShop(shopId);

    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.service.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() dto: UpdateProductPriceDto,
    ) {
        return await this.service.update(id, dto);
    }


    @Delete(':id')
    async remove(@Param('id') id: number) {
        return await this.service.remove(id);
    }
}
