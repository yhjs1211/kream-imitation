import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  type HttpException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { SentryExceptionCaptured } from '@sentry/nestjs';
import type { Request, Response } from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(NotFoundExceptionFilter.name);

  @SentryExceptionCaptured()
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse = exception.getResponse();
    const errorMessage = errorResponse['message'] ?? exception.message;
    const errorData = errorResponse['data'] ?? {};
    const exceptionType = exception.name;
    const location = errorResponse['location'] ?? undefined;

    const responseBody = {
      code: status,
      data: process.env.NODE_ENV === 'development' ? errorData : undefined,
      message: errorMessage,
    };

    const loggingData = {
      ...responseBody,
      exceptionType,
      location,
      path: request.url,
      statusCode: status,
      timestamp: new Date().toISOString(),
    };

    this.logger.error(loggingData);

    response.status(status).json({ error: responseBody });
  }
}
