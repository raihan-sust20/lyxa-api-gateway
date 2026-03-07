import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  name: string;
}

export class AuthResponseDto {
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-...' })
  userId: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-...' })
  accessToken: string;

  @ApiProperty({ example: 'a1b2c3d5-f5h6-...' })
  refreshToken: string;

  @ApiProperty({ example: 1700001000 })
  accessTokenExpiresAt: number;

  @ApiProperty({ example: 1700003000 })
  refreshTokenExpiresAt: number;
}
