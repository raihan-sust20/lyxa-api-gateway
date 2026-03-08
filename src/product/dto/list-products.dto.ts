import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsInt,
  MinLength,
  Min,
  IsPositive,
} from 'class-validator';
import { ProductResponseDto } from './create-product.dto';

export class ListProductsQueryDto {
  @ApiProperty({ example: 1, required: false, default: 1 })
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ example: 10, required: false, default: 10 })
  @IsNumber()
  @Min(5)
  limit?: number = 10;
}

export class ListProductsResponseDto {
  @ApiProperty({ type: [ProductResponseDto] })
  products: ProductResponseDto[];

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;
}
