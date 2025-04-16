import { NestFactory } from '@nestjs/core';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { envs } from './config';
import { RpcCustomExceptionFilter } from './common/exceptions';

async function bootstrap() {
  const logger = new Logger('MainGateway');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', {
    exclude: [{ path: '', method: RequestMethod.GET }],
  });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(envs.port);

  logger.log(`🚀 Application is running on port: ${envs.port}`);
}
bootstrap();
