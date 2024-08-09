import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  DataSnapshot,
  get,
  push,
  ref,
  set,
  getDatabase,
  remove,
} from 'firebase/database';
import { app } from 'src/firebase.config'; // Asegúrate de exportar 'app' desde tu archivo de configuración de Firebase
import { CreateProductDto, UpdateProductDto } from '../dto';

const database = getDatabase(app);

const dataRef = ref(database, 'Product');

@Injectable()
export class ProductService {
  async getProducts() {
    try {
      const snapshot: DataSnapshot = await get(dataRef);
      if (snapshot.val() == null) {
        return {
          message: 'No se encontraron datos, lo sentimos (:',
          status: HttpStatus.NOT_FOUND,
        };
      }
      return snapshot.val();
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
      const productRef = ref(database, `Product/${id}`);
      const snapshot: DataSnapshot = await get(productRef);
      if (snapshot.val() === null) {
        throw new HttpException(
          'Producto no encontrado (:',
          HttpStatus.NOT_FOUND,
        );
      }
      return snapshot.val();
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
      const newElementRef = push(dataRef, { dataRef: body });
      return await set(newElementRef, body);
    } catch (error) {
      throw new HttpException(
        'No se pudo crear el producto',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProduct(id: string, body: UpdateProductDto): Promise<void> {
    try {
      const productRef = ref(database, `Product/${id}`);
      return await set(productRef, body);
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
      const productRef = ref(database, `Product/${id}`);
      return await remove(productRef);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      throw new HttpException(
        'No se pudo eliminar el producto',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
