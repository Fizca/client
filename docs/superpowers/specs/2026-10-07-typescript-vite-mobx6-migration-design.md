# Fennec Client: TypeScript + Vite + MobX 6 Migration

Date: 2026-10-07
Status: Approved for planning

## Goal

Migrate the Fennec client SPA from JavaScript to TypeScript so future feature
work has real type safety, with the strongest payoff on the data and API layer
(the `Http` client, the MobX models, and API response shapes). Along the way,
replace the hand-rolled Webpack 4 build with Vite and upgrade MobX 5 to MobX 6.

End state: a strict-mode TypeScript React 17 app, built by Vite, with a
decorator-free MobX 6 state layer, deployed unchanged through the existing
Cloudflare Pages setup.

## Context

The repo is a React 17 SPA (a personal photo/moments gallery). Current stack:

- Build: hand-rolled Webpack 4 + Babel (legacy decorators), Yarn 1.22.
- State: MobX 5 with `@observable`/`@action` decorators, `mobx-react` 6, a
  single global store singleton (`src/models/Store.js`).
- HTTP: axios 0.19, cookie/session auth, central client in `src/services/Http.js`.
- 39 `.js` files under `src/` (components, containers, models, services, hooks).
- Path aliases `@components`, `@containers`, `@models`, `@services`, `@public`.
- Deploy: Cloudflare Pages. `functions/api/[[path]].js` proxies `/api/*` to the
  backend. Env vars `SERVER_URL` and `REACT_APP_GOOGLE_CLIENT_ID` are injected
  by Terraform at build time. Build output lands in `dist/`.
- Node is already pinned to 20.13.1, which is sufficient for a modern Vite. No
  Node upgrade is required.
- No real test coverage (only the CRA scaffold `src/App.test.js`).

## Decisions

These were settled during brainstorming and are not open for re-litigation
during planning:

- Strict TypeScript from the start (`strict: true`), no loose-then-tighten pass.
- MobX is upgraded to 6 as part of this effort (not deferred). This removes
  decorators entirely and makes the later typing work clean.
- The build moves to Vite. Node stays at 20.13.1.
- React stays at 17. No React 18 upgrade.
- Verification bar: strict `tsc --noEmit` passes, `vite build` passes, and the
  app runs with the main flows working. No new test suite in this effort.
- Env variable names injected by Cloudflare/Terraform (`SERVER_URL`,
  `REACT_APP_GOOGLE_CLIENT_ID`) must not change, so the deploy workflow and
  Terraform are untouched.

## Sequencing rationale

The work is three independently shippable bricks, in this order:

1. **MobX 5 to 6** first, while still on the known-good Webpack build. MobX 6
   works in plain JS with no decorators, so this ships before TypeScript. Doing
   it first means that when Vite and TypeScript arrive, there are no legacy
   decorators to configure for or type around.
2. **Webpack to Vite** second. If Vite were introduced while MobX 5 decorators
   were still in the source, Vite would have to transform legacy decorators, the
   exact risk brick 1 removes. With decorators already gone, the Vite config
   stays simple.
3. **JavaScript to TypeScript** last. By now Vite gives first-class TS support
   and the models are decorator-free, so this brick is pure typing with no
   toolchain fighting mixed in. That is what makes a single strict pass safe.

Each brick ends with a working, runnable, buildable app and is its own commit.

## Brick 1: MobX 5 to MobX 6

Still JavaScript, still Webpack. No build-tool changes.

Scope:
- Bump `mobx` 5 to 6 and `mobx-react` 6 to 7 (v7 supports MobX 6 and React 17;
  v9 requires React 18, which is out of scope).
- Convert the three models from decorator syntax to `makeObservable` (or
  `makeAutoObservable`) called in the constructor:
  - `src/models/Store.js`
  - `src/models/User.js`
  - `src/models/Profile.js`
- Remove `@babel/plugin-proposal-decorators` from `babel.config.js` and
  `package.json` once no `@` decorators remain in the source.
- `observer()` usage in components is unchanged.

Out of scope: any file that is not a model, any build or type change.

Acceptance criteria:
- No `@observable`, `@action`, or other decorators remain in `src/`.
- `yarn build` succeeds on the existing Webpack config.
- Dev server runs and observable state still drives the UI: login state,
  the moments feed, and gallery render and update as before.

