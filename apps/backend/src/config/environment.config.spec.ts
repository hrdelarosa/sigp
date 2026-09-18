import { describe, expect, it } from 'vitest';
import { validateEnvironment } from './environment.config';

describe('validateEnvironment', () => {
  it('uses the local development defaults', () => {
    expect(validateEnvironment({})).toEqual({
      NODE_ENV: 'development',
      PORT: 3000,
      FRONTEND_ORIGIN: 'http://localhost:5173',
    });
  });

  it('accepts valid configuration values', () => {
    expect(
      validateEnvironment({
        NODE_ENV: 'production',
        PORT: '8080',
        FRONTEND_ORIGIN: 'https://sigp.example.org',
      }),
    ).toEqual({
      NODE_ENV: 'production',
      PORT: 8080,
      FRONTEND_ORIGIN: 'https://sigp.example.org',
    });
  });

  it.each([
    [{ NODE_ENV: 'staging' }, 'NODE_ENV'],
    [{ PORT: '0' }, 'PORT'],
    [{ FRONTEND_ORIGIN: 'sigp.example.org' }, 'FRONTEND_ORIGIN'],
  ])('rejects invalid configuration %o', (environment, variableName) => {
    expect(() => validateEnvironment(environment)).toThrow(variableName);
  });
});
