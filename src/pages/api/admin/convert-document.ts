import type { APIRoute } from 'astro';
import mammoth from 'mammoth';
import TurndownService from 'turndown';
import { listCategories } from '../../../lib/knowledge';

export const prerender = false;

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function getMaxUploadBytes(): number {
  const configured = Number(import.meta.env.MAX_DOCUMENT_UPLOAD_MB);
  const mb = Number.isFinite(configured) && configured > 0 ? configured : 10;
  return mb * 1024 * 1024;
}

export const POST: APIRoute = async ({ request }) => {
  const maxBytes = getMaxUploadBytes();

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return jsonResponse({ error: 'Ungültige Anfrage (multipart/form-data erwartet).' }, 400);
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return jsonResponse({ error: 'Keine Datei im Feld "file" gefunden.' }, 400);
  }

  if (file.size > maxBytes) {
    const maxMb = (maxBytes / (1024 * 1024)).toFixed(0);
    return jsonResponse(
      { error: `Datei zu groß (${(file.size / (1024 * 1024)).toFixed(1)} MB, max ${maxMb} MB).` },
      400,
    );
  }

  const fileName = file.name || 'dokument';
  const extension = fileName.toLowerCase().split('.').pop();
  const buffer = Buffer.from(await file.arrayBuffer());

  let payload: Record<string, unknown>;

  if (extension === 'docx') {
    let html: string;
    try {
      const result = await mammoth.convertToHtml({ buffer });
      html = result.value;
    } catch {
      return jsonResponse({ error: 'DOCX konnte nicht gelesen werden (Datei beschädigt oder kein gültiges .docx).' }, 422);
    }

    const turndown = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' });
    const markdownDraft = turndown.turndown(html);

    payload = { type: 'docx', filename: fileName, text: markdownDraft };
  } else if (extension === 'pdf') {
    payload = { type: 'pdf', filename: fileName, pdfBase64: buffer.toString('base64') };
  } else {
    return jsonResponse({ error: 'Nur .pdf und .docx werden unterstützt.' }, 400);
  }

  const n8nApiUrl = import.meta.env.N8N_API_URL;
  const adminSecret = import.meta.env.ADMIN_WEBHOOK_SECRET;

  if (!n8nApiUrl || !adminSecret) {
    return jsonResponse({ error: 'N8N_API_URL oder ADMIN_WEBHOOK_SECRET fehlt in .env.' }, 500);
  }

  const webhookUrl = `${n8nApiUrl.replace(/\/+$/, '')}/webhook/admin/convert-document`;

  let n8nResponse: Response;
  try {
    n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': adminSecret,
      },
      body: JSON.stringify({ ...payload, categories: listCategories() }),
    });
  } catch {
    return jsonResponse({ error: 'Der n8n-Webhook ist nicht erreichbar.' }, 502);
  }

  let data: {
    success?: boolean;
    error?: string;
    title?: string;
    category?: string;
    newCategorySuggestion?: string | null;
    tags?: string[];
    markdown?: string;
  };
  try {
    data = await n8nResponse.json();
  } catch {
    return jsonResponse({ error: 'n8n hat eine ungültige Antwort geliefert.' }, 502);
  }

  if (!data.success) {
    return jsonResponse({ error: data.error || 'Umwandlung fehlgeschlagen.' }, 502);
  }

  return jsonResponse(data, 200);
};
