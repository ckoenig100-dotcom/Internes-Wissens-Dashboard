function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderInline(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

export function renderMarkdownPreview(markdown: string): string {
  const lines = (markdown || '').split('\n');
  let html = '';
  let inList = false;
  let inCode = false;

  const closeList = () => {
    if (inList) {
      html += '</ul>';
      inList = false;
    }
  };

  for (const raw of lines) {
    if (raw.trim().startsWith('```')) {
      inCode = !inCode;
      html += inCode ? '<pre><code>' : '</code></pre>';
      continue;
    }

    if (inCode) {
      html += escapeHtml(raw) + '\n';
      continue;
    }

    const headingMatch = raw.match(/^(#{1,6})\s+(.*)$/);
    const listMatch = raw.match(/^[-*]\s+(.*)$/);
    const numberedMatch = raw.match(/^\d+\.\s+(.*)$/);

    if (headingMatch) {
      closeList();
      const level = headingMatch[1].length;
      html += `<h${level}>${renderInline(headingMatch[2])}</h${level}>`;
    } else if (listMatch || numberedMatch) {
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      html += `<li>${renderInline((listMatch || numberedMatch)![1])}</li>`;
    } else if (raw.trim() === '') {
      closeList();
    } else {
      closeList();
      html += `<p>${renderInline(raw)}</p>`;
    }
  }

  closeList();
  if (inCode) html += '</code></pre>';

  return html;
}
