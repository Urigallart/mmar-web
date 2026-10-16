import { clearCookie } from "@/lib/auth";

export async function POST() {
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json", "Set-Cookie": clearCookie() },
  });
}
