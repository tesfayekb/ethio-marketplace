import { ownValue } from "@/lib/own-key";

export type LegalFacts = Record<string, string | number | null | undefined>;
export type LegalInline =
  | { type: "text" | "code" | "unknown"; text: string }
  | { type: "bold"; children: LegalInline[] }
  | { type: "link"; href: string; children: LegalInline[] };
export type LegalBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string; id?: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

const tokenPattern = /\{\{([a-z_]+)\}\}/g;
export function unknownTokens(text: string, facts: LegalFacts): string[] {
  return [...new Set([...text.matchAll(tokenPattern)].map((m) => m[1] ?? ""))].filter(
    (name) => ownValue(facts, name) === undefined,
  );
}
export function legalInline(text: string, facts: LegalFacts = {}): LegalInline[] {
  const parts: LegalInline[] = [];
  const pattern =
    /\{\{([a-z_]+)\}\}|\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^\s)]+)\)|https:\/\/[^\s<>]+|[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+/g;
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > cursor) parts.push({ type: "text", text: text.slice(cursor, index) });
    const [raw, name, bold, code, label, href] = match;
    if (name) {
      const fact = ownValue(facts, name);
      parts.push(
        fact === undefined
          ? { type: "unknown", text: raw }
          : {
              type: "text",
              text: String(fact ?? "")
                .split(/\r?\n/)
                .join(", "),
            },
      );
    } else if (bold) parts.push({ type: "bold", children: legalInline(bold, facts) });
    else if (code !== undefined) parts.push({ type: "code", text: code });
    else if (href !== undefined && label !== undefined) {
      if (/^(https?:\/\/|mailto:|\/(?!\/))/.test(href)) {
        parts.push({ type: "link", href, children: legalInline(label, facts) });
      } else parts.push({ type: "text", text: raw });
    } else {
      const url = raw.startsWith("https://") ? raw.replace(/[.,;!?]+$/, "") : raw;
      parts.push({
        type: "link",
        href: url.startsWith("https://") ? url : `mailto:${url}`,
        children: [{ type: "text", text: url }],
      });
      if (url.length < raw.length) parts.push({ type: "text", text: raw.slice(url.length) });
    }
    cursor = index + raw.length;
  }
  if (cursor < text.length) parts.push({ type: "text", text: text.slice(cursor) });
  return parts;
}

const cells = (line: string) =>
  line
    .trim()
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());
const tableRow = (line: string) => /^\s*\|.*\|\s*$/.test(line);
const tableSeparator = (line: string) =>
  tableRow(line) && cells(line).every((cell) => /^-+$/.test(cell));
const item = (line: string) => /^(- |\d+\. )(.*)$/.exec(line);
const heading = (line: string) => /^(#{1,3}) (.+)$/.exec(line);
export function parseLegal(text: string): LegalBlock[] {
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  const blocks: LegalBlock[] = [];
  let index = 0;
  let section = 0;
  while (index < lines.length) {
    const line = lines[index] ?? "";
    if (!line.trim()) {
      index++;
      continue;
    }
    const title = heading(line);
    if (title) {
      const level = (title[1]?.length ?? 1) as 1 | 2 | 3;
      blocks.push({
        type: "heading",
        level,
        text: title[2] ?? "",
        ...(level === 2 ? { id: `s-${++section}` } : {}),
      });
      index++;
      continue;
    }
    if (tableRow(line) && tableSeparator(lines[index + 1] ?? "")) {
      const headers = cells(line);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && tableRow(lines[index] ?? ""))
        rows.push(cells(lines[index++] ?? ""));
      blocks.push({ type: "table", headers, rows });
      continue;
    }
    const firstItem = item(line);
    if (firstItem) {
      const ordered = firstItem[1] !== "- ";
      const items: string[] = [];
      while (index < lines.length) {
        const current = item(lines[index] ?? "");
        if (!current || (current[1] !== "- ") !== ordered) break;
        let content = current[2] ?? "";
        index++;
        while (/^ {2,}\S/.test(lines[index] ?? "")) content += ` ${(lines[index++] ?? "").trim()}`;
        items.push(content);
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }
    const paragraph: string[] = [line];
    index++;
    while (index < lines.length) {
      const next = lines[index] ?? "";
      if (
        !next.trim() ||
        heading(next) ||
        item(next) ||
        (tableRow(next) && tableSeparator(lines[index + 1] ?? ""))
      )
        break;
      paragraph.push(next.trim());
      index++;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }
  return blocks;
}
export function legalHeadings(text: string): { id: string; text: string }[] {
  return parseLegal(text).flatMap((block) =>
    block.type === "heading" && block.level === 2 && block.id
      ? [{ id: block.id, text: block.text }]
      : [],
  );
}
