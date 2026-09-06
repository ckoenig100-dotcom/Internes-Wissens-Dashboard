export type Category = string;

export interface CategoryInfo {
  slug: string;
  label: string;
}

export interface ParsedFrontmatter {
  data: Record<string, string | string[]>;
  content: string;
}

export function parseFrontmatter(raw: string): ParsedFrontmatter {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw.trim() };

  const [, fmBlock, content] = match;
  const data: Record<string, string | string[]> = {};

  for (const line of fmBlock.split('\n')) {
    const m = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    const key = m[1].trim();
    const value = m[2].trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      data[key] = value.replace(/^["']|["']$/g, '');
    }
  }

  return { data, content: content.trim() };
}
