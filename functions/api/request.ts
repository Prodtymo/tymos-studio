// Cloudflare Pages Function — POST /api/request
//
// Relays a Mixing/Mastering intake form submission to Telegram via the Bot
// API, so a new request shows up as an instant push notification. The bot
// token and chat id are read from Cloudflare Pages environment variables
// (Settings > Environment variables, set as "Secret" — never committed to
// the repo, never shipped in the public JS bundle).
//
// Required env vars:
//   TELEGRAM_BOT_TOKEN — from @BotFather
//   TELEGRAM_CHAT_ID   — the chat id that should receive the notification

interface Env {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
}

interface RequestPayload {
  service?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  trackTitle?: unknown;
  fileLink?: unknown;
  notes?: unknown;
  website?: unknown; // honeypot — real visitors never fill this in
}

const MAX_LENGTHS = {
  name: 200,
  email: 200,
  phone: 40,
  trackTitle: 200,
  fileLink: 500,
  notes: 2000,
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export const onRequestPost = async (context: { request: Request; env: Env }): Promise<Response> => {
  const { request, env } = context;

  let body: RequestPayload;
  try {
    body = (await request.json()) as RequestPayload;
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Honeypot: bots fill every field, real visitors never see or fill this
  // one. Pretend success so we don't tip off scrapers that they were caught.
  if (asTrimmedString(body.website) !== "") {
    return json({ ok: true });
  }

  const service = body.service === "mastering" ? "mastering" : body.service === "mixing" ? "mixing" : null;
  const name = asTrimmedString(body.name);
  const email = asTrimmedString(body.email);
  const phone = asTrimmedString(body.phone);
  const trackTitle = asTrimmedString(body.trackTitle);
  const fileLink = asTrimmedString(body.fileLink);
  const notes = asTrimmedString(body.notes);

  if (!service || !name || !email || !fileLink) {
    return json({ ok: false, error: "missing_fields" }, 400);
  }
  if (
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    phone.length > MAX_LENGTHS.phone ||
    trackTitle.length > MAX_LENGTHS.trackTitle ||
    fileLink.length > MAX_LENGTHS.fileLink ||
    notes.length > MAX_LENGTHS.notes
  ) {
    return json({ ok: false, error: "field_too_long" }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "invalid_email" }, 400);
  }

  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return json({ ok: false, error: "not_configured" }, 500);
  }

  const serviceLabel = service === "mixing" ? "Mixing" : "Mastering";
  const lines = [
    `🎧 New ${serviceLabel} request`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    trackTitle ? `Track: ${trackTitle}` : null,
    `Files: ${fileLink}`,
    notes ? `Notes: ${notes}` : null,
  ].filter((line): line is string => line !== null);

  const telegramRes = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text: lines.join("\n"),
      disable_web_page_preview: true,
    }),
  });

  if (!telegramRes.ok) {
    // Surface Telegram's own error description (e.g. "chat not found",
    // "Unauthorized") to make misconfiguration easy to diagnose — this is
    // Telegram's rejection reason, never the token or chat id themselves.
    const telegramError = await telegramRes.text().catch(() => "");
    return json({ ok: false, error: "telegram_failed", detail: telegramError }, 502);
  }

  return json({ ok: true });
};
