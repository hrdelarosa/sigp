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

### Historial explicito

La situacion laboral vive en asignaciones con vigencia. Las renovaciones son
nuevos contratos enlazados al anterior. Esta decision evita perder informacion
historica por actualizaciones destructivas.

### Integraciones diferidas

Drizzle/MySQL, Swagger, S3/Garage, Docker y CI/CD estan previstos, pero se
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
