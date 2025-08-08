import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop', description: 'Name of the product' })
  name: string;

  @ApiPropertyOptional({ example: 'High performance laptop', description: 'Description of the product' })
  description?: string;

  @ApiPropertyOptional({ example: '1234567890123', description: 'Bar code of the product' })
  barCode?: string;

  @ApiPropertyOptional({ example: 'QRCODE123456', description: 'QR code of the product' })
  qrCode?: string;

  @ApiProperty({ example: 'Electronics', description: 'Category of the product' })
  category: string;

  @ApiPropertyOptional({ example: 'Laptops', description: 'Subcategory of the product' })
  subcategory?: string;

  @ApiProperty({ example: 999.99, description: 'Current price of the product' })
  currentPrice: number;

  @ApiProperty({ example: 12, description: 'Warranty period in months' })
  warranty: number;

  @ApiProperty({ example: 1, description: 'Supplier ID' })
  supplierId: number;

  @ApiProperty({ example: 1, description: 'QtyType ID' })
  qtyTypeId: number;

  @ApiPropertyOptional({ example: 1, description: 'ProductPrice ID' })
  productPriceId?: number; 

  @ApiProperty({ example: 0, description: 'Qty' })
  qty: number;

  @ApiProperty({ example: 1 })
  shopId: number;

  @ApiProperty({ example: 101 })
  createdById: number;

  @ApiProperty({ example: 101 })
  updatedById: number;
}
