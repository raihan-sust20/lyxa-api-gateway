import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { AuthGrpcClient } from './grpc-client/auth.grpc-client';
import { AUTH_GRPC_CLIENT } from './grpc-client/auth.grpc-client.interface';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTH_GRPC_CLIENT,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'auth',
            protoPath: join(process.cwd(), 'proto/auth.proto'),
            url: configService.get<string>('grpc.auth.url'),
          },
        }),
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGrpcClient],
})
export class AuthModule {}
