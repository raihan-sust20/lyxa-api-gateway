import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ProductGrpcClient } from '../grpc-client/product.grpc-client';
import {
  CreateProductDto,
  ListProductsQueryDto,
  ListProductsResponseDto,
  ProductResponseDto,
} from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productGrpcClient: ProductGrpcClient) {}

  async getProduct(id: string): Promise<ProductResponseDto> {
    return firstValueFrom(this.productGrpcClient.getProduct({ id }));
  }

  async listProducts(query: ListProductsQueryDto): Promise<ListProductsResponseDto> {
    return firstValueFrom(
      this.productGrpcClient.listProducts({
        page: query.page ?? 1,
        limit: query.limit ?? 10,
      }),
    );
  }

  async createProduct(authToken: string, dto: CreateProductDto): Promise<ProductResponseDto> {
    return firstValueFrom(
      this.productGrpcClient.createProduct(authToken,{
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stock: dto.stock,
      }),
    );
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<ProductResponseDto> {
    return firstValueFrom(
      this.productGrpcClient.updateProduct({
        id,
        name: dto.name ?? '',
        description: dto.description ?? '',
        price: dto.price ?? 0,
        stock: dto.stock ?? 0,
      }),
    );
  }

  async deleteProduct(id: string): Promise<{ success: boolean; message: string }> {
    return firstValueFrom(this.productGrpcClient.deleteProduct({ id }));
  }
}
