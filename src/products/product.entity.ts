import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductEntity {
  @Column()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;
}
