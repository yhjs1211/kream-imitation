import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BadRequestExceptionFilter } from './common/Exceptions/BadRequest.exception.filter';
import { ForbiddenExceptionFilter } from './common/Exceptions/Forbidden.exception.filter';
import { NotFoundExceptionFilter } from './common/Exceptions/NotFound.exception.filter';
import { UnauthorizedExceptionFilter } from './common/Exceptions/Unauthorized.exception.filter';
import { UnexpectedExceptionsFilter } from './common/Exceptions/Unexpected.exception.filter';

async function bootstrap() {
  const logLevels: ('error' | 'warn' | 'log' | 'verbose' | 'debug' | 'fatal')[] =
    process.env.NODE_ENV === 'development' ? ['error', 'warn', 'log', 'debug'] : ['error', 'warn'];

  const logger = new ConsoleLogger({
    prefix: 'KREAM_NOTIFICATION',
    colors: false,
    logLevels,
  });

  const app = await NestFactory.create(AppModule, {
    logger,
  });

  const configService = app.get(ConfigService);

  // CONFIG
  app.enableCors({
    credentials: true,
    origin: process.env.NODE_ENV === 'development' ? 'http://localhost' : 'https://yhjs1211.tplinkdns.com',
  });
  app.setGlobalPrefix('/api');

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('KREAM IMITATION NOTIFICATION_SERVER')
    .setDescription('알림 서버 API')
    .setVersion('1.0')
    .addTag('NOTIFICATION')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, documentFactory);

  // Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );

  // ExceptionFilter
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new UnexpectedExceptionsFilter(httpAdapter),
    new BadRequestExceptionFilter(),
    new UnauthorizedExceptionFilter(),
    new ForbiddenExceptionFilter(),
    new NotFoundExceptionFilter(),
  );

  const dns = process.env.NODE_ENV === 'development' ? 'http://localhost' : 'https://yhjs1211.tplinkdns.com';
  const serverPort = configService.get<number>('SERVER_PORT') || 6000;

  await app.listen(serverPort, () => {
    logger.debug(`Listening on ${dns}:${serverPort}`);
  });
}

bootstrap();
