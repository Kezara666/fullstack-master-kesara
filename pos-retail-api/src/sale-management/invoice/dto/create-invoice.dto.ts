import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateItemSellDto } from 'src/sale-management/item-sell/dto/create-item-sell.dto';

export class CreateInvoiceDto {
  @ApiPropertyOptional({ description: 'ID of the customer (optional)', example: 123 })
  customerId?: number;

  @ApiProperty({ description: 'Total amount of the invoice', example: 1000.50 })
  total: number;

  @ApiProperty({ description: 'Discount applied to the invoice', example: 50 })
  discount: number;

  @ApiProperty({ description: 'Net total after discount', example: 950.50 })
  netTotal: number;

  @ApiProperty({
    description: 'List of items sold',
    type: [CreateItemSellDto]
  })
  itemsSelled: CreateItemSellDto[];

  @ApiPropertyOptional({ description: 'Pending amount if any', example: 100 })
  pendingdAmount?: number;

  @ApiPropertyOptional({ description: 'Whether the item sell is completed', example: true })
  completedItemSell?: boolean;

  @ApiPropertyOptional({ description: 'Date invoice was created', type: String, format: 'date-time' })
  createdAt?: Date;

  @ApiPropertyOptional({ description: 'Date invoice was updated', type: String, format: 'date-time' })
  updatedAt?: Date;

  @ApiProperty({ description: 'Shop ID where invoice was created', example: 1 })
  shopId: number;

  @ApiProperty({ description: 'User ID who created the invoice', example: 10 })
  createdById: number;

  @ApiProperty({ description: 'User ID who last updated the invoice', example: 10 })
  updatedById: number;
}
