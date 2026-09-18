# Convenciones

## Principios

- Resolver el requerimiento actual con el menor cambio correcto.
- Preferir codigo directo a abstracciones de un solo uso.
- Mantener cada regla en el modulo que es dueno del concepto.
- No corregir o reformatear archivos ajenos al cambio sin necesidad.
- Agregar una dependencia solo cuando el codigo nuevo la utilice.

## Idioma y nombres

- Codigo, identificadores, nombres de archivos, rutas y commits en ingles.
- Documentacion, mensajes funcionales y textos de interfaz en espanol.
- Usar `kebab-case` en directorios de modulos.
- Usar los sufijos habituales de NestJS: `.controller.ts`, `.service.ts`,
  `.repository.ts`, `.module.ts` y `.dto.ts` cuando correspondan.
- Componentes React en `PascalCase`; hooks con prefijo `use`.
- Variables de entorno en `UPPER_SNAKE_CASE`.

## TypeScript

- Mantener modo estricto.
- Evitar `any`; preferir tipos concretos o `unknown` con validacion.
- No usar aserciones para ocultar datos potencialmente ausentes.
- Exportar solo lo que otros modulos consumen.
- No crear enums, constantes o tipos compartidos por anticipacion.

## Backend

- Controladores delgados y sin reglas de negocio.
- Servicios responsables de casos de uso y transacciones.
- Repositorios responsables de persistencia y consultas.
- DTOs distintos de esquemas de base de datos cuando sus contratos difieran.
- Validar toda entrada externa y devolver errores HTTP consistentes.
- Evitar consultas o acceso a tablas de otro modulo fuera de una colaboracion
  explicita entre servicios.
- Fechas de negocio deben tener semantica clara; no asumir zona horaria sin
  documentarla.

## Frontend

- Componentes y logica especifica dentro de su feature.
- Mover a `components`, `hooks` o `lib` solo despues de existir reutilizacion
  real.
- Mantener datos remotos fuera del estado local cuando se incorpore TanStack
  Query.
- Usar parametros de URL para filtros que deban compartirse o sobrevivir una
  recarga.
- Formularios y validacion se incorporaran cuando el primer formulario los
  necesite; no instalar librerias de forma preventiva.
- Mantener interfaces accesibles, responsivas y navegables con teclado.

## Pruebas

- Probar reglas y comportamiento observable, no detalles internos triviales.
- Un bug debe incluir una prueba que falle antes de la correccion cuando sea
  viable.
- Priorizar pruebas de empleados, historial de asignaciones, periodos de
  contrato, renovacion, QNA y urgencia.
- Las pruebas de persistencia deben usar una base aislada, nunca produccion.
- `pnpm verify` debe pasar antes de integrar un cambio.

## Commits

Usar Conventional Commits con un alcance cuando aporte contexto:

```text
feat(employees): add employee creation
fix(contracts): reject invalid date ranges
test(assignments): cover assignment replacement
docs: document local database setup
chore: configure continuous integration
```

Un commit debe representar una intencion coherente y no mezclar refactors sin
relacion con una funcionalidad.

## Documentacion

Actualizar `docs/` cuando cambie:

- una regla de dominio;
- un limite entre modulos;
- una decision tecnica vigente;
- el procedimiento de desarrollo;
- una variable de entorno o comando publico.
