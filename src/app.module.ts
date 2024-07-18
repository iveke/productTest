import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { ProductRepository } from './product/product.repository';
import { AppController } from './app.controller';
import { ProductEntity } from './product/product.entity';

@Module({
  imports: [
    ProductModule,
    ProductRepository,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'iveketkach05',
        database: 'productTest',
        entities: [ProductEntity],
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
