import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../product.entity';
import { PRODUCT_ERROR } from '../enum/product-error.enum';

@Injectable()
export class ProductGuard implements CanActivate {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    if (!params.productID) {
      const productList = this.productRepository.find({order: {createDate: 'DESC'}});
      if (!productList) {
        throw new BadRequestException(PRODUCT_ERROR.NOT_FOUND);
      }

      request.productList = productList;
      return true;
    } else if (params.productID) {
      const product = this.productRepository.findOne({ where: {id: params.productID} });

      if(!product){
        throw new BadRequestException(PRODUCT_ERROR.NOT_FOUND);
      }
      request.product = product;
      return true
    }
  }
}
