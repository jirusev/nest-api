import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Product } from './products.model';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodID = randomUUID();
    const newProduct = new Product(prodID, title, desc, price);
    this.products.push(newProduct);

    return prodID;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(productId);
    const updateProduct = { ...product };

    if (title) {
      updateProduct.title = title;
    }
    if (desc) {
      updateProduct.description = desc;
    }
    if (price) {
      updateProduct.price = price;
    }

    this.products[index] = updateProduct;
  }

  deleteProduct(prodId:string){
    const index = this.findProduct(prodId)[1];
    this.products.splice(index,1);
  }

  private findProduct(id: String): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find the product.');
    }
    return [product, productIndex];
  }
}
