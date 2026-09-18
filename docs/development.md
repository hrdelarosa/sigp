# Desarrollo

## Requisitos

- Node.js 24 o superior.
- pnpm 12.
- Git.

La base de datos y el almacenamiento S3 no son necesarios mientras los modulos
que los consumen no esten implementados.

## Preparacion

```bash
pnpm install
```

`.env.example` enumera la configuracion prevista. Cuando una integracion empiece
a utilizarse, crea un archivo `.env` local con los valores correspondientes. No
versiones ese archivo.

## Ejecutar

Frontend y backend simultaneamente:

```bash
pnpm dev
```

Servicios actuales:

- frontend: `http://localhost:5173`;
- backend: `http://localhost:3000`;
- salud del backend: `GET http://localhost:3000/health`.

Un solo workspace:

```bash
pnpm --filter @sigp/backend dev
pnpm --filter @sigp/frontend dev
```

## Verificacion

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm verify
```

`pnpm verify` ejecuta todas las comprobaciones anteriores y es el criterio local
antes de abrir o actualizar un Pull Request.

Actualmente los workspaces no contienen casos de prueba y el runner informa
cero pruebas. Al agregar comportamiento, deben agregarse las pruebas
correspondientes en el mismo cambio.

## Flujo Git

Partir de `main` actualizado y crear una rama por cambio coherente:

```bash
git switch main
git pull
git switch -c feat/employees
```

Prefijos habituales:

- `feat/` para funcionalidad;
- `fix/` para correcciones;
- `refactor/` para cambios internos sin alterar comportamiento;
- `docs/` para documentacion;
- `chore/` para herramientas o mantenimiento.

Antes del commit:

```bash
pnpm verify
git status --short
git diff
```

Crear commits semanticos y pequenos. Subir la rama y abrir un Pull Request hacia
`main` cuando exista un remoto configurado.

## Agregar un modulo

1. Confirma las reglas y el alcance en `docs/domain.md`.
2. Crea solo los archivos necesarios para el primer caso de uso.
3. Manten la logica en el modulo dueno del concepto.
4. Agrega dependencias unicamente si el caso de uso las requiere.
5. Incluye validacion y pruebas del comportamiento nuevo.
6. Actualiza documentacion y `.env.example` si cambia la operacion local.
7. Ejecuta `pnpm verify`.

No es necesario llenar por adelantado todos los directorios vacios de un modulo.

## Variables previstas

Backend:

```text
NODE_ENV
PORT
DATABASE_URL
FRONTEND_ORIGIN
SESSION_SECRET
S3_ENDPOINT
S3_REGION
S3_ACCESS_KEY_ID
S3_SECRET_ACCESS_KEY
S3_BUCKET
S3_FORCE_PATH_STYLE
EMPLOYEE_PHOTO_MAX_MB
```

Frontend:

```text
VITE_API_URL
```

Una variable listada no implica que el codigo ya la consuma. Elimina variables
obsoletas cuando una decision cambie.
