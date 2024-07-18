import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { GetProduct, GetProductList } from './decorator/get-product.decorator';
import { ProductEntity } from './product.entity';
import { ProductGuard } from './guard/product.guard';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('')
  createProduct(@Body() createProductDto: CreateProductDto) {
    console.log('controller');
    return this.productService.createProduct(createProductDto);
  }

  @Patch(':productID')
  @UseGuards(ProductGuard)
  updateProduct(
    @GetProduct() product: ProductEntity,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(product, updateProductDto);
  }

  @Get('list')
  @UseGuards(ProductGuard)
  getProductList(@GetProductList() productList: ProductEntity[]) {
    return this.productService.getProductList(productList);
  }

  @Get(':productID')
  @UseGuards(ProductGuard)
  getProduct(@GetProduct() product: ProductEntity) {
    return this.productService.getProduct(product);
  }

  @Delete(':productID')
  @UseGuards(ProductGuard)
  deleteProduct(@GetProduct() product: ProductEntity) {
    return this.productService.deleteProduct(product);
  }
}
