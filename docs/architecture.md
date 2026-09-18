# Arquitectura

## Vision general

SIGP es un monolito modular compuesto por una aplicacion web, una API y un
paquete compartido. Esta estructura permite desarrollar y desplegar cada
aplicacion de forma clara sin asumir el costo operativo de microservicios.

```text
sigp/
|-- apps/
|   |-- backend/       API NestJS
|   `-- frontend/      React, Vite y Tailwind CSS
|-- packages/
|   `-- shared/        Contratos compartidos cuando sean necesarios
`-- docs/              Contexto tecnico y funcional
```

El gestor del monorepo es pnpm workspaces. No se utiliza un orquestador
adicional mientras los scripts recursivos de pnpm sean suficientes.

## Backend

El backend es una sola aplicacion NestJS. Los limites funcionales previstos son:

```text
apps/backend/src/modules/
|-- auth/
|-- users/
|-- roles/
|-- permissions/
|-- employees/
|-- employee-assignments/
|-- contracts/
|-- notifications/
`-- audit/
```

Cada modulo debe empezar con la menor estructura que necesite. Cuando exista
persistencia, el flujo normal sera:

```text
Controller -> Service -> Repository -> Drizzle -> MySQL
```

Responsabilidades:

- Controller: transporte HTTP, parametros y forma de la respuesta.
- Service: casos de uso, reglas de negocio y coordinacion.
- Repository: consultas y persistencia del modulo.
- Schema: definicion de tablas y relaciones de Drizzle.

No se adopta arquitectura hexagonal de forma general. Una interfaz se justifica
cuando representa una frontera intercambiable real, como almacenamiento de
fotografias o envio de correo.

## Frontend

El frontend se organiza por funcionalidad:

```text
apps/frontend/src/
|-- app/               composicion de la aplicacion
|-- assets/            recursos estaticos
|-- components/        componentes compartidos reales
|-- config/            configuracion de frontend
|-- hooks/             hooks reutilizados
|-- lib/               clientes y utilidades comunes
`-- modules/
    |-- auth/
    |-- dashboard/
    |-- employees/
    |-- contracts/
    |-- notifications/
    `-- administration/
```

La gestion de asignaciones laborales puede vivir inicialmente dentro de
`employees` en el frontend. El dashboard se construira cuando existan datos
reales; no debe adelantarse con estadisticas ficticias.

## Paquete compartido

`@sigp/shared` se reserva para contratos, tipos o utilidades consumidos por al
menos dos workspaces. No debe convertirse en un directorio generico para codigo
que solo pertenece a una aplicacion.

## Datos e integraciones previstas

Estas decisiones forman parte de la direccion del proyecto, pero aun no estan
implementadas:

- Drizzle ORM con MySQL 8 para persistencia.
- Garage o un servicio compatible con S3 para fotografias de empleados.
- Swagger/OpenAPI para documentar la API cuando existan endpoints funcionales.
- Docker y despliegue mediante Dokploy cuando haya una version desplegable.

MySQL y Garage son infraestructura, no modulos de negocio. El frontend nunca se
conecta directamente a ellos.

## Limites

- No microservicios en esta etapa.
- No API intermedia de empleados: SIGP administrara empleados y podra exponer
  su propia API en el futuro.
- No documentos contractuales en la primera version.
- No incidencias, vacaciones ni justificaciones; actualmente pertenecen a otro
  sistema.
- No abstracciones para integraciones que aun no existen.

## Estado ejecutable actual

- Backend: `GET /health` responde `{ "status": "ok" }`.
- Frontend: pantalla inicial servida por Vite.
- Shared: paquete TypeScript vacio preparado para contratos futuros.
- Persistencia y modulos funcionales: no implementados.