## Brick 2: Webpack to Vite

Still JavaScript. Build tool swap with near-zero source logic change.

Scope:
- Add `vite.config.ts` using `@vitejs/plugin-react`.
- Move `public/index.html` to a root `index.html` that references the entry
  module. Adapt the entry wiring as Vite requires.
- Recreate the five path aliases in `vite.config.ts`.
- Configure esbuild to treat JSX inside `.js` files (`esbuild.loader: 'jsx'`
  plus the matching `optimizeDeps` esbuild option) so the `.js` sources need no
  changes in this brick.
- Preserve the existing env variable names. Use `envPrefix` and/or a `define`
  shim so `process.env.SERVER_URL` and `process.env.REACT_APP_GOOGLE_CLIENT_ID`
  resolve under Vite without renaming them. The Cloudflare deploy workflow and
  Terraform stay untouched.
- Keep build output in `dist/` so `functions/api/[[path]].js` and the Cloudflare
  Pages setup keep working.
- Replace `package.json` scripts (`start`, `build`, `watch`) with Vite
  equivalents. Drop the `--openssl-legacy-provider` hack.
- Remove `webpack.config.js`, `babel.config.js`, `babel-polyfill`, and the
  Webpack/Babel/loader dependencies that Vite replaces.

Out of scope: adding TypeScript, changing component logic, altering the proxy
function or backend.

Risks and mitigations:
- JSX-in-`.js`: handled by the esbuild loader config above.
- Env vars are the highest-risk area because they cross into the deploy. Verify
  that both variables resolve in a local build and that a production-style build
  points the API client at the right base.
- Asset inlining differs from `url-loader` (Vite default limit 4096 vs 8192).
  Confirm images and fonts still load.

Acceptance criteria:
- `vite` dev server runs the app with all main flows working: Google login,
  moments feed with infinite scroll, timeline by tag, single moment view, and
  image upload.
- `vite build` produces a `dist/` that loads correctly behind the Cloudflare
  `/api` proxy, with both env variables resolved.
- `webpack.config.js` and `babel.config.js` are deleted and the removed
  dependencies are gone from `package.json`.

## Brick 3: JavaScript to TypeScript (strict)

Build is already Vite; state is already decorator-free. Pure typing.

Scope:
- Add `tsconfig.json` with `strict: true`, `jsx: "react-jsx"`, `baseUrl`, and
  `paths` matching the Vite aliases. The automatic JSX runtime removes the need
  for the old `ProvidePlugin` React global.
- Rename all 39 `.js` files: `.tsx` for files containing JSX
  (components/containers), `.ts` for models, services, and hooks.
- Add `@types/*` for React 17, `react-router-dom` 5, `styled-components`,
  `js-cookie`, `react-select`, and any other untyped dependency.
- Type the data and API layer, which is the core goal:
  - A typed axios instance and a typed `uploadAsset` in `src/services/Http.js`.
  - Response interfaces for users, profiles, moments, tags, and assets.
  - Typed MobX 6 models (`Store`, `User`, `Profile`).
- Fix all strict-mode type errors across the source.
- Remove `react-scripts` and the stale `jsconfig.json`.
- Add a `typecheck` script (`tsc --noEmit`).

Out of scope: feature changes, React 18, a test suite, refactoring beyond what
strict typing forces.

Acceptance criteria:
- No `.js`/`.jsx` files remain under `src/` (except intentional config).
- `tsc --noEmit` passes with `strict: true` and reports zero errors.
- `vite build` passes and the app runs with all main flows working.

## Non-goals

- No React 18 upgrade.
- No new or expanded test suite.
- No feature changes or UI redesign.
- No changes to the backend, the Cloudflare proxy logic, Terraform, or the
  deploy workflow.
- No refactoring beyond what each brick strictly requires.

## Verification summary

| Brick | Build | Checks |
|-------|-------|--------|
| 1 MobX 6 | Webpack | Build passes; observables drive UI; no decorators left |
| 2 Vite | Vite | Dev run + `vite build`; `dist/` works via proxy; env vars resolve |
| 3 TypeScript | Vite + TS | `tsc --noEmit` strict passes; build passes; app runs |

Main flows to exercise on each runtime check: Google login, moments feed with
infinite scroll, timeline by tag, single moment view, image upload.
