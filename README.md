# SIGP

Base del monorepo del Sistema Integral de Gestion de Personal.

## Requisitos

- Node.js 24 o superior
- pnpm 12

## Inicio

```bash
pnpm install
pnpm dev
```

El frontend se sirve en `http://localhost:5173` y el backend en
`http://localhost:3000`. El endpoint inicial del backend es `GET /health`.

## Comandos

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm verify
```

`pnpm test` ejecuta las pruebas Vitest del backend. El workflow de GitHub
Actions ejecuta `pnpm verify` en Pull Requests y cambios a `main`.

## Workspaces

- `apps/backend`: API NestJS.
- `apps/frontend`: aplicacion React, Vite y Tailwind CSS.
- `packages/shared`: tipos y utilidades compartidas cuando sean necesarias.

Las integraciones de base de datos, almacenamiento, autenticacion y despliegue
se agregaran al comenzar a implementar los modulos que las necesiten.

## Documentacion

El indice tecnico y funcional se encuentra en [`docs/README.md`](docs/README.md).
Las instrucciones para asistentes de IA estan centralizadas en
[`AGENTS.md`](AGENTS.md).
