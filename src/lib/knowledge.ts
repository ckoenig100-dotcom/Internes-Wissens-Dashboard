import fs from 'node:fs';
import path from 'node:path';
import { parseFrontmatter, type Category, type CategoryInfo } from './frontmatter';

export type { Category, CategoryInfo } from './frontmatter';

const KNOWLEDGE_DIR = path.join(process.cwd(), 'knowledge');
const CATEGORIES_FILE = path.join(KNOWLEDGE_DIR, 'categories.json');

export interface KnowledgeDoc {
  slug: string;
  category: Category;
  title: string;
  tags: string[];
  author: string;
  updated: string;
  content: string;
  attachmentExtension: string | null;
}

export function listCategories(): CategoryInfo[] {
  try {
    const raw = fs.readFileSync(CATEGORIES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (c): c is CategoryInfo => c && typeof c.slug === 'string' && typeof c.label === 'string',
      );
    }
  } catch {
    // Datei fehlt oder ist ungültig -> keine Kategorien bekannt
  }
  return [];
}

export function isCategory(value: string): boolean {
  return listCategories().some((c) => c.slug === value);
}

export function getCategoryLabel(slug: string): string {
  return listCategories().find((c) => c.slug === slug)?.label || slug;
}

function findAttachmentExtension(dir: string, slug: string): string | null {
  try {
    const match = fs
      .readdirSync(dir)
      .find((f) => f.startsWith(`${slug}.`) && !f.endsWith('.md'));
    return match ? match.slice(slug.length + 1) : null;
  } catch {
    return null;
  }
}

export function listDocuments(): KnowledgeDoc[] {
  const docs: KnowledgeDoc[] = [];

  for (const { slug: category } of listCategories()) {
    const dir = path.join(KNOWLEDGE_DIR, category);
    let entries: string[] = [];
    try {
      entries = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
    } catch {
      continue;
    }

    for (const entry of entries) {
      const filePath = path.join(dir, entry);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = parseFrontmatter(raw);
      const slug = entry.replace(/\.md$/, '');

      docs.push({
        slug,
        category,
        title: (data.title as string) || slug,
        tags: Array.isArray(data.tags) ? data.tags : [],
        author: (data.author as string) || 'Unbekannt',
        updated: (data.updated as string) || '',
        content,
        attachmentExtension: findAttachmentExtension(dir, slug),
      });
    }
  }

  return docs;
}

export function getDocument(category: string, slug: string): KnowledgeDoc | null {
  if (!isCategory(category)) return null;

  const dir = path.join(KNOWLEDGE_DIR, category);
  const filePath = path.join(dir, `${slug}.md`);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = parseFrontmatter(raw);
    return {
      slug,
      category,
      title: (data.title as string) || slug,
      tags: Array.isArray(data.tags) ? data.tags : [],
      author: (data.author as string) || 'Unbekannt',
      updated: (data.updated as string) || '',
      content,
      attachmentExtension: findAttachmentExtension(dir, slug),
    };
  } catch {
    return null;
  }
}

const ATTACHMENT_MIME_TYPES: Record<string, string> = {
  pdf: 'application/pdf',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  doc: 'application/msword',
};

export interface AttachmentFile {
  buffer: Buffer;
  filename: string;
  mimeType: string;
}

export function readAttachmentFile(category: string, slug: string): AttachmentFile | null {
  if (!isCategory(category)) return null;

  const dir = path.join(KNOWLEDGE_DIR, category);
  let match: string | undefined;
  try {
    match = fs.readdirSync(dir).find((f) => f.startsWith(`${slug}.`) && !f.endsWith('.md'));
  } catch {
    return null;
  }
  if (!match) return null;

  let buffer: Buffer;
  try {
    buffer = fs.readFileSync(path.join(dir, match));
  } catch {
    return null;
  }

  const extension = match.slice(match.lastIndexOf('.') + 1).toLowerCase();
  return { buffer, filename: match, mimeType: ATTACHMENT_MIME_TYPES[extension] || 'application/octet-stream' };
}

export function findDocumentBySlug(slug: string): KnowledgeDoc | null {
  for (const { slug: category } of listCategories()) {
    const doc = getDocument(category, slug);
    if (doc) return doc;
  }
  return null;
}

export function countByCategory(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const { slug: category } of listCategories()) {
    const dir = path.join(KNOWLEDGE_DIR, category);
    try {
      counts[category] = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).length;
    } catch {
      counts[category] = 0;
    }
  }
  return counts;
}
