import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  userName: string;

  @Column({ length: 100 })
  password: string;

  @Column({ unique: true })
  email?: string;

  @Column({ unique: true })
  phoneNumber?: string;

  @Column({ unique: true })
  idNumber?: string;

  @Column({ nullable: true })
  role?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Shop, (shop) => shop.users)
  @JoinColumn({ name: 'shopId' })
  shop: Shop;

  @Column()
  shopId: number;
}
