# bun-app template

A Bun and TypeScript service skeleton with CI. It has a `/health` route, a test, ESLint,
`tsc --noEmit`, and a `ci` workflow that lints, type checks, tests and compiles.

## Use the template

1. Copy the contents of `templates/bun-app/`, including dotfiles such as `.github/` and
   `.gitignore`, to the root of a separate new repo. Marking `petedio-workspace` itself as a
   GitHub template does not work: a generated repo keeps the `templates/bun-app/` nesting,
   so it has no root `package.json` and no active CI. Optionally mark the extracted repo
   as a template for later apps.
2. Replace `my-app` in `package.json`, `.github/workflows/ci.yml` and `build:binary`.
3. Requires Bun 1.4.2 or later. Run `bun install` and commit `bun.lock`. CI installs with `--frozen-lockfile` and
   fails without it.
4. Run `bun run lint && bun run typecheck && bun test`.
5. Protect `main` and require the `check` job.

Deploy is not part of the template. Add it when the app has a host, modeled on pete-bot's
`deploy.yml`.
