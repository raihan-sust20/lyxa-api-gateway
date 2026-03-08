import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse as SwaggerResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductService } from '../service/product.service';
import {
  CreateProductDto,
  ProductResponseDto,
} from '../dto/create-product.dto';
import { ListProductsQueryDto, ListProductsResponseDto } from '../dto/list-products.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ApiResponse } from '../../common/response/api-response';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'List all products with pagination' })
  @SwaggerResponse({
    status: 200,
    description: 'Products retrieved successfully',
    type: ListProductsResponseDto,
  })
  async listProducts(
    @Query() query: ListProductsQueryDto,
    @Headers('authorization') authorization: string,
  ): Promise<ApiResponse<ListProductsResponseDto>> {
    const authToken = authorization?.replace('Bearer ', '');
    const data = await this.productService.listProducts(authToken, query);
    return ApiResponse.ok(data, 'Products retrieved successfully');
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', description: 'Product UUID' })
  @SwaggerResponse({
    status: 200,
    description: 'Product retrieved successfully',
    type: ProductResponseDto,
  })
  @SwaggerResponse({ status: 404, description: 'Product not found' })
  async getProduct(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ): Promise<ApiResponse<ProductResponseDto>> {
    const authToken = authorization?.replace('Bearer ', '');
    const data = await this.productService.getProduct(authToken, id);
    return ApiResponse.ok(data, 'Product retrieved successfully');
  }

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new product' })
  @SwaggerResponse({
    status: 201,
    description: 'Product created successfully',
    type: ProductResponseDto,
  })
  @SwaggerResponse({ status: 400, description: 'Validation error' })
  async createProduct(
    @Body() dto: CreateProductDto,
    @Headers('authorization') authorization: string,
  ): Promise<ApiResponse<ProductResponseDto>> {
    const authToken = authorization?.replace('Bearer ', '');
    const data = await this.productService.createProduct(authToken, dto);
    return ApiResponse.ok(data, 'Product created successfully');
  }

  @Put(':id')
  @Version('1')
  @ApiOperation({ summary: 'Update an existing product' })
  @ApiParam({ name: 'id', description: 'Product UUID' })
  @SwaggerResponse({
    status: 200,
    description: 'Product updated successfully',
    type: ProductResponseDto,
  })
  @SwaggerResponse({ status: 404, description: 'Product not found' })
  async updateProduct(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<ApiResponse<ProductResponseDto>> {
    const data = await this.productService.updateProduct(id, dto);
    return ApiResponse.ok(data, 'Product updated successfully');
  }

  @Delete(':id')
  @Version('1')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', description: 'Product UUID' })
  @SwaggerResponse({ status: 200, description: 'Product deleted successfully' })
  @SwaggerResponse({ status: 404, description: 'Product not found' })
  async deleteProduct(
    @Param('id') id: string,
  ): Promise<ApiResponse<{ success: boolean; message: string }>> {
    const data = await this.productService.deleteProduct(id);
    return ApiResponse.ok(data, 'Product deleted successfully');
  }
}
