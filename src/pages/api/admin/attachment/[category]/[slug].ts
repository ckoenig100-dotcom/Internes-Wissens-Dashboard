import type { APIRoute } from 'astro';
import { readAttachmentFile } from '../../../../../lib/knowledge';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const { category, slug } = params;
  if (!category || !slug) {
    return new Response('Nicht gefunden.', { status: 404 });
  }

  const file = readAttachmentFile(category, slug);
  if (!file) {
    return new Response('Kein Original-Dokument vorhanden.', { status: 404 });
  }

  return new Response(file.buffer, {
    status: 200,
    headers: {
      'Content-Type': file.mimeType,
      'Content-Disposition': `attachment; filename="${file.filename}"`,
      'Content-Length': String(file.buffer.length),
    },
  });
};
