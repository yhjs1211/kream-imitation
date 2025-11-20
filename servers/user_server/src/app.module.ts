import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApplicationModule } from './application/application.module.js';
import { HealthCheckController } from './healthCheck.controller.js';

@Module({
  controllers: [HealthCheckController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApplicationModule,
  ],
  providers: [],
})
export class AppModule {}
