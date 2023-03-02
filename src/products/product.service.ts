import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { Product } from './product.interface';
import {uuid} from 'uuid';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(title: string, desc: string, price: number): Promise<string> {
    const id = uuid();

    const newProduct = this.productRepository.create({
      id,
      title,
      description: desc,
      price,
    });
    await this.productRepository.save(newProduct);

    return newProduct.id;
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async getProductById(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return product;
  }
  

  async updateProduct(
    id: string,
    title?: string,
    desc?: string,
    price?: number,
  ): Promise<ProductEntity> {
    const product = await this.getProductById(id);
    if (title) {
      product.title = title;
    }
    if (desc) {
      product.description = desc;
    }
    if (price) {
      product.price = price;
    }
    await this.productRepository.save(product);
    return product;
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.getProductById(id);
    await this.productRepository.remove(product);
  }
}
