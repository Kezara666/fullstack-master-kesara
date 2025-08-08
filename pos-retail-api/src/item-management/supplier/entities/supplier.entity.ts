import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Supplier {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Shop, (shop) => shop.suppliers)
    @JoinColumn({ name: 'shopId' })
    shop: Shop;

    @ManyToOne(() => User, { nullable: false})
    @JoinColumn({ name: 'createdById' })
    createdBy?: User;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'updatedById' })
    updatedBy?: User;
}
