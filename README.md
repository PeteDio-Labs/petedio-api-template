# api template

A Bun and TypeScript service skeleton with CI, built to sit behind Cloudflare Access. It has:

- **Fail-closed config** (`src/config.ts`). A blank `ACCESS_TEAM_DOMAIN` or `ACCESS_AUD`, or a bad `PORT`, stops startup with exit code 2.
- **Access JWT verification** (`src/auth.ts`, copied from petedio-usaa). It checks signature, algorithm, expiry, issuer and audience. It never reads a plain identity header.
- **A `/health` route** with one flag per dependency, and a 503 when any is down. Pass `checks` to `createApp`.
- **Tests** for each guard, ESLint, `tsc --noEmit`, and a `ci` workflow that lints, type checks, tests, compiles and
  smoke-tests that the binary refuses to start without its config.

The frontend pair is the `spa` template.

## Use the template

1. Copy the contents of `templates/api/` (the extracted repo is `petedio-api-template`), including dotfiles such as `.github/` and
   `.gitignore`, to the root of a separate new repo. Marking `petedio-workspace` itself as a
   GitHub template does not work: a generated repo keeps the `templates/api/` nesting,
   so it has no root `package.json` and no active CI. Optionally mark the extracted repo
   as a template for later apps.
2. Replace `petedio-api-template` in `package.json`, `.github/workflows/ci.yml` (the build and smoke-test steps) and `build:binary`.
3. Requires Bun 1.4.4 or later. Run `bun install` and commit `bun.lock`. CI installs with `--frozen-lockfile` and
   fails without it.
4. Run `bun run lint && bun run typecheck && bun test`.
5. Protect `main` and require the `check` job.

Deploy is not part of the template. Add it when the app has a host, modeled on pete-bot's
`deploy.yml`.
