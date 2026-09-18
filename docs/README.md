# Documentacion de SIGP

Este directorio contiene el contexto estable que necesitan desarrolladores y
asistentes de IA para trabajar sin depender de conversaciones anteriores.

## Indice

- [Arquitectura](architecture.md): estructura, limites y dependencias previstas.
- [Dominio](domain.md): alcance y reglas funcionales conocidas.
- [Convenciones](conventions.md): criterios de codigo, nombres y pruebas.
- [Desarrollo](development.md): entorno local, Git y flujo de verificacion.
- [Decisiones tecnicas](technical-decisions.md): decisiones vigentes y elementos
  deliberadamente aplazados.

## Fuentes de verdad

- `AGENTS.md` define como deben trabajar los asistentes de IA.
- El codigo y sus pruebas definen el comportamiento implementado.
- Los planes operativos y su seguimiento viven localmente en `.plans/` y no se
  versionan.
- Estos documentos describen la direccion acordada, pero no convierten una
  funcionalidad planeada en funcionalidad existente.

Cuando el codigo y la documentacion difieran, confirma primero si cambio el
requerimiento y actualiza ambos dentro del mismo cambio cuando corresponda.
