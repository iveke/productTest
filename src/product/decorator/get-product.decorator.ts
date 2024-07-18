
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ProductEntity } from '../product.entity';

export const GetProduct = createParamDecorator((data: keyof ProductEntity, context: ExecutionContext) => {
  const product: ProductEntity = context.switchToHttp().getRequest().product;

  return data ? product && product[data] : product;
});

export const GetProductList = createParamDecorator((data: keyof ProductEntity, context: ExecutionContext) => {
const productList: ProductEntity = context.switchToHttp().getRequest().productList;

return data ? productList && productList[data] : productList;
})