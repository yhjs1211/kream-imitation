import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApplicationModule } from './application/application.module';
import { HealthCheckController } from './healthCheck.controller';

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
