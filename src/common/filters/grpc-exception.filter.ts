import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { RpcException } from '@nestjs/microservices';
import { ApiResponse } from '../response/api-response';

interface GrpcError {
  code?: number;
  message?: string;
  details?: string;
}

/**
 * Maps gRPC status codes to HTTP status codes.
 * Reference: https://grpc.github.io/grpc/core/md_doc_statuscodes.html
 */
const GRPC_TO_HTTP_STATUS: Record<number, number> = {
  0: HttpStatus.OK,                         // OK
  1: HttpStatus.INTERNAL_SERVER_ERROR,      // CANCELLED
  2: HttpStatus.INTERNAL_SERVER_ERROR,      // UNKNOWN
  3: HttpStatus.BAD_REQUEST,               // INVALID_ARGUMENT
  4: HttpStatus.REQUEST_TIMEOUT,           // DEADLINE_EXCEEDED
  5: HttpStatus.NOT_FOUND,                 // NOT_FOUND
  6: HttpStatus.CONFLICT,                  // ALREADY_EXISTS
  7: HttpStatus.FORBIDDEN,                 // PERMISSION_DENIED
  8: HttpStatus.TOO_MANY_REQUESTS,         // RESOURCE_EXHAUSTED
  9: HttpStatus.BAD_REQUEST,               // FAILED_PRECONDITION
  10: HttpStatus.CONFLICT,                 // ABORTED
  11: HttpStatus.BAD_REQUEST,              // OUT_OF_RANGE
  12: HttpStatus.NOT_IMPLEMENTED,          // UNIMPLEMENTED
  13: HttpStatus.INTERNAL_SERVER_ERROR,    // INTERNAL
  14: HttpStatus.SERVICE_UNAVAILABLE,      // UNAVAILABLE
  15: HttpStatus.INTERNAL_SERVER_ERROR,    // DATA_LOSS
  16: HttpStatus.UNAUTHORIZED,             // UNAUTHENTICATED
};

@Catch(RpcException, Error)
export class GrpcExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GrpcExceptionFilter.name);

  catch(exception: RpcException | HttpException | Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      const message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as { message?: string }).message ?? exception.message;

      response.status(status).json(ApiResponse.fail(message));
      return;
    }

    let grpcError: GrpcError = {};

    if (exception instanceof RpcException) {
      const error = exception.getError();
      grpcError = typeof error === 'string' ? { message: error } : (error as GrpcError);
    } else {
      grpcError = { message: exception.message };
    }

    const httpStatus = GRPC_TO_HTTP_STATUS[grpcError.code ?? 2] ?? HttpStatus.INTERNAL_SERVER_ERROR;
    const message = grpcError.details ?? grpcError.message ?? 'An unexpected error occurred';

    this.logger.error(
      `gRPC error [code=${grpcError.code}]: ${message}`,
    );

    response.status(httpStatus).json(ApiResponse.fail(message));
  }
}
