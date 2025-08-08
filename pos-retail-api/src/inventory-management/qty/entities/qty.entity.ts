import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Product } from 'src/item-management/products/entities/product.entity';
import { QtyType } from 'src/inventory-management/qty-type/entities/qty-type.entity';
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';

@Entity()
export class Qty {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'productId' })
  @ApiProperty({ type: () => Product })
  product?: Product;

  @ManyToOne(() => QtyType, { nullable: false })
  @JoinColumn({ name: 'qtyTypeId' })
  @ApiProperty({ type: () => QtyType })
  qtyType?: QtyType;

  @Column({ type: 'float', default: 0 })
  @ApiProperty({ example: 100.5 })
  qty: number;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @ManyToOne(() => Shop, { nullable: false })
  @JoinColumn({ name: 'shopId' })
  @ApiProperty({ type: () => Shop })
  shop: Shop;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'createdById' })
  @ApiProperty({ type: () => User })
  createdBy?: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'updatedById' })
  @ApiProperty({ type: () => User })
  updatedBy?: User;
}