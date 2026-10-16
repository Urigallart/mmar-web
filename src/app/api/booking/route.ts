import { buildHtml } from "@/lib/email";
import { formatDay, isSlotValid, wallToUtc } from "@/lib/booking";

const TO = process.env.CONTACT_TO ?? "mmarserracanta@gmail.com";
const FROM = process.env.RESEND_FROM ?? "Mª del Mar — Web <onboarding@resend.dev>";

const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\r\n/g, "\n").trim().slice(0, max) : "";

const icsStamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const icsEscape = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return Response.json({ success: false }, { status: 500 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return Response.json({ success: false }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false }, { status: 400 });
  }

  if (body.website) return Response.json({ success: true });

  const date = clean(body.date, 10);
  const time = clean(body.time, 5);
  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message, 2000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !isSlotValid(date, time)) {
    return Response.json({ success: false }, { status: 400 });
  }

  const when = `${formatDay(date, "ca")} · ${time} (hora de Barcelona)`;
  const start = wallToUtc(date, time);
  const end = new Date(start.getTime() + 15 * 60 * 1000);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//mmar-web//CA",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${crypto.randomUUID()}@mmar-web`,
    `DTSTAMP:${icsStamp(new Date())}`,
    `DTSTART:${icsStamp(start)}`,
    `DTEND:${icsStamp(end)}`,
    `SUMMARY:${icsEscape(`Primera sessió — ${name}`)}`,
    `DESCRIPTION:${icsEscape(`${name} <${email}>${message ? `\n${message}` : ""}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const rows = [
    { label: "Data i hora", value: when },
    { label: "Nom i cognoms", value: name },
    { label: "Correu electrònic", value: email },
    { label: "Missatge", value: message },
  ];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Nova reserva de primera sessió — ${name.replace(/[\r\n]+/g, " ")}`,
      html: buildHtml("Nova reserva de primera sessió", rows, email),
      text: ["Nova reserva de primera sessió", "", ...rows.map((r) => `${r.label}\n${r.value || "—"}\n`)].join("\n"),
      attachments: [{ filename: "reserva.ics", content: Buffer.from(ics).toString("base64"), content_type: "text/calendar" }],
    }),
  });

  if (!res.ok) {
    console.error("Resend booking error", res.status, await res.text());
    return Response.json({ success: false }, { status: 502 });
  }
  return Response.json({ success: true });
}
