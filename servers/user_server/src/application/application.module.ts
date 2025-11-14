import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, SYMBOL_JWT_STRATEGY } from '../common/Guard/strategy/jwt.strategy';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
  controllers: [],
  exports: [InfrastructureModule],
  imports: [
    InfrastructureModule,
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_ID_SECRET'),
      }),
    }),
  ],
  providers: [
    {
      provide: SYMBOL_JWT_STRATEGY,
      useClass: JwtStrategy,
    },
  ],
})
export class ApplicationModule {}
