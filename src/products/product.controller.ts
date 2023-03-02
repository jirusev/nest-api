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
//import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productsService: ProductService) {}

  //@UseGuards(JwtAuthGuard)
  @Post('add')
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = this.productsService.createProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: generatedId };
  }

 // @UseGuards(JwtAuthGuard)
  @Get('load')
  getAllProducts() {
    return { products: this.productsService.getAllProducts() };
  }

  //@UseGuards(JwtAuthGuard)
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getProductById(prodId);
  }

  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return null;
  }
  
  //@UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  removeProduct(@Param('id') prodId: string) {
    this.productsService.deleteProduct(prodId);
    return null;
  }
}
