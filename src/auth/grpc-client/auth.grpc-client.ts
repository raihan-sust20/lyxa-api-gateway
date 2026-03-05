import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  AUTH_GRPC_CLIENT,
  IAuthGrpcClient,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyTokenRequest,
  VerifyTokenResponse,
} from './auth.grpc-client.interface';

@Injectable()
export class AuthGrpcClient implements IAuthGrpcClient, OnModuleInit {
  private authService: IAuthGrpcClient;

  constructor(@Inject(AUTH_GRPC_CLIENT) private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.authService = this.client.getService<IAuthGrpcClient>('AuthService');
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.authService.login(request);
  }

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.authService.register(request);
  }

  verifyToken(request: VerifyTokenRequest): Observable<VerifyTokenResponse> {
    return this.authService.verifyToken(request);
  }
}
