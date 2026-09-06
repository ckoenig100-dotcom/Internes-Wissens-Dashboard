import fs from 'node:fs';
import path from 'node:path';

const LOG_FILE = path.join(process.cwd(), 'logs', 'questions.jsonl');

export interface LogEntry {
  timestamp: string;
  question: string;
  answered: boolean;
  sourceCount: number;
}

export interface AggregatedQuestion {
  question: string;
  count: number;
  lastAsked: string;
}

export function readQuestionLog(): LogEntry[] {
  let raw = '';
  try {
    raw = fs.readFileSync(LOG_FILE, 'utf-8');
  } catch {
    return [];
  }

  return raw
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      try {
        return JSON.parse(line) as LogEntry;
      } catch {
        return null;
      }
    })
    .filter((entry): entry is LogEntry => entry !== null);
}

export function groupByQuestion(items: LogEntry[]): AggregatedQuestion[] {
  const map = new Map<string, AggregatedQuestion>();
  for (const item of items) {
    const key = item.question.trim().toLowerCase();
    if (!key) continue;
    const existing = map.get(key);
    if (existing) {
      existing.count += 1;
      if (item.timestamp > existing.lastAsked) existing.lastAsked = item.timestamp;
    } else {
      map.set(key, { question: item.question, count: 1, lastAsked: item.timestamp });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

export function getTopQuestions(limit: number): AggregatedQuestion[] {
  return groupByQuestion(readQuestionLog()).slice(0, limit);
}

export function getUnansweredQuestions(limit: number): AggregatedQuestion[] {
  const entries = readQuestionLog().filter((e) => !e.answered);
  return groupByQuestion(entries).slice(0, limit);
}
