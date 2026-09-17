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

## Workspaces

- `apps/backend`: API NestJS.
- `apps/frontend`: aplicacion React, Vite y Tailwind CSS.
- `packages/shared`: tipos y utilidades compartidas cuando sean necesarias.

Las integraciones de base de datos, almacenamiento, autenticacion y despliegue
se agregaran al comenzar a implementar los modulos que las necesiten.
