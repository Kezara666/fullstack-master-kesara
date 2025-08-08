import { QtyService } from './qty.service';
import { CreateQtyDto } from './dto/create-qty.dto';
import { UpdateQtyDto } from './dto/update-qty.dto';
import { Qty } from './entities/qty.entity';
export declare class QtyController {
    private readonly qtyService;
    constructor(qtyService: QtyService);
    create(createQtyDto: CreateQtyDto): Promise<Qty>;
    findAll(): Promise<Qty[]>;
    findByShop(shopId: number): Promise<Qty[]>;
    findOne(id: number): Promise<Qty>;
    update(id: number, updateQtyDto: UpdateQtyDto): Promise<Qty>;
    remove(id: number): Promise<void>;
}
