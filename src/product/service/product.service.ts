import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ProductGrpcClient } from '../grpc-client/product.grpc-client';
import {
  CreateProductDto,
  ProductResponseDto,
} from '../dto/create-product.dto';
import {
  ListProductsQueryDto,
  ListProductsResponseDto,
} from '../dto/list-products.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productGrpcClient: ProductGrpcClient) {}

  async getProduct(authToken: string, id: string): Promise<ProductResponseDto> {
    return firstValueFrom(this.productGrpcClient.getProduct(authToken, { id }));
  }

  async listProducts(
    authToken: string,
    query: ListProductsQueryDto,
  ): Promise<ListProductsResponseDto> {
    return firstValueFrom(
      this.productGrpcClient.listProducts(authToken, {
        page: query.page ?? 1,
        limit: query.limit ?? 10,
      }),
    );
  }

  async createProduct(
    authToken: string,
    dto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    return firstValueFrom(
      this.productGrpcClient.createProduct(authToken, {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
      }),
    );
  }

  async updateProduct(
    authToken: string,
    id: string,
    dto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    return firstValueFrom(
      this.productGrpcClient.updateProduct(authToken, {
        id,
        name: dto.name ?? '',
        description: dto.description ?? '',
        price: dto.price ?? 0,
        stock: dto.stock ?? 0,
      }),
    );
  }

  async deleteProduct(
    authToken: string,
    id: string,
  ): Promise<{ success: boolean; message: string }> {
    return firstValueFrom(this.productGrpcClient.deleteProduct(authToken, { id }));
  }
}
