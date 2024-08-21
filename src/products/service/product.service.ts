import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dto';
import { IProductRepository } from '../repository/products.repository.interface';
import { PRODUCT_REPOSITORY_TOKEN } from '../constants/const';

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY_TOKEN)
    private readonly productRepository: IProductRepository,
  ) {}
  async getProducts() {
    try {
      return await this.productRepository.getProducts();
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw new HttpException(
        'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProduct(id: string) {
    try {
      return await this.productRepository.getProduct(id);
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      throw new HttpException(
        'Error interno del servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createProduct(body: CreateProductDto): Promise<void> {
    try {
      return await this.productRepository.createProduct(body);
    } catch (error) {
      throw new HttpException(
        'No se pudo crear el producto',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProduct(id: string, body: UpdateProductDto): Promise<void> {
    try {
      const product = await this.productRepository.getProduct(id);
      console.log(product);
      if (product) return await this.productRepository.updateProduct(id, body);
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      throw new HttpException(
        'No se pudo actualizar el producto',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      const product = await this.productRepository.getProduct(id);
      if (product) return await this.productRepository.deleteProduct(id);
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    } catch (error) {
      console.error('Error al eliminar el producto:', error.message);
      throw new HttpException(
        'No se pudo eliminar el producto',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
