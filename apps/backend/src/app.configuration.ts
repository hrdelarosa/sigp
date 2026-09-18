import type { INestApplication } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { EnvironmentConfig } from './config/environment.config';

export function configureApp(
  app: INestApplication,
  configService: ConfigService<EnvironmentConfig, true>,
) {
  app.enableCors({
    origin: configService.getOrThrow('FRONTEND_ORIGIN', { infer: true }),
  });
}
