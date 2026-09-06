import type { APIRoute } from 'astro';

export const prerender = false;

interface N8nSource {
  title: string;
  url: string;
}

interface N8nResponseBody {
  answer?: string;
  sources?: N8nSource[];
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let question = '';
  try {
    const body = await request.json();
    question = typeof body?.question === 'string' ? body.question.trim() : '';
  } catch {
    return jsonResponse({ error: 'Ungültige Anfrage.' }, 400);
  }

  if (!question) {
    return jsonResponse({ error: 'Bitte eine Frage eingeben.' }, 400);
  }

  const n8nApiUrl = import.meta.env.N8N_API_URL;
  const n8nApiKey = import.meta.env.N8N_API_KEY;

  if (!n8nApiUrl) {
    return jsonResponse(
      { error: 'N8N_API_URL ist nicht konfiguriert (.env prüfen).' },
      500,
    );
  }

  // n8n-Workflow "Wissens-Dashboard - Suche" (Webhook-Node, Pfad "search"),
  // gibt { answer: string, sources: [{ title, url }] } zurück.
  const webhookUrl = `${n8nApiUrl.replace(/\/+$/, '')}/webhook/search`;

  let n8nResponse: Response;
  try {
    n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(n8nApiKey ? { Authorization: `Bearer ${n8nApiKey}` } : {}),
      },
      body: JSON.stringify({ question }),
    });
  } catch {
    return jsonResponse(
      { error: 'Der n8n-Webhook ist nicht erreichbar. Bitte später erneut versuchen.' },
      502,
    );
  }

  if (!n8nResponse.ok) {
    return jsonResponse(
      { error: `n8n hat mit Status ${n8nResponse.status} geantwortet.` },
      502,
    );
  }

  let data: N8nResponseBody;
  try {
    data = await n8nResponse.json();
  } catch {
    return jsonResponse({ error: 'n8n hat eine ungültige Antwort geliefert.' }, 502);
  }

  const answer = typeof data.answer === 'string' && data.answer.trim()
    ? data.answer
    : 'Es wurde keine Antwort gefunden.';

  const sources = Array.isArray(data.sources)
    ? data.sources.filter(
        (s): s is N8nSource =>
          !!s && typeof s.title === 'string' && typeof s.url === 'string',
      )
    : [];

  return jsonResponse({ answer, sources }, 200);
};
