import { PartialType } from '@nestjs/mapped-types';
import { CreateItemSellDto } from './create-item-sell.dto';

export class UpdateItemSellDto extends PartialType(CreateItemSellDto) {}
