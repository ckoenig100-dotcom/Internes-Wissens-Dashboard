import type { APIRoute } from 'astro';

export const prerender = false;

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Ungültige Anfrage.' }, 400);
  }

  const { mode, ...payload } = body;

  if (mode !== 'create' && mode !== 'update') {
    return jsonResponse({ error: "mode muss 'create' oder 'update' sein." }, 400);
  }

  const n8nApiUrl = import.meta.env.N8N_API_URL;
  const adminSecret = import.meta.env.ADMIN_WEBHOOK_SECRET;

  if (!n8nApiUrl || !adminSecret) {
    return jsonResponse(
      { error: 'N8N_API_URL oder ADMIN_WEBHOOK_SECRET fehlt in .env.' },
      500,
    );
  }

  const webhookPath = mode === 'create' ? 'admin/upload' : 'admin/update';
  const webhookUrl = `${n8nApiUrl.replace(/\/+$/, '')}/webhook/${webhookPath}`;

  let n8nResponse: Response;
  try {
    n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': adminSecret,
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return jsonResponse({ error: 'Der n8n-Webhook ist nicht erreichbar.' }, 502);
  }

  let data: { success?: boolean; error?: string; slug?: string; category?: string };
  try {
    data = await n8nResponse.json();
  } catch {
    return jsonResponse({ error: 'n8n hat eine ungültige Antwort geliefert.' }, 502);
  }

  if (!data.success) {
    return jsonResponse({ error: data.error || 'Speichern fehlgeschlagen.' }, 400);
  }

  return jsonResponse(data, 200);
};
