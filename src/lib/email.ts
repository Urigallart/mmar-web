export function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildHtml(title: string, rows: { label: string; value: string }[], replyTo: string) {
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
          <div style="font-size:12px;color:#8a9692;margin-top:20px;">Missatge enviat des de la web. Pots respondre directament a aquest correu.</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
