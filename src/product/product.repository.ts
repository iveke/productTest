import { EntityRepository, Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PRODUCT_ERROR } from './enum/product-error.enum';

EntityRepository(ProductEntity);
export class ProductRepository extends Repository<ProductEntity> {
  async createProduct(createProductDto: CreateProductDto) {
    const product = new ProductEntity();
    console.log(createProductDto);

    if (createProductDto.name) {
      product.name = createProductDto.name;
    }
    product.price = createProductDto.price;
    product.description = createProductDto.description;

    try {
      return await product.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(PRODUCT_ERROR.ALREADY_EXIST);
      } else {
        throw new InternalServerErrorException(error);
      }
    }
    // return await this.save(product);
  }

  async updateProduct(
    product: ProductEntity,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    if (updateProductDto.name) {
      product.name = updateProductDto.name;
    }
    if (updateProductDto.price) {
      product.price = updateProductDto.price;
    }
    if (updateProductDto.description) {
      product.description = updateProductDto.description;
    }
    try {
      return await product.save();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getProductList() {
    const query = this.createQueryBuilder();

    query.orderBy('product.createDate', 'DESC');
    query.limit(30);

    query.select([
      'product.id',
      'product.name',
      'product.price',
      'product.description',
      'product.createDate',
      'product.updateDate',
    ]);

    const list = await query.getMany();
    return { list };
  }

  async deleteProduct(product: ProductEntity){
    return await product.remove();
  }
}
