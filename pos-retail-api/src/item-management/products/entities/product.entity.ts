// src/products/product.entity.ts
import { QtyType } from 'src/inventory-management/qty-type/entities/qty-type.entity';
import { ProductPrice } from 'src/item-management/product-prices/entities/product-price.entity';
import { Supplier } from 'src/item-management/supplier/entities/supplier.entity';
import { Shop } from 'src/shop-management/shop/entities/shop.entity';
import { User } from 'src/shop-management/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';


@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  barCode: string;

  @Column({ type: 'text', nullable: true })
  qrCode: string;

  @Column({ type: 'varchar', length: 100 })
  category: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  subcategory: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  currentPrice: number;

  @Column({ type: 'integer' })
  warranty: number;

  @ManyToOne(() => Supplier, { nullable: false })
  supplier: Supplier;

  @ManyToOne(() => ProductPrice, { nullable: true })
  productPrice: ProductPrice;

  @ManyToOne(() => QtyType, { nullable: false })
  qtyType: QtyType;

  @Column({ type: 'integer' })
  qty: number;

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