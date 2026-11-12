export const CARD_PAGES: string[];
export const TIER_FLAG_MARKER: string;
export function tierFlagViolations(
  pages: ReadonlyArray<{ id: string; closure: readonly string[] }>,
  textOf: (name: string) => string,
): string[];
export const SHARED_SHELL_MODULES: ReadonlyArray<readonly [path: string, reason: string]>;
export function sharedShellOwns(key: string): boolean;
export const ENTRY_CLOSURE: Record<string, readonly string[]>;
