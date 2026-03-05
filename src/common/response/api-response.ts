import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty()
  data: T;

  @ApiProperty({ example: 'Request processed successfully' })
  message: string;

  constructor(data: T, message: string, success = true) {
    this.success = success;
    this.data = data;
    this.message = message;
  }

  static ok<T>(data: T, message = 'Request processed successfully'): ApiResponse<T> {
    return new ApiResponse<T>(data, message, true);
  }

  static fail<T>(message: string, data: T = null as T): ApiResponse<T> {
    return new ApiResponse<T>(data, message, false);
  }
}
