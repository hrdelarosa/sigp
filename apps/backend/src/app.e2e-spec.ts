import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import type { Server } from 'node:http';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { configureApp } from './app.configuration';
import { AppModule } from './app.module';
import type { EnvironmentConfig } from './config/environment.config';

describe('Application', () => {
  let app: INestApplication;
  let server: Server;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    configureApp(
      app,
      app.get<ConfigService<EnvironmentConfig, true>>(ConfigService),
    );
    await app.init();
    server = app.getHttpServer() as Server;
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns the health status', async () => {
    await request(server)
      .get('/health')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({ status: 'ok' });
  });

  it('allows the configured frontend origin', async () => {
    await request(server)
      .get('/health')
      .set('Origin', 'http://localhost:5173')
      .expect('Access-Control-Allow-Origin', 'http://localhost:5173')
      .expect(200);
  });

  it('does not allow other origins', async () => {
    const response = await request(server)
      .get('/health')
      .set('Origin', 'https://untrusted.example.org')
      .expect(200);

    expect(response.headers['access-control-allow-origin']).toBeUndefined();
  });
});
