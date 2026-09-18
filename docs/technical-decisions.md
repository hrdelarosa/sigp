# Decisiones tecnicas

Este documento resume decisiones vigentes. No sustituye ADRs detallados si en
el futuro una decision requiere alternativas, consecuencias y aprobacion formal.

## Adoptadas

### Monorepo con pnpm

Se utilizan workspaces de pnpm para mantener backend, frontend y contratos
compartidos en un repositorio. No se agrega Turborepo mientras los scripts
recursivos cubran las necesidades reales.

### Node.js 24 y TypeScript estricto

Los workspaces comparten una configuracion estricta de TypeScript. La version de
Node es la base comun para desarrollo, CI y futuras imagenes de despliegue.

### Monolito modular

Todos los modulos backend viven dentro de una aplicacion NestJS. Esta etapa no
justifica despliegues independientes, comunicacion distribuida ni duplicacion de
infraestructura propia de microservicios.

### Arquitectura backend pragmatica

El patron previsto es `Controller -> Service -> Repository`. No se adopta una
arquitectura hexagonal estricta. Las interfaces aparecen cuando existe una
frontera tecnica real.

### React, Vite y Tailwind CSS

El frontend utiliza React 19, Vite y Tailwind CSS 4. Otras librerias se agregan
con el primer caso de uso que las necesite, no como instalacion preventiva.

### Configuracion validada del backend

El backend usa `@nestjs/config` para cargar `.env` y validar las variables que
consume. `NODE_ENV`, `PORT` y `FRONTEND_ORIGIN` tienen valores locales seguros
por defecto y fallan al iniciar cuando reciben valores invalidos. Las variables
de integraciones futuras no se validan hasta que exista codigo que las use.

### Pruebas iniciales del backend

Vitest, `@nestjs/testing` y Supertest cubren la aplicacion NestJS. Los
workspaces sin comportamiento verificable no mantienen scripts de prueba vacios,
para no dar resultados exitosos sin pruebas ejecutadas.

### Lint tipado y Hooks de React

ESLint usa el servicio de proyectos de TypeScript para analizar el codigo de los
workspaces y `eslint-plugin-react-hooks` para detectar usos invalidos de Hooks.
Los archivos de configuracion permanecen fuera del analisis tipado para evitar
proyectos TypeScript artificiales.

### Integracion continua basica

GitHub Actions valida Pull Requests y cambios a `main` mediante
`pnpm install --frozen-lockfile` y `pnpm verify`. No construye imagenes ni
ejecuta despliegues; esos pasos se evaluaran cuando exista una version
desplegable.

### Historial explicito

La situacion laboral vive en asignaciones con vigencia. Las renovaciones son
nuevos contratos enlazados al anterior. Esta decision evita perder informacion
historica por actualizaciones destructivas.

### Integraciones diferidas

Drizzle/MySQL, Swagger, S3/Garage, Docker y CD estan previstos, pero se
configuraran cuando exista codigo o un flujo desplegable que permita validarlos.
Esto evita configuracion muerta y dependencias sin uso.

## Restricciones vigentes

- No microservicios.
- No documentos contractuales en la primera version.
- No modulos de incidencias, vacaciones o justificaciones.
- No API intermedia de empleados.
- No persistir QNA, dias restantes ni urgencia mientras puedan calcularse.
- No tabla de fotografias mientras exista una sola fotografia actual.

## Por definir con informacion real

- valores del catalogo de tipos de nombramiento;
- reglas exactas de compatibilidad o solapamiento de contratos;
- estrategia de sesion y autenticacion;
- politicas institucionales de retencion de auditoria;
- zonas horarias y calendario operativo;
- configuracion final de infraestructura y respaldos;
- necesidad real de correo para notificaciones.

Estas decisiones no deben resolverse silenciosamente desde el codigo. Si un
cambio depende de ellas, primero se debe obtener el requerimiento correspondiente.
