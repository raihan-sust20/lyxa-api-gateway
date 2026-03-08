import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsInt,
  MinLength,
  Min,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Wireless Headphones' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'High-quality noise-cancelling wireless headphones' })
  @IsString()
  @MinLength(10)
  description: string;

  @ApiProperty({ example: 99.99 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @ApiProperty({ example: 50 })
  @IsInt()
  @Min(0)
  stock: number;
}

export class ProductResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-...' })
  id: string;

  @ApiProperty({ example: 'Wireless Headphones' })
  name: string;

  @ApiProperty({ example: 'High-quality noise-cancelling wireless headphones' })
  description: string;

  @ApiProperty({ example: 99.99 })
  price: number;

  @ApiProperty({ example: 50 })
  stock: number;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: string;
}
