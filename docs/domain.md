# Dominio funcional

## Alcance inicial

SIGP administrara:

- empleados;
- historial laboral mediante asignaciones;
- vigencias y renovaciones de contratos;
- avisos de vencimiento;
- usuarios, roles y permisos;
- catalogos de puestos, areas y oficinas;
- auditoria de operaciones relevantes.

El empleado es la entidad central. Los datos que cambian con el tiempo deben
modelarse como historial y no sobrescribirse en el registro del empleado.

## Empleados

`employees` conserva datos propios y relativamente estables:

- identificador;
- numero de empleado unico;
- nombre completo;
- fecha de ingreso;
- estado `ACTIVE` o `INACTIVE`;
- metadatos de una fotografia opcional;
- fechas de creacion y actualizacion.

Puesto, area, oficina, horario y tipos laborales no pertenecen directamente al
empleado porque pueden cambiar durante su vida laboral.

### Fotografia

- Nunca es obligatoria para crear un empleado.
- Formatos previstos: JPG, JPEG, PNG y WEBP.
- El limite de tamano sera configurable.
- Debe validarse el MIME real.
- Solo existe una fotografia activa por empleado.
- La base conserva metadatos; el archivo vive en almacenamiento compatible con
  S3 bajo una ruta equivalente a
  `employees/{employeeId}/profile/{uuid}.{ext}`.
- Subir, reemplazar o eliminar una fotografia genera auditoria.

No se necesita una tabla `employee_photos` mientras solo exista una fotografia
actual por empleado.

## Asignaciones laborales

`employee_assignments` registra la situacion laboral durante un periodo:

- empleado;
- puesto;
- unidad organizacional o area;
- oficina o adscripcion;
- horario;
- tipo de nombramiento (`appointment_type`);
- tipo de contratacion (`hiring_type`);
- vigencia desde y hasta;
- notas opcionales.

La asignacion actual normalmente tiene `effective_to = NULL`. Si cambia un dato
laboral, se cierra la asignacion anterior y se crea otra. No se reescribe el
historial.

`appointment_type` y `hiring_type` son conceptos distintos. Los valores exactos
de nombramiento dependen de los catalogos reales de RH. Los tipos iniciales de
contratacion son:

- `EVENTUAL`;
- `PRESUPUESTAL`.

Puestos, unidades organizacionales y oficinas deben ser catalogos cuando exista
una lista institucional; evitar texto libre.

## Contratos

Un contrato pertenece a un empleado y a la asignacion laboral vigente durante
el periodo. De esta manera no duplica puesto, area, oficina, horario ni tipos de
relacion laboral.

Datos principales previstos:

- contrato anterior opcional;
- inicio y termino de vigencia;
- fecha de proxima renovacion;
- estado;
- notas opcionales;
- usuario creador y marcas de tiempo.

Estados iniciales:

- `ACTIVE`;
- `RENEWED`;
- `EXPIRED`;
- `CANCELLED`.

`DRAFT` solo se agregara si RH confirma que necesita guardar capturas
incompletas.

### Renovacion

Una renovacion es un nuevo contrato cuyo `previous_contract_id` apunta al
contrato anterior. El contrato anterior pasa a `RENEWED`. Nunca se reemplazan
sus fechas ni se crean procesos de aprobacion anticipadamente.

### Valores calculados

- QNA se deriva de `next_renewal_date`: dias 1 a 15 son la primera quincena del
  mes y dias 16 al final son la segunda.
- Dias restantes se calcula respecto de la fecha relevante del contrato.
- Urgencia inicial: `NORMAL`, `EXPIRING_30`, `EXPIRING_15` o `EXPIRED`.

Estos valores no se persisten inicialmente.

Los documentos de contrato estan fuera del alcance de la primera version.

## Notificaciones

Los avisos iniciales se generan 30 y 15 dias antes de la fecha correspondiente.
La primera version contempla notificaciones dentro del sistema. El correo puede
agregarse despues si existe el requerimiento.

## Auditoria

Se deben registrar, como minimo, operaciones relevantes sobre:

- alta y modificacion de empleados;
- carga, reemplazo y eliminacion de fotografias;
- creacion y cierre de asignaciones;
- creacion, renovacion y cancelacion de contratos.

Un registro de auditoria identifica usuario, accion, tipo de entidad, entidad,
detalle opcional y fecha. No debe almacenar secretos ni contenido binario.

## Autorizacion prevista

Los permisos se expresaran por recurso y accion, por ejemplo:

```text
employees:read
employees:create
employees:update
employees:photo:update
employee-assignments:read
employee-assignments:create
employee-assignments:update
contracts:read
contracts:create
contracts:update
contracts:renew
contracts:cancel
notifications:read
users:manage
roles:manage
audit:read
```

El backend es la autoridad para aplicar permisos. El frontend solo adapta la
experiencia visual a las capacidades del usuario.

## Fuera de alcance

- documentos contractuales;
- incidencias;
- vacaciones;
- justificaciones;
- flujos de aprobacion no confirmados;
- tablas administrativas que RH aun no haya validado.
