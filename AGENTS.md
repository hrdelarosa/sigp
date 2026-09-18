# AGENTS.md

Instrucciones para asistentes de IA que trabajen en SIGP. Este archivo es la
fuente canonica para todo el repositorio.

## Proyecto

SIGP es el Sistema Integral de Gestion de Personal. Se construye como un
monolito modular con frontend, backend y contratos compartidos en un monorepo.

Workspaces:

- `apps/backend`: API NestJS 11.
- `apps/frontend`: aplicacion React 19 con Vite y Tailwind CSS 4.
- `packages/shared`: contratos y utilidades que realmente utilicen ambos lados.
- `docs`: contexto funcional y tecnico del proyecto.

Lee `docs/README.md` antes de hacer cambios que afecten arquitectura, dominio o
flujo de desarrollo.

## Estado actual

El repositorio contiene solamente la base ejecutable del monorepo. El backend
expone `GET /health` y el frontend muestra una pantalla inicial.

Todavia no estan implementados:

- persistencia con Drizzle y MySQL;
- autenticacion, usuarios, roles o permisos;
- modulos funcionales de empleados, asignaciones o contratos;
- almacenamiento S3/Garage;
- Swagger, Docker o CI/CD.

No describas una integracion planeada como si ya existiera. Agrega dependencias
solo cuando el cambio actual las use.

## Arquitectura

- Mantener un monolito modular; no introducir microservicios.
- En backend usar `Controller -> Service -> Repository -> Drizzle/MySQL` cuando
  el modulo requiera persistencia.
- No crear de forma general capas `domain`, `application`, `ports` o `adapters`.
- Crear interfaces solo para una frontera real, como almacenamiento de fotos o
  envio de correo.
- Organizar backend por modulos bajo `apps/backend/src/modules`.
- Organizar frontend por funcionalidades bajo `apps/frontend/src/modules`.
- Mantener la gestion de asignaciones dentro del feature de empleados en el
  frontend mientras no exista una necesidad concreta de separarla.
- No mover codigo a `packages/shared` hasta que frontend y backend compartan de
  verdad ese contrato o utilidad.

## Reglas de dominio

- `employees` conserva identidad y datos relativamente estables.
- La situacion laboral y su historial pertenecen a `employee_assignments`.
- Un cambio laboral crea una nueva asignacion y cierra la anterior; no borra el
  historial.
- `appointment_type` y `hiring_type` son conceptos distintos.
- Los tipos iniciales de contratacion son `EVENTUAL` y `PRESUPUESTAL`.
- Una renovacion crea un nuevo contrato enlazado al anterior; nunca sobrescribe
  el periodo anterior.
- QNA, dias restantes y urgencia son valores calculados, no persistidos.
- La fotografia del empleado es opcional. La base solo conservara metadatos y
  la imagen se almacenara en un servicio compatible con S3 cuando se implemente.
- Documentos contractuales, incidencias, vacaciones y justificaciones estan
  fuera del alcance actual.

Consulta `docs/domain.md` para las reglas completas conocidas.

## Forma de trabajar

1. Inspecciona el codigo y la documentacion antes de proponer cambios.
2. Implementa la solucion minima que cubra el requerimiento actual.
3. Sigue los patrones existentes; no refactorices codigo ajeno al cambio.
4. No agregues abstracciones, compatibilidad o configuracion especulativa.
5. Agrega o actualiza pruebas cuando exista comportamiento que verificar.
6. Actualiza la documentacion si cambia una decision, regla o comando.
7. Ejecuta `pnpm verify` antes de considerar terminado un cambio.

Si el requerimiento admite interpretaciones con consecuencias funcionales
distintas, pregunta antes de implementar.

## Skills

- Antes de iniciar una tarea, revisa las skills disponibles y carga las que
  correspondan directamente al trabajo solicitado.
- Usa las skills como instrucciones especializadas durante el analisis, la
  implementacion y la verificacion; no las cargues solo por afinidad general.
- Si una tarea abarca areas distintas, puedes combinar las skills necesarias,
  evitando duplicar trabajo o aplicar recomendaciones incompatibles.
- Las reglas de este archivo, la arquitectura y el alcance solicitado tienen
  prioridad sobre sugerencias genericas de una skill.
