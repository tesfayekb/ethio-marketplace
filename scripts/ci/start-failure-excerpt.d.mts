export const CAUSE_LINES: number;
export const ECHO_LINES: number;
export const TAIL_LINES: number;
export const RECORD_LINES: number;
export const STATEMENT_CHARS: number;
export function serverErrorRecord(lines: readonly string[]): string[];
export function serverRecordLines(captureDir?: string | null): string[];
export function startFailureExcerpt(
  text: string,
  captureDir?: string | null,
): { section: string[]; failure: string[]; server: string[] };
