import { handle } from "./app";

const port = Number(process.env.PORT ?? 3000);
if (!Number.isInteger(port) || port <= 0) {
  // Fail closed at startup: a bad PORT must not fall back to a default.
  throw new Error(`PORT must be a positive integer, got "${process.env.PORT}"`);
}

Bun.serve({ port, fetch: handle });
console.log(`listening on :${port}`);
