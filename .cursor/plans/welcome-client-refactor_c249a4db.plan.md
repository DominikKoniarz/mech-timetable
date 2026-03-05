---
name: welcome-client-refactor
overview: Move welcome dept/group fetching to client via React Query + Elysia handlers, add nuqs for search param state, keep temp server cookie fallback for first profile.
todos:
  - id: api-routes
    content: "Add Elysia endpoints: departments + groups-by-department"
    status: pending
  - id: nuqs-setup
    content: Install nuqs and wire NuqsAdapter + welcome parser
    status: pending
  - id: welcome-client-queries
    content: Move welcome dept/groups fetch to client useQuery (15m stale)
    status: pending
  - id: welcome-loading-error
    content: Add close-form skeleton + explicit query error handling
    status: pending
  - id: validate-and-verify
    content: Check schema/fallback logic, run lint/types, smoke test
    status: pending
isProject: false
---

# Welcome Client Refactor

## Phase 1 — API handlers

- Update `[src/app/[locale]/api/[[...slugs]]/route.ts](src/app/[locale]/api/[[...slugs]]/route.ts)`: add `GET /api/departments` and `GET /api/departments/:departmentName/groups`.
- Reuse existing fetch/parse funcs from `[src/lib/data/fetcher.ts](src/lib/data/fetcher.ts)` + `[src/lib/data/parser.ts](src/lib/data/parser.ts)`.
- Keep error style same as current route: non-200 with `Response("...", { status })`; success returns plain JSON.

## Phase 2 — Nuqs + query wiring

- Add `nuqs` dep in `[package.json](package.json)`.
- Wrap app with `NuqsAdapter` (app router) in provider/layout path (likely `[src/app/[locale]/layout.tsx](src/app/[locale]/layout.tsx)` or client provider).
- Add welcome search-param parser module (single source of truth for `departmentName`).
- Replace `router.push` query sync in `[src/views/welcome-page/components/welcome-selects.tsx](src/views/welcome-page/components/welcome-selects.tsx)` with `nuqs` setter.
- keep state mutations client side without next.js page "reload"

## Phase 3 — Client fetch refactor

- Stop server fetching departments/groups in `[src/app/[locale]/welcome/page.tsx](src/app/[locale]/welcome/page.tsx)`; keep temp cookie read for initial first-profile fallback only.
- Add hooks for welcome queries (new files under `src/views/welcome-page/hooks/`):
  - departments query (`useQuery`, staleTime `15m`)
  - groups query by selected department (`enabled` guard, staleTime `15m`)
- Refactor `[src/views/welcome-page/welcome-page-view.tsx](src/views/welcome-page/welcome-page-view.tsx)`, `[src/views/welcome-page/components/welcome-form.tsx](src/views/welcome-page/components/welcome-form.tsx)`, `[src/views/welcome-page/hooks/use-welcome-form.ts](src/views/welcome-page/hooks/use-welcome-form.ts)` to consume async query data and reset groups safely on dept change.

## Phase 4 — Error/loading UX

- Add explicit query error handling (retry action + message) in welcome form flow; no silent fail.
- Upgrade `[src/views/welcome-page/components/welcome-form-skeleton.tsx](src/views/welcome-page/components/welcome-form-skeleton.tsx)` to mirror final form structure closely (label/select/group rows + submit area).
- Ensure loading/error states still keep settings + CTA visible.

## Phase 5 — Validation + checks

- Keep “first profile if possible” fallback precedence: URL `departmentName` -> `preferences.profiles[0].departmentName` -> empty.
- Verify form schema still valid with async groups/departments in `[src/schema/welcome-form-schema.ts](src/schema/welcome-form-schema.ts)`; adjust null/empty guards if needed.
- Run lint/types for touched files, then smoke test: initial load, deep-link `?departmentName=...`, dept switch, groups load, query errors.

Ref doc for adapter/parsers: [nuqs app-router adapter](https://nuqs.dev/docs/adapters#nextjs-app-router).