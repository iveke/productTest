import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';
import { ProductEntity } from './product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

constructor(private productRepository: ProductRepository){}

  async createProduct(createProductDto: CreateProductDto) {
    console.log('service')
    return this.productRepository.createProduct(createProductDto);
  }

  async updateProduct(product: ProductEntity, updateProductDto: UpdateProductDto){
    return this.productRepository.updateProduct(product, updateProductDto);
  }

  async getProductList(productList: ProductEntity[]){
    // console.log(this.productRepository.createQueryBuilder)
    // const query = this.productRepository.createQueryBuilder();

    // return this.productRepository.getProductList(query);
    return productList;
  }
  
  async getProduct(product: ProductEntity){
    return product;
  }

  async deleteProduct(product: ProductEntity){
    return this.productRepository.deleteProduct(product)
  }
}
