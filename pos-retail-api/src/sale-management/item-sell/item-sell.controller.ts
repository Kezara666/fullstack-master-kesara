
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ItemSellService } from './item-sell.service';
import { CreateItemSellDto } from './dto/create-item-sell.dto';
import { UpdateItemSellDto } from './dto/update-item-sell.dto';

@ApiTags('item-sell')
@Controller('item-sell')
export class ItemSellController {
  constructor(private readonly itemSellService: ItemSellService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new item sell record' })
  @ApiBody({ type: CreateItemSellDto })
  @ApiResponse({ status: 201, description: 'Item sell record created successfully.' })
  create(@Body() createItemSellDto: CreateItemSellDto) {
    return this.itemSellService.create(createItemSellDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all item sell records' })
  @ApiResponse({ status: 200, description: 'List of item sell records returned.' })
  findAll() {
    return this.itemSellService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an item sell record by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Item sell record ID' })
  @ApiResponse({ status: 200, description: 'Item sell record found.' })
  @ApiResponse({ status: 404, description: 'Item sell record not found.' })
  findOne(@Param('id') id: string) {
    return this.itemSellService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an item sell record by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Item sell record ID' })
  @ApiBody({ type: UpdateItemSellDto })
  @ApiResponse({ status: 200, description: 'Item sell record updated successfully.' })
  @ApiResponse({ status: 404, description: 'Item sell record not found.' })
  update(@Param('id') id: string, @Body() updateItemSellDto: UpdateItemSellDto) {
    return this.itemSellService.update(+id, updateItemSellDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an item sell record by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Item sell record ID' })
  @ApiResponse({ status: 200, description: 'Item sell record deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Item sell record not found.' })
  remove(@Param('id') id: string) {
    return this.itemSellService.remove(+id);
  }
}
