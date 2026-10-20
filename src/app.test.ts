import { expect, test } from "bun:test";
import { handle } from "./app";

test("/health answers ok", async () => {
  const res = handle(new Request("http://x/health"));
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ ok: true });
});

test("unknown paths answer 404", () => {
  expect(handle(new Request("http://x/nope")).status).toBe(404);
});
