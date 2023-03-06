import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(title: string, desc: string, price: number): Promise<string> {
    let product_key = uuidv4();
    const newProduct = this.productRepository.create({
      product_key,
      title,
      description: desc,
      price,
    });
    
    await this.productRepository.save(newProduct);

    return product_key;
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async getProductByProductKey(product_key: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { product_key } });
    if (!product) {
      throw new NotFoundException(`Product with product_key ${product_key} not found.`);
    }
    return product;
  }
  

  async updateProduct(
    product_key: string,
    title?: string,
    desc?: string,
    price?: number,
  ): Promise<ProductEntity> {
    const product = await this.getProductByProductKey(product_key);
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

  async deleteProduct(product_key: string): Promise<void> {
    const product = await this.getProductByProductKey(product_key);
    await this.productRepository.remove(product);
  }
}