- Una skill no autoriza por si sola nuevas dependencias, funcionalidad adicional
  ni cambios fuera del alcance acordado.
- No crees, instales o modifiques skills salvo solicitud explicita.

## Planes locales

- Los planes operativos viven en `.plans/` y no se versionan.
- Si `.plans/README.md` existe, leelo antes de comenzar trabajo planificado y
  abre el plan marcado como activo.
- Antes de implementar, acuerda con el usuario que fase o fases forman el
  incremento actual.
- No avances automaticamente a la siguiente fase aunque el plan completo la
  describa.
- Durante el trabajo actualiza en el plan local el estado, decisiones,
  verificaciones, bloqueadores y siguiente paso.
- La documentacion estable del producto vive en `docs/`; no copies alli el
  seguimiento temporal de una ejecucion.

## Dependencias

- Antes de agregar, actualizar o eliminar una dependencia, detente y solicita
  aprobacion explicita.
- Antes de solicitarla, indica nombre y version propuesta, si pertenece a
  `dependencies` o `devDependencies`, workspace afectado, motivo concreto,
  codigo que la utilizara, alternativas consideradas e impacto esperado en
  `package.json` y `pnpm-lock.yaml`.
- No combines paquetes aprobados con otros que no hayan sido mencionados.
- Instala unicamente los paquetes autorizados. Si aparece otra necesidad,
  solicita una nueva aprobacion.
- Ejecutar `pnpm install --frozen-lockfile` para restaurar exactamente las
  dependencias registradas no requiere aprobacion.

## Convenciones

- TypeScript estricto; evita `any` y conversiones de tipo inseguras.
- Codigo, nombres tecnicos y rutas en ingles.
- Documentacion y textos de negocio en espanol.
- Preferir nombres explicitos y funciones pequenas a comentarios redundantes.
- Mantener controladores delgados; las reglas de negocio viven en servicios.
- No devolver entidades de persistencia directamente desde endpoints cuando el
  contrato de API requiera otra forma.
- En React, mantener estado remoto separado del estado local y no introducir
  estado global sin una necesidad comprobada.
- Usar Tailwind conforme al lenguaje visual existente; evitar estilos genericos
  o componentes ficticios preparados para un futuro incierto.
- Usar Conventional Commits, por ejemplo `feat(employees): add employee list`.

Consulta `docs/conventions.md` para mas detalle.

## Comandos

Ejecutar desde la raiz:

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm verify
```

Usar filtros para un workspace cuando sea suficiente:

```bash
pnpm --filter @sigp/backend dev
pnpm --filter @sigp/frontend dev
pnpm --filter @sigp/shared build
```

## Seguridad

- Nunca versionar `.env`, credenciales, tokens, llaves ni datos personales.
- `.env.example` solo contiene nombres de variables y valores de ejemplo.
- Validar entradas en los limites del sistema.
- Aplicar autorizacion en backend; ocultar elementos en frontend no protege una
  operacion.
- No registrar secretos, contrasenas, cookies, fotografias ni datos personales
  completos.
- No conectar pruebas con bases de produccion.
- No ejecutar migraciones destructivas ni cambios de infraestructura sin una
  solicitud explicita y una estrategia de recuperacion.

## Git

- Crear una rama corta por cambio coherente, por ejemplo `feat/employees`.
- No trabajar directamente en `main` o `master`. El usuario debe crear o
  confirmar la rama de trabajo antes de implementar una fase.
- No mezclar cambios independientes en un mismo commit.
- No modificar ni revertir trabajo no relacionado.
- No hacer commit, push, force push o cambios de historial salvo solicitud
  explicita.
- Antes de commit revisar estado, diff y archivos sensibles.
- El cierre de una fase o feature se realiza mediante el comando global de
  OpenCode `/finish-feature`, que verifica, agrupa commits, publica la rama y
  crea o localiza el Pull Request sin fusionarlo.
- `/finish-feature` requiere una rama distinta de `main`/`master` y un remoto
  `origin` de GitHub por SSH. Si falta alguna condicion, detenerse y explicarla.
- Si el asistente no puede invocar comandos slash programaticamente, debe pedir
  al usuario que ejecute `/finish-feature`; no debe sustituir silenciosamente su
  flujo por comandos Git manuales.
- No usar `/super-commit` para cerrar fases y no modificar su definicion.
