import { createHmac, timingSafeEqual } from "node:crypto";

export const COOKIE_NAME = "mmar_panel";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const sign = (payload: string) =>
  createHmac("sha256", process.env.ADMIN_SESSION_SECRET ?? "").update(payload).digest("hex");

const safeEqual = (a: string, b: string) => {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
};

export function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && safeEqual(input, expected as string);
}

export function sessionCookie() {
  const exp = String(Date.now() + MAX_AGE_SECONDS * 1000);
  const value = `${exp}.${sign(exp)}`;
  return `${COOKIE_NAME}=${value}; Path=/; Max-Age=${MAX_AGE_SECONDS}; HttpOnly; Secure; SameSite=Strict`;
}

export function clearCookie() {
  return `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`;
}

export function isAuthed(request: Request) {
  if (!process.env.ADMIN_SESSION_SECRET || !process.env.ADMIN_PASSWORD) return false;
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.split(";").map((c) => c.trim()).find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!match) return false;
  const [exp, sig] = match.slice(COOKIE_NAME.length + 1).split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, sign(exp));
}
