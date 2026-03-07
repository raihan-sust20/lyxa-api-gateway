import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  AUTH_GRPC_CLIENT,
  IAuthGrpcClient,
  LoginRequest,
  AuthResponse,
  RegisterRequest,
  ValidateTokenRequest,
  ValidateTokenResponse,
  type LogoutRequest,
  type LogoutResponse,
  type RefreshTokenRequest,
} from './auth.grpc-client.interface';

@Injectable()
export class AuthGrpcClient implements IAuthGrpcClient, OnModuleInit {
  private authService: IAuthGrpcClient;

  constructor(@Inject(AUTH_GRPC_CLIENT) private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.authService = this.client.getService<IAuthGrpcClient>('AuthService');
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.authService.login(request);
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.authService.register(request);
  }

  validateToken(
    request: ValidateTokenRequest,
  ): Observable<ValidateTokenResponse> {
    return this.authService.validateToken(request);
  }

  refreshToken(request: RefreshTokenRequest): Observable<AuthResponse> {
    return this.authService.refreshToken(request);
  }

  logout(request: LogoutRequest): Observable<LogoutResponse> {
    return this.authService.logout(request);
  }
}
