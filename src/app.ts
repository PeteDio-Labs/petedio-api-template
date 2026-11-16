import { AuthError, type Verifier } from "./auth";

/** One check per dependency, for example `{ db: () => repo.ping() }`. A check that throws counts as down. */
export type Checks = Record<string, () => Promise<boolean>>;

export interface Deps {
  verifier: Verifier;
  checks?: Checks;
}

// Fetch handler kept apart from Bun.serve so a test can call it without a socket.
export function createApp({ verifier, checks = {} }: Deps) {
  return async function handle(req: Request): Promise<Response> {
    const { pathname } = new URL(req.url);

    // /health is open so the deploy and monitors can probe it. It reports each dependency as its own
    // flag and answers 503 when any is down, so a status-only probe fails too.
    if (pathname === "/health") {
      const flags: Record<string, boolean> = {};
      for (const [name, check] of Object.entries(checks)) {
        flags[name] = await check().catch(() => false);
      }
      const ok = Object.values(flags).every(Boolean);
      return Response.json({ ok, ...flags }, { status: ok ? 200 : 503 });
    }

    // Everything else needs a verified Cloudflare Access JWT.
    try {
      const claims = await verifier.verify(req.headers.get("cf-access-jwt-assertion"));
      if (pathname === "/api/me") return Response.json({ email: claims.email ?? null });
    } catch (e) {
      if (e instanceof AuthError) return Response.json({ error: e.message }, { status: e.status });
      throw e;
    }
    return new Response("not found", { status: 404 });
  };
}
