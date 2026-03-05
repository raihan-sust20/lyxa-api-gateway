import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AuthGrpcClient } from '../grpc-client/auth.grpc-client';
import { LoginDto, LoginResponseDto } from '../dto/login.dto';
import { RegisterDto, RegisterResponseDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authGrpcClient: AuthGrpcClient) {}

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const response = await firstValueFrom(
      this.authGrpcClient.login({
        email: dto.email,
        password: dto.password,
      }),
    );

    return {
      accessToken: response.accessToken,
      tokenType: response.tokenType,
      expiresIn: response.expiresIn,
    };
  }

  async register(dto: RegisterDto): Promise<RegisterResponseDto> {
    const response = await firstValueFrom(
      this.authGrpcClient.register({
        email: dto.email,
        password: dto.password,
        name: dto.name,
      }),
    );

    return {
      id: response.id,
      email: response.email,
      name: response.name,
      createdAt: response.createdAt,
    };
  }
}
