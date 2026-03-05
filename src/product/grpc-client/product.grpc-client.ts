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

@Injectable()
export class ProductGrpcClient implements IProductGrpcClient, OnModuleInit {
  private productService: IProductGrpcClient;

  constructor(@Inject(PRODUCT_GRPC_CLIENT) private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.productService = this.client.getService<IProductGrpcClient>('ProductService');
  }

  getProduct(request: GetProductRequest): Observable<ProductResponse> {
    return this.productService.getProduct(request);
  }

  listProducts(request: ListProductsRequest): Observable<ListProductsResponse> {
    return this.productService.listProducts(request);
  }

  createProduct(request: CreateProductRequest): Observable<ProductResponse> {
    return this.productService.createProduct(request);
  }

  updateProduct(request: UpdateProductRequest): Observable<ProductResponse> {
    return this.productService.updateProduct(request);
  }

  deleteProduct(request: DeleteProductRequest): Observable<DeleteProductResponse> {
    return this.productService.deleteProduct(request);
  }
}
