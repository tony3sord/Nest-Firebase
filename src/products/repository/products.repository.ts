import { Injectable } from '@nestjs/common';
import {
  ref,
  getDatabase,
  get,
  push,
  set,
  update,
  remove,
  DataSnapshot,
  query,
  orderByChild,
  endAt,
  startAt,
} from 'firebase/database';
import { app } from 'src/firebase.config';
import { IProductRepository } from './products.repository.interface';
import { CreateProductDto, UpdateProductDto } from '../dto';

@Injectable()
export class ProductRepository implements IProductRepository {
  private database = getDatabase(app);
  private dataRef = ref(this.database, 'Product');

  async getProducts(): Promise<any> {
    const snapshot: DataSnapshot = await get(this.dataRef);

    // Consulta para productos con precio menor a 150
    const priceQuery = query(this.dataRef, orderByChild('price'), endAt(150));
    const priceSnapshot = await get(priceQuery);
    const productsByPrice = priceSnapshot.val();

    // Consulta para productos con cantidad mayor que 10
    const quantityQuery = query(
      this.dataRef,
      orderByChild('amount'),
      startAt(11),
    );
    const quantitySnapshot = await get(quantityQuery);
    const productsByQuantity = quantitySnapshot.val();

    // Combinar resultados sin excepciones
    const combinedResults = { ...productsByPrice, ...productsByQuantity };

    console.log('Productos con precio menor a 150:', productsByPrice);
    console.log('Productos con cantidad mayor a 10:', productsByQuantity);
    console.log('Resultados combinados:', combinedResults);

    return snapshot.val();
  }

  async getProduct(id: string): Promise<any> {
    const productRef = ref(this.database, `Product/${id}`);
    const snapshot: DataSnapshot = await get(productRef);
    return snapshot.val();
  }

  async createProduct(body: CreateProductDto): Promise<void> {
    const newElementRef = push(this.dataRef);
    return await set(newElementRef, body);
  }

  async updateProduct(id: string, body: UpdateProductDto): Promise<void> {
    const productRef = ref(this.database, `Product/${id}`);
    return await update(productRef, body);
  }

  async deleteProduct(id: string): Promise<void> {
    const productRef = ref(this.database, `Product/${id}`);
    return await remove(productRef);
  }
}
