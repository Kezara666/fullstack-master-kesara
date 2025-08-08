import { CreateQtyDto } from "src/inventory-management/qty/dto/create-qty.dto";
import { Product } from "src/item-management/products/entities/product.entity";
import { ProductPrice } from "src/item-management/product-prices/entities/product-price.entity";
export declare class CreateItemSellDto {
    productId: number;
    product?: Product;
    productPriceId: number;
    productPrice?: ProductPrice;
    qtyTypeId: number;
    qtyType?: CreateQtyDto;
    qty: number;
    qntPrice: number;
    status?: number;
    pendingdAmount?: number;
    completedItemSell?: boolean;
    shopId: number;
    createdById: number;
    updatedById: number;
}
