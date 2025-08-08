import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { QtyType } from 'src/inventory-management/qty-type/entities/qty-type.entity';
import { Qty } from 'src/inventory-management/qty/entities/qty.entity';
import { ProductPrice } from 'src/item-management/product-prices/entities/product-price.entity';
import { Product } from 'src/item-management/products/entities/product.entity';
import { Supplier } from 'src/item-management/supplier/entities/supplier.entity';
import { Customer } from 'src/sale-management/customer/entities/customer.entity';
import { Invoice } from 'src/sale-management/invoice/entities/invoice.entity';
import { ItemSell } from 'src/sale-management/item-sell/entities/item-sell.entity';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.shop)
  users: User[];

  // @OneToMany(() => Product, (product) => product.shop)
  // products: Product[];

  // @OneToMany(() => Invoice, (invoice) => invoice.shop)
  // invoices: Invoice[];

  // @OneToMany(() => QtyType, (qtyType) => qtyType.shop)
  // qtyTypes: QtyType[];

  // @OneToMany(() => Customer, (customer) => customer.shop)
  // customers: Customer[];

  // @OneToMany(() => ProductPrice, (price) => price.shop)
  // productPrices: ProductPrice[];

  // @OneToMany(() => ItemSell, (itemSell) => itemSell.shop)
  // itemSells: ItemSell[];

  // @OneToMany(() => Qty, (qty) => qty.shop)
  // qtys: Qty[];

  @OneToMany(() => Supplier, (supplier) => supplier.shop)
  suppliers: Supplier[];
}
