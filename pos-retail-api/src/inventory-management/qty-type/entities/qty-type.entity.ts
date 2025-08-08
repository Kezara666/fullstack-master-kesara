import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, Entity } from "typeorm";
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';

@Entity('QtyType')
export class QtyType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => QtyType, { nullable: true })
  @JoinColumn({ name: 'mainQty' })
  mainQty?: QtyType;

  @Column({ type: 'float', default: 0 })
  primaryWeightTo: number;

  // --- Add these fields ---
  @ManyToOne(() => Shop, { nullable: false })
  @JoinColumn({ name: 'shopId' })
  shop: Shop;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'updatedById' })
  updatedBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}