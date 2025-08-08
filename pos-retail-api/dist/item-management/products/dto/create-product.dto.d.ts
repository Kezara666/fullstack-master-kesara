export declare class CreateProductDto {
    name: string;
    description?: string;
    barCode?: string;
    qrCode?: string;
    category: string;
    subcategory?: string;
    currentPrice: number;
    warranty: number;
    supplierId: number;
    qtyTypeId: number;
    productPriceId?: number;
    qty: number;
    shopId: number;
    createdById: number;
    updatedById: number;
}
