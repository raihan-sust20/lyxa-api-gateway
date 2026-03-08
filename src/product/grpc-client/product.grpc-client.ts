import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  PRODUCT_GRPC_CLIENT,
  IProductGrpcClient,
  GetProductRequest,
  ListProductsRequest,
  CreateProductRequest,
  UpdateProductRequest,
  DeleteProductRequest,
  ProductResponse,
  ListProductsResponse,
  DeleteProductResponse,
} from './product.grpc-client.interface';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class ProductGrpcClient implements OnModuleInit {
  private productService: IProductGrpcClient;

  constructor(
    @Inject(PRODUCT_GRPC_CLIENT) private readonly client: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.productService =
      this.client.getService<IProductGrpcClient>('ProductService');
  }

  getProduct(authToken: string, request: GetProductRequest): Observable<ProductResponse> {
    const metadata = new Metadata();
    metadata.set('authorization', `Bearer ${authToken}`);
    return this.productService.getProduct(request, metadata);
  }

  listProducts(authToken: string, request: ListProductsRequest): Observable<ListProductsResponse> {
    const metadata = new Metadata();
    metadata.set('authorization', `Bearer ${authToken}`);
    return this.productService.listProducts(request, metadata);
  }

  createProduct(
    authToken: string,
    request: CreateProductRequest,
  ): Observable<ProductResponse> {
    const metadata = new Metadata();
    metadata.set('authorization', `Bearer ${authToken}`);
    return this.productService.createProduct(request, metadata);
  }

  updateProduct(authToken: string, request: UpdateProductRequest): Observable<ProductResponse> {
    const metadata = new Metadata();
    metadata.set('authorization', `Bearer ${authToken}`);
    return this.productService.updateProduct(request, metadata);
  }

  deleteProduct(
    authToken: string,
    request: DeleteProductRequest,
  ): Observable<DeleteProductResponse> {
    const metadata = new Metadata();
    metadata.set('authorization', `Bearer ${authToken}`);
    return this.productService.deleteProduct(request, metadata);
  }
}
