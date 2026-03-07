import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AuthGrpcClient } from '../grpc-client/auth.grpc-client';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto, AuthResponseDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authGrpcClient: AuthGrpcClient) {}

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const response = await firstValueFrom(
      this.authGrpcClient.login({
        email: dto.email,
        password: dto.password,
      }),
    );

    return response;
  }

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const response = await firstValueFrom(
      this.authGrpcClient.register({
        email: dto.email,
        password: dto.password,
        name: dto.name,
      }),
    );

    return response;
  }
}
