import ca from "../../../../messages/ca.json";

const TO = process.env.CONTACT_TO ?? "mmarserracanta@gmail.com";
const FROM = process.env.RESEND_FROM ?? "Mª del Mar — Web <onboarding@resend.dev>";

type Variant = "coaching" | "psicopedagogia";

const FIELDS: Record<Variant, { name: string; label: string; required?: boolean; other?: boolean }[]> = {
  coaching: [
    { name: "full_name", label: ca.coaching.form.nameLabel, required: true },
    { name: "focus", label: ca.coaching.form.focusLabel, other: true },
    { name: "motivation", label: ca.coaching.form.motivationLabel },
    { name: "goal", label: ca.coaching.form.goalLabel },
    { name: "context", label: ca.coaching.form.contextLabel },
    { name: "email", label: ca.coaching.form.emailLabel, required: true },
  ],
  psicopedagogia: [
    { name: "guardian_name", label: ca.psicopedagogia.form.guardianLabel, required: true },
    { name: "child_name_age", label: ca.psicopedagogia.form.childLabel, required: true },
    { name: "school_year", label: ca.psicopedagogia.form.schoolYearLabel },
    { name: "areas", label: ca.psicopedagogia.form.areasLabel, other: true },
    { name: "concern", label: ca.psicopedagogia.form.concernLabel },
    { name: "prior_support", label: ca.psicopedagogia.form.priorSupportLabel },
    { name: "email", label: ca.psicopedagogia.form.emailLabel, required: true },
  ],
};

const TITLES: Record<Variant, string> = {
  coaching: "Nova consulta de Coaching",
  psicopedagogia: "Nova consulta de Psicopedagogia",
};

const MAX_LEN = 4000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clean(value: unknown): string {
  if (Array.isArray(value)) return value.map(clean).filter(Boolean).join(", ");
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").trim().slice(0, MAX_LEN);
}

function buildHtml(title: string, rows: { label: string; value: string }[], replyTo: string) {
  const body = rows
    .map(
      (r) => `
      <tr><td style="padding:0 0 18px 0;">
        <div style="font-size:12px;letter-spacing:.04em;color:#6b7a75;margin:0 0 4px 0;">${esc(r.label)}</div>
        <div style="font-size:16px;line-height:1.5;color:#1a2e29;white-space:pre-wrap;">${r.value ? esc(r.value) : "—"}</div>
      </td></tr>`
    )
    .join("");

  return `<!doctype html>
<html lang="ca"><body style="margin:0;padding:0;background:#f4f4f2;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f2;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;">
        <tr><td style="background:#4d8275;border-radius:20px 20px 0 0;padding:28px 32px;">
          <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#d9e7e2;">Mª del Mar · Psicopedagoga i coach</div>
          <div style="font-size:24px;font-weight:600;color:#ffffff;margin-top:8px;">${esc(title)}</div>
        </td></tr>
        <tr><td style="background:#ffffff;padding:32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${body}</table>
        </td></tr>
        <tr><td style="background:#ffffff;border-radius:0 0 20px 20px;padding:0 32px 32px 32px;">
          <a href="mailto:${esc(replyTo)}" style="display:inline-block;background:#1a2e29;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:13px 24px;border-radius:999px;">Respondre a ${esc(replyTo)}</a>
          <div style="font-size:12px;color:#8a9692;margin-top:20px;">Missatge enviat des del formulari de contacte de la web. Pots respondre directament a aquest correu.</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return Response.json({ success: false }, { status: 500 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return Response.json({ success: false }, { status: 429 });

  let body: { variant?: string; data?: Record<string, unknown>; website?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false }, { status: 400 });
  }

  if (body.website) return Response.json({ success: true });

  const variant = body.variant as Variant;
  if (variant !== "coaching" && variant !== "psicopedagogia") {
    return Response.json({ success: false }, { status: 400 });
  }
  const data = body.data ?? {};

  const rows: { label: string; value: string }[] = [];
  for (const field of FIELDS[variant]) {
    let value = clean(data[field.name]);
    if (field.other) {
      const other = clean(data[`${field.name}_other`]);
      if (other) value = value ? `${value}, ${other}` : other;
    }
    if (field.required && !value) return Response.json({ success: false }, { status: 400 });
    rows.push({ label: field.label, value });
  }

  const email = rows[rows.length - 1].value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ success: false }, { status: 400 });
  }

  const who = rows[0].value.replace(/[\r\n]+/g, " ").slice(0, 80);
  const title = TITLES[variant];
  const text = [title, "", ...rows.map((r) => `${r.label}\n${r.value || "—"}\n`)].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `${title} — ${who}`,
      html: buildHtml(title, rows, email),
      text,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return Response.json({ success: false }, { status: 502 });
  }
  return Response.json({ success: true });
}
