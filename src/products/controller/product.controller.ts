import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { CreateProductDto, UpdateProductDto } from '../dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<string> {
    return await this.productService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<string> {
    return await this.productService.getProduct(id);
  }

  @Post()
  async createProduct(@Body() body: CreateProductDto): Promise<void> {
    return await this.productService.createProduct(body);
  }

  @Patch(':id')
  async updateProduct(
    @Body() body: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<void> {
    return await this.productService.updateProduct(id, body);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    return await this.productService.deleteProduct(id);
  }
}
