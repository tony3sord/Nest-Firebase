import { Module } from '@nestjs/common';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { ProductRepository } from './repository/products.repository';
import { PRODUCT_REPOSITORY_TOKEN } from './constants/const';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: PRODUCT_REPOSITORY_TOKEN,
      useClass: ProductRepository,
    },
  ],
})
export class ProductsModule {}
