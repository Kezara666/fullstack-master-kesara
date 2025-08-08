export declare class ProductPriceDataDto {
    wholeSalePrice: number;
    broughtPrice: number;
    primarySalePrice: number;
    shopId: number;
    createdById: number;
    updatedById: number;
}
export declare class QtyDataDto {
    qty: number;
    qtyTypeId: number;
    shopId: number;
    createdById: number;
    updatedById: number;
}
export declare class CreateProductWithDependenciesDto {
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
    qty: number;
    shopId: number;
    createdById: number;
    updatedById: number;
    productPrice: ProductPriceDataDto;
    qtyData: QtyDataDto;
}
