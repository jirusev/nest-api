import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_key:string

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;
}
