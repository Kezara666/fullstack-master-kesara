import { CreateItemSellDto } from 'src/sale-management/item-sell/dto/create-item-sell.dto';
export declare class CreateInvoiceDto {
    customerId?: number;
    total: number;
    discount: number;
    netTotal: number;
    itemsSelled: CreateItemSellDto[];
    pendingdAmount?: number;
    completedItemSell?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    shopId: number;
    createdById: number;
    updatedById: number;
}
