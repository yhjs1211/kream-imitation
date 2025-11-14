import {
  type ArgumentsHost,
  BadRequestException,
  Catch,
  type ExceptionFilter,
  type HttpException,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(BadRequestException.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const errorResponse = exception.getResponse();
    const errorMessage = errorResponse['message'] ?? exception.message;
    const errorData = errorResponse['data'] ?? {};

    const responseBody = {
      code: status,
      message: errorMessage,
      data: process.env.NODE_ENV === 'development' ? errorData : undefined,
    };

    const loggingData = {
      ...responseBody,
      timestamp: new Date().toISOString(),
    };

    this.logger.error(loggingData);

    response.status(status).json({ error: responseBody });
  }
}
