import { Product } from "src/item-management/products/entities/product.entity";
import { QtyType } from "src/inventory-management/qty-type/entities/qty-type.entity";
import { Invoice } from "src/sale-management/invoice/entities/invoice.entity";
import { PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";
import { Shop } from "src/shop-management/shop/entities/shop.entity";
import { User } from "src/shop-management/user/entities/user.entity";
import { ProductPrice } from "src/item-management/product-prices/entities/product-price.entity";


@Entity()
export class ItemSell {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, { nullable: true })
    @JoinColumn({ name: 'product' })
    product?: Product;

    @ManyToOne(() => ProductPrice, { nullable: true })
    productPrice: ProductPrice;

    @ManyToOne(() => Invoice, invoice => invoice.itemsSelled, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'invoiceId' }) // 
    invoice: Invoice;

    @Column()
    invoiceId: number; // 

    @ManyToOne(() => QtyType, { nullable: true })
    @JoinColumn({ name: 'qtyType' })
    qtyType?: QtyType;

    @Column({ type: 'float', default: 0 })
    qty: number;

    @Column({ type: 'float', default: 0 })
    qntPrice: number;

    @Column({ type: 'float', default: 0 })
    pendingdAmount: number

    @Column({ type: 'boolean', default: true })
    completedItemSell: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // --- Add these new relations ---
    @ManyToOne(() => Shop, { nullable: false })
    @JoinColumn({ name: 'shopId' })
    shop: Shop;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'createdById' })
    createdBy: User;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'updatedById' })
    updatedBy: User;

}
