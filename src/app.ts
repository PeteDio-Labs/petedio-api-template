// Fetch handler kept apart from Bun.serve so a test can call it without a socket.
export function handle(req: Request): Response {
  const { pathname } = new URL(req.url);
  if (pathname === "/health") {
    return Response.json({ ok: true });
  }
  return new Response("not found", { status: 404 });
}
