import { CreateProductDto, UpdateProductDto } from '../dto';

export interface IProductRepository {
  getProducts(): Promise<any>;
  getProduct(id: string): Promise<any>;
  createProduct(body: CreateProductDto): Promise<void>;
  updateProduct(id: string, body: UpdateProductDto): Promise<void>;
  deleteProduct(id: string): Promise<void>;
}
