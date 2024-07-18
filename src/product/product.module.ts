import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductRepository } from "./product.repository";
import { ProductEntity } from "./product.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";


@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity,ProductRepository]),],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
})

export class ProductModule{}