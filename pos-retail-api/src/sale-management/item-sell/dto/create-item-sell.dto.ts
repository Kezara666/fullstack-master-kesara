import { ApiProperty } from "@nestjs/swagger";
import { CreateQtyDto } from "src/inventory-management/qty/dto/create-qty.dto";
import { Product } from "src/item-management/products/entities/product.entity";
import { IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ProductPrice } from "src/item-management/product-prices/entities/product-price.entity";

export class CreateItemSellDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  productId: number;

  product?: Product;

  @ApiProperty({ example: 1 })
  @IsNumber()
  productPriceId: number;

  productPrice?: ProductPrice;

  @ApiProperty({ example: 1 })
  @IsNumber()
  qtyTypeId: number;

  qtyType?: CreateQtyDto;

  @ApiProperty({ example: 2 })
  @IsNumber()
  qty: number;

  @ApiProperty({ example: 25.99 })
  @IsNumber()
  qntPrice: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  status?: number;

  @ApiProperty({ example: 5.50, required: false })
  @IsOptional()
  @IsNumber()
  pendingdAmount?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  completedItemSell?: boolean;

  @ApiProperty({ example: 1 }) // Shop ID
  @IsNumber()
  shopId: number;

  @ApiProperty({ example: 101 }) // Created by user ID
  @IsNumber()
  createdById: number;

  @ApiProperty({ example: 101 }) // Updated by user ID
  @IsNumber()
  updatedById: number;
}