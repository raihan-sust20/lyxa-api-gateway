import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { ProductGrpcClient } from './grpc-client/product.grpc-client';
import { PRODUCT_GRPC_CLIENT } from './grpc-client/product.grpc-client.interface';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: PRODUCT_GRPC_CLIENT,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'product',
            protoPath: join(process.cwd(), 'proto/product.proto'),
            url: configService.get<string>('grpc.product.url'),
          },
        }),
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductGrpcClient],
})
export class ProductModule {}
