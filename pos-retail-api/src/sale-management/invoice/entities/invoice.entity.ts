
import { Customer } from "src/sale-management/customer/entities/customer.entity";
import { ItemSell } from "src/sale-management/item-sell/entities/item-sell.entity";
import { Shop } from "src/shop-management/shop/entities/shop.entity";
import { User } from "src/shop-management/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => ItemSell, item => item.invoice) // Restrict cascade
    itemsSelled: ItemSell[];

    @ManyToOne(() => Customer, { nullable: true })
    @JoinColumn({ name: 'customer' })
    customer?: Customer;

    @Column({ type: 'float', default: 0 })
    total: number;

    @Column({ type: 'int', default: 1 })
    status: number

    @Column({ type: 'float', default: 0 })
    discount: number;

    @Column({ type: 'float', default: 0 })
    netTotal: number;

    @Column({ type: 'boolean', default: true })
    completedItemSell: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => Shop, (shop) => shop.suppliers)
    @JoinColumn({ name: 'shopId' })
    shop: Shop;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'createdById' })
    createdBy?: User;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'updatedById' })
    updatedBy?: User;
}
