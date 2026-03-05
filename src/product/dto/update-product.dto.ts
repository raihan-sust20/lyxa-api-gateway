import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsInt,
  MinLength,
  Min,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ example: 'Wireless Headphones Pro', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiProperty({ example: 'Updated description for the product', required: false })
  @IsOptional()
  @IsString()
  @MinLength(10)
  description?: string;

  @ApiProperty({ example: 129.99, required: false })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price?: number;

  @ApiProperty({ example: 75, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;
}
