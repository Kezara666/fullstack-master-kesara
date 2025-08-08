import { Product } from "src/item-management/products/entities/product.entity";
import { Repository } from "typeorm";
import { ItemSell } from "../item-sell/entities/item-sell.entity";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";
import { Invoice } from "./entities/invoice.entity";
export declare class InvoiceService {
    private invoiceRepository;
    private itemSellRepository;
    private productRepository;
    constructor(invoiceRepository: Repository<Invoice>, itemSellRepository: Repository<ItemSell>, productRepository: Repository<Product>);
    create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice>;
    findAll(): Promise<Invoice[]>;
    findOne(id: number): Promise<Invoice>;
    findByShopId(shopId: number): Promise<Invoice[]>;
    update(id: number, updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice>;
    remove(id: number): Promise<void>;
}
