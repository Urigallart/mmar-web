import { passwordMatches, sessionCookie } from "@/lib/auth";

const attempts = new Map<string, number[]>();

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < 15 * 60 * 1000);
  recent.push(now);
  attempts.set(ip, recent);
  if (recent.length > 8) return Response.json({ success: false }, { status: 429 });

  let password = "";
  try {
    password = String((await request.json()).password ?? "");
  } catch {
    return Response.json({ success: false }, { status: 400 });
  }

  if (!passwordMatches(password)) return Response.json({ success: false }, { status: 401 });

  attempts.delete(ip);
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json", "Set-Cookie": sessionCookie() },
  });
}
