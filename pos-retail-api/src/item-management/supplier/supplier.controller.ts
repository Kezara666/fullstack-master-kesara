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
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) { }

  @Post()
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    return await this.supplierService.create(createSupplierDto);

  }

  @Get()
  async findAll() {
    return await this.supplierService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.supplierService.findOne(id);
  }

  @Get('shop/:shopId') // GET /suppliers/shop/123
  async findAllSpecifiShopRelated(@Param('shopId') shopId: number) {
    return await this.supplierService.findAllSpecificShop(shopId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return await this.supplierService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.supplierService.remove(id);
  }
}