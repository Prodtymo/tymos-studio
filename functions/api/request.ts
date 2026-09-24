// Cloudflare Pages Function. Credentials remain in Cloudflare environment secrets.
interface Env { TELEGRAM_BOT_TOKEN?: string; TELEGRAM_CHAT_ID?: string }
const LIMITS = { name: 200, email: 200, phone: 40, trackTitle: 200, fileLink: 500, notes: 2000 };
const MAX_BODY_BYTES = 16384;
function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
}
const trim = (value: unknown) => typeof value === "string" ? value.trim() : "";
export async function onRequestPost({ request, env }: { request: Request; env: Env }): Promise<Response> {
  const origin = request.headers.get("Origin");
  if (origin && origin !== new URL(request.url).origin) return json({ ok: false, error: "invalid_origin" }, 403);
  if (!request.headers.get("Content-Type")?.includes("application/json")) return json({ ok: false, error: "invalid_content_type" }, 415);
  // Count actual bytes, including chunked bodies; Content-Length alone is untrusted.
  const reader = request.body?.getReader();
  if (!reader) return json({ ok: false, error: "invalid_json" }, 400);
  let raw = "", size = 0;
  const decoder = new TextDecoder();
  let body: Record<string, unknown>;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) { await reader.cancel(); return json({ ok: false, error: "body_too_large" }, 413); }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return json({ ok: false, error: "invalid_payload" }, 400);
    body = parsed as Record<string, unknown>;
  } catch { return json({ ok: false, error: "invalid_json" }, 400); }
  if (trim(body.website)) return json({ ok: true });
  const service = body.service;
  if (service !== "mixing" && service !== "mastering" && service !== "one-stop") return json({ ok: false, error: "invalid_service" }, 400);
  const fields = Object.fromEntries(Object.keys(LIMITS).map(key => [key, trim(body[key])])) as Record<keyof typeof LIMITS, string>;
  const { name, email, phone, trackTitle, fileLink, notes } = fields;
  if (!name || !email || (service !== "one-stop" && !fileLink)) return json({ ok: false, error: "missing_fields" }, 400);
  for (const key of Object.keys(LIMITS) as (keyof typeof LIMITS)[]) {
    if (fields[key].length > LIMITS[key]) return json({ ok: false, error: "field_too_long" }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ ok: false, error: "invalid_email" }, 400);
  if (fileLink) {
    try {
      const url = new URL(fileLink);
      if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) throw new Error();
    } catch { return json({ ok: false, error: "invalid_file_link" }, 400); }
  }
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return json({ ok: false, error: "not_configured" }, 503);
  const label = service === "one-stop" ? "One-Stop" : service === "mixing" ? "Mixing" : "Mastering";
  const text = [`🎧 New ${label} request`, "", `Name: ${name}`, `Email: ${email}`, phone && `Phone: ${phone}`, trackTitle && `Track: ${trackTitle}`, fileLink && `Files: ${fileLink}`, notes && `Notes: ${notes}`].filter(Boolean).join("\n");
  try {
    const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST", headers: { "Content-Type": "application/json" }, signal: AbortSignal.timeout(10000),
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, disable_web_page_preview: true }),
    });
    const result = await response.json() as { ok?: boolean };
    if (!response.ok || result.ok !== true) return json({ ok: false, error: "delivery_failed" }, 502);
  } catch { return json({ ok: false, error: "delivery_failed" }, 502); }
  return json({ ok: true });
}
