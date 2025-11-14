import { type ArgumentsHost, Catch, type ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import type { HttpAdapterHost } from '@nestjs/core';
import { SentryExceptionCaptured } from '@sentry/nestjs';

@Catch()
export class UnexpectedExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(UnexpectedExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  @SentryExceptionCaptured()
  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage = exception?.message ?? 'No Message';
    const errorData = exception?.data ?? {};
    const errorStack = exception?.stack ? exception.stack.split('\n').map((v) => v.trimStart()) : [];
    const exceptionType = exception.name === 'Error' ? 'INTERNAL_SERVER_ERROR' : exception.name;
    const location = exception.location ?? undefined;

    const responseBody = {
      code: httpStatus,
      data: process.env.NODE_ENV === 'development' ? errorData : undefined,
      message: errorMessage,
    };

    const loggingData = {
      ...responseBody,
      exceptionType,
      location,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      stack: errorStack,
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
    };

    this.logger.error(loggingData);

    httpAdapter.reply(ctx.getResponse(), { error: responseBody }, httpStatus);
  }
}
