import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from './common/Interceptors/Response.interceptor';

@UseInterceptors(ResponseInterceptor)
@Controller('health-check')
export class HealthCheckController {
  @Get()
  healthCheck() {
    return 'Health Check OK';
  }
}
