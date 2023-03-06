import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductEntity } from './product.entity';
//import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productsService: ProductService) {}

  //@UseGuards(JwtAuthGuard)
  @Post('add')
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): Promise<{ generated_product_key: string }> {
    const generated_product_key = await this.productsService.createProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return Promise.resolve({ generated_product_key });
  }
  

 // @UseGuards(JwtAuthGuard)
  @Get('load')
  async getAllProducts(): Promise<ProductEntity[]>{
    return  await this.productsService.getAllProducts();
  }

  //@UseGuards(JwtAuthGuard)
  @Get(':product_key')
  getProduct(@Param('product_key') prodId: string) {
    return this.productsService.getProductByProductKey(prodId);
  }

  //@UseGuards(JwtAuthGuard)
  @Patch(':product_key')
  updateProduct(
    @Param('product_key') product_key: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    this.productsService.updateProduct(product_key, prodTitle, prodDesc, prodPrice);
    return null;
  }
  
  //@UseGuards(JwtAuthGuard)
  @Delete('delete/:product_key')
  removeProduct(@Param('product_key') product_key: string) {
    this.productsService.deleteProduct(product_key);
    return null;
  }
}
