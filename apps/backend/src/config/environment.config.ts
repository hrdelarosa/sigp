const nodeEnvironments = ['development', 'test', 'production'] as const;

type NodeEnvironment = (typeof nodeEnvironments)[number];

export interface EnvironmentConfig {
  NODE_ENV: NodeEnvironment;
  PORT: number;
  FRONTEND_ORIGIN: string;
}

export function validateEnvironment(
  environment: Record<string, unknown>,
): EnvironmentConfig {
  const nodeEnvironment = readNodeEnvironment(environment.NODE_ENV);
  const port = readPort(environment.PORT);
  const frontendOrigin = readFrontendOrigin(environment.FRONTEND_ORIGIN);

  return {
    NODE_ENV: nodeEnvironment,
    PORT: port,
    FRONTEND_ORIGIN: frontendOrigin,
  };
}

function readNodeEnvironment(value: unknown): NodeEnvironment {
  const environment = readString(value, 'NODE_ENV', 'development');

  if (nodeEnvironments.includes(environment as NodeEnvironment)) {
    return environment as NodeEnvironment;
  }

  throw new Error(
    'NODE_ENV must be one of: development, test, production.',
  );
}

function readPort(value: unknown): number {
  const portValue = readString(value, 'PORT', '3000');
  const port = Number(portValue);

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }

  return port;
}

function readFrontendOrigin(value: unknown): string {
  const origin = readString(value, 'FRONTEND_ORIGIN', 'http://localhost:5173');

  try {
    const url = new URL(origin);

    if (
      (url.protocol !== 'http:' && url.protocol !== 'https:') ||
      url.origin !== origin
    ) {
      throw new Error();
    }
  } catch {
    throw new Error('FRONTEND_ORIGIN must be an HTTP or HTTPS origin.');
  }

  return origin;
}

function readString(value: unknown, name: string, fallback: string): string {
  if (value === undefined || value === '') {
    return fallback;
  }

  if (typeof value !== 'string') {
    throw new Error(`${name} must be a string.`);
  }

  return value;
}
