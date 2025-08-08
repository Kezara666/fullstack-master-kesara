import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Shop } from './entities/shop.entity';

@ApiTags('shops')
@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shop' })
  @ApiBody({ type: CreateShopDto })
  @ApiResponse({ status: 201, description: 'Created', type: Shop })
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopService.create(createShopDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all shops' })
  @ApiResponse({ status: 200, description: 'List of shops', type: [Shop] })
  findAll() {
    return this.shopService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get shop by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Found shop', type: Shop })
  findOne(@Param('id') id: string) {
    return this.shopService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update shop by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateShopDto })
  @ApiResponse({ status: 200, description: 'Updated', type: Shop })
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(+id, updateShopDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete shop by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  remove(@Param('id') id: string) {
    return this.shopService.remove(+id);
  }
}
