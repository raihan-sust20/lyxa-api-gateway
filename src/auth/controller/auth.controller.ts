import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Version,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse as SwaggerResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto, AuthResponseDto } from '../dto/register.dto';
import { ApiResponse } from '../../common/response/api-response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Version('1')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user and return access token' })
  @SwaggerResponse({ status: 200, description: 'Login successful', type: AuthResponseDto })
  @SwaggerResponse({ status: 400, description: 'Invalid credentials or validation error' })
  @SwaggerResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() dto: LoginDto): Promise<ApiResponse<AuthResponseDto>> {
    const data = await this.authService.login(dto);
    return ApiResponse.ok(data, 'Login successful');
  }

  @Post('register')
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user account' })
  @SwaggerResponse({ status: 201, description: 'User registered successfully', type: AuthResponseDto })
  @SwaggerResponse({ status: 400, description: 'Validation error' })
  @SwaggerResponse({ status: 409, description: 'Email already exists' })
  async register(@Body() dto: RegisterDto): Promise<ApiResponse<AuthResponseDto>> {
    const data = await this.authService.register(dto);
    return ApiResponse.ok(data, 'User registered successfully');
  }
}
