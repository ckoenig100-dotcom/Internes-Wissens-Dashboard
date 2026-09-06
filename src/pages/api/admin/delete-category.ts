import type { APIRoute } from 'astro';

export const prerender = false;

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let body: { slug?: string };
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Ungültige Anfrage.' }, 400);
  }

  if (!body.slug) {
    return jsonResponse({ error: 'slug ist erforderlich.' }, 400);
  }

  const n8nApiUrl = import.meta.env.N8N_API_URL;
  const adminSecret = import.meta.env.ADMIN_WEBHOOK_SECRET;

  if (!n8nApiUrl || !adminSecret) {
    return jsonResponse(
      { error: 'N8N_API_URL oder ADMIN_WEBHOOK_SECRET fehlt in .env.' },
      500,
    );
  }

  const webhookUrl = `${n8nApiUrl.replace(/\/+$/, '')}/webhook/admin/delete-category`;

  let n8nResponse: Response;
  try {
    n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': adminSecret,
      },
      body: JSON.stringify({ slug: body.slug }),
    });
  } catch {
    return jsonResponse({ error: 'Der n8n-Webhook ist nicht erreichbar.' }, 502);
  }

  let data: { success?: boolean; error?: string; slug?: string };
  try {
    data = await n8nResponse.json();
  } catch {
    return jsonResponse({ error: 'n8n hat eine ungültige Antwort geliefert.' }, 502);
  }

  if (!data.success) {
    return jsonResponse({ error: data.error || 'Löschen der Kategorie fehlgeschlagen.' }, 400);
  }

  return jsonResponse(data, 200);
};
