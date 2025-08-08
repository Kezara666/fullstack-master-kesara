import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus, // Still useful for decorators, but not for direct return
  HttpCode, // Import HttpCode decorator
} from '@nestjs/common';
import { QtyService } from './qty.service';
import { CreateQtyDto } from './dto/create-qty.dto';
import { UpdateQtyDto } from './dto/update-qty.dto';
import { Qty } from './entities/qty.entity'; // Assuming you have a Qty entity
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('qties')
export class QtyController {
  constructor(private readonly qtyService: QtyService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // Explicitly set 201 Created status
  async create(@Body() createQtyDto: CreateQtyDto): Promise<Qty> {
    return this.qtyService.create(createQtyDto);
  }

  @Get()
  async findAll(): Promise<Qty[]> { // Specify return type
    return this.qtyService.findAll();
  }

  @Get('shop/:shopId')
  @ApiOperation({ summary: 'Get all quantity records by shop ID' })
  @ApiParam({ name: 'shopId', type: Number, description: 'ID of the shop' })
  @ApiResponse({ status: 200, description: 'List of quantity records for the given shop.', type: [Qty] })
  @ApiResponse({ status: 404, description: 'No quantity records found for this shop or shop does not exist.' })
  async findByShop(@Param('shopId') shopId: number): Promise<Qty[]> {
    return this.qtyService.findByShop(+shopId); // Ensure shopId is a number
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Qty> { // Specify return type
    return this.qtyService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateQtyDto: UpdateQtyDto,
  ): Promise<Qty> { // Specify return type
    return this.qtyService.update(id, updateQtyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Use 204 No Content for successful deletion with no body
  async remove(@Param('id') id: number): Promise<void> { // Specify return type
    await this.qtyService.remove(id);
  }
}