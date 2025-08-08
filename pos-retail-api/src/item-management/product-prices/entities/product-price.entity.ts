import { Product } from "src/item-management/products/entities/product.entity";
import { Shop } from "src/shop-management/shop/entities/shop.entity";
import { User } from "src/shop-management/user/entities/user.entity";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity({ name: 'product_price', schema: 'pos' })
export class ProductPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', default: 0 })
  wholeSalePrice: number;

  @Column({ type: 'float', default: 0 })
  broughtPrice: number;

  @Column({ type: 'float', default: 0 })
  primarySalePrice: number;

  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.productPrice, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;

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

  // Timestamps
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}