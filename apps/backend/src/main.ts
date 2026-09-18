import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureApp } from './app.configuration';
import type { EnvironmentConfig } from './config/environment.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<EnvironmentConfig, true>>(
    ConfigService,
  );

  configureApp(app, configService);

  await app.listen(configService.getOrThrow('PORT', { infer: true }));
}

void bootstrap();
