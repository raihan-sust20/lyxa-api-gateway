import type { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

export interface GetProductRequest {
  id: string;
}

export interface ListProductsRequest {
  page: number;
  limit: number;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface UpdateProductRequest {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface DeleteProductRequest {
  id: string;
}

export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ListProductsResponse {
  products: ProductResponse[];
  total: number;
  page: number;
  limit: number;
}

export interface DeleteProductResponse {
  success: boolean;
  message: string;
}

export interface IProductGrpcClient {
  getProduct(request: GetProductRequest, metadata: Metadata): Observable<ProductResponse>;
  listProducts(request: ListProductsRequest, metadata: Metadata): Observable<ListProductsResponse>;
  createProduct(request: CreateProductRequest, metadata: Metadata): Observable<ProductResponse>;
  updateProduct(request: UpdateProductRequest, metadata: Metadata): Observable<ProductResponse>;
  deleteProduct(request: DeleteProductRequest, metadata: Metadata): Observable<DeleteProductResponse>;
}

export const PRODUCT_GRPC_CLIENT = Symbol('PRODUCT_GRPC_CLIENT');
