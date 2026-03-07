import { Observable } from 'rxjs';

// Requests

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ValidateTokenRequest {
  accessToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  userId: string;
}


// Responses

export interface AuthResponse {
  name: string;
  userId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;   // int64 -> number
  refreshTokenExpiresAt: number;  // int64 -> number
}

export interface ValidateTokenResponse {
  valid: boolean;
  userId: string;
  email: string;
}

export interface LogoutResponse {
  success: boolean;
}

// export interface IAuthGrpcClient {
//   login(request: LoginRequest): Observable<LoginResponse>;
//   register(request: RegisterRequest): Observable<RegisterResponse>;
//   verifyToken(request: VerifyTokenRequest): Observable<VerifyTokenResponse>;
// }

export interface IAuthGrpcClient {
  register(data: RegisterRequest): Observable<AuthResponse>;
  login(data: LoginRequest): Observable<AuthResponse>;
  validateToken(data: ValidateTokenRequest): Observable<ValidateTokenResponse>;
  refreshToken(data: RefreshTokenRequest): Observable<AuthResponse>;
  logout(data: LogoutRequest): Observable<LogoutResponse>;
}

export const AUTH_GRPC_CLIENT = Symbol('AUTH_GRPC_CLIENT');
