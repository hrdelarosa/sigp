# GitHub Copilot instructions

Follow `AGENTS.md` as the canonical repository guidance and read
`docs/README.md` for the architecture and domain context relevant to a change.

Key constraints:

- Keep SIGP as a modular monolith.
- Implement only the capability requested now; do not prebuild future modules.
- Backend modules use NestJS and should evolve toward
  `Controller -> Service -> Repository -> Drizzle/MySQL` when persistence is
  introduced.
- Frontend features belong under `apps/frontend/src/modules`.
- Preserve employee assignment and contract history instead of overwriting it.
- Add dependencies only when the current change uses them.
- Never expose or commit secrets or personal data.
- Run `pnpm verify` after code changes.

Code identifiers are written in English. Business-facing documentation and UI
copy are written in Spanish.
