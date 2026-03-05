import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface VerifyTokenRequest {
  token: string;
}

export interface VerifyTokenResponse {
  valid: boolean;
  userId: string;
  email: string;
}

export interface IAuthGrpcClient {
  login(request: LoginRequest): Observable<LoginResponse>;
  register(request: RegisterRequest): Observable<RegisterResponse>;
  verifyToken(request: VerifyTokenRequest): Observable<VerifyTokenResponse>;
}

export const AUTH_GRPC_CLIENT = Symbol('AUTH_GRPC_CLIENT');
