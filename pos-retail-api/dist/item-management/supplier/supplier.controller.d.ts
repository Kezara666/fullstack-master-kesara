import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
export declare class SupplierController {
    private readonly supplierService;
    constructor(supplierService: SupplierService);
    create(createSupplierDto: CreateSupplierDto): Promise<import("./entities/supplier.entity").Supplier>;
    findAll(): Promise<import("./entities/supplier.entity").Supplier[]>;
    findOne(id: number): Promise<import("./entities/supplier.entity").Supplier>;
    findAllSpecifiShopRelated(shopId: number): Promise<import("./entities/supplier.entity").Supplier[]>;
    update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<import("./entities/supplier.entity").Supplier>;
    remove(id: number): Promise<void>;
}
