import { type CallHandler, type ExecutionContext, Injectable, Logger, type NestInterceptor } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestedAt = Date.now();
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const statusMessage: { [key: number]: string } = {
      200: 'Ok',
      201: 'Created',
      202: 'Accepted',
      204: 'No Content',
    };

    const { url, method } = req;

    return next.handle().pipe(
      map((data) => {
        const code = res.statusCode;
        const response = {
          code,
          message: statusMessage[code],
          data,
        };

        const loggingData = `[${method} <${code}> "${statusMessage[code]}"] ${url} - ${Date.now() - requestedAt}ms`;

        this.logger.log(loggingData);

        return response;
      }),
    );
  }
}
