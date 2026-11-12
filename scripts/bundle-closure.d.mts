export type ManifestRoute = { preloads?: string[]; children?: string[] };
export type RouteManifest = Record<string, ManifestRoute>;
export type Carried = { name: string; marker: string };
export type PageBudget = { ceiling: number; public: boolean };

export function staticImportsOf(source: string): string[];
export function staticClosure(dir: string, entries: readonly string[]): string[];
export function entryChunks(names: readonly string[]): string[];
export const MUST_STAY_LAZY: string[];
export const MUST_NOT_CARRY: string[];
export function carriedViolation(
  closureNames: readonly string[],
  textOf: (name: string) => string,
  markers?: readonly string[],
): Carried | null;
export function mustStayLazyViolation(closureNames: readonly string[]): string | null;
export function readRouteManifest(serverDir: string): Promise<RouteManifest>;
export function routePreloads(routes: RouteManifest, routeId: string): string[];
export const PUBLIC_MUST_STAY_LAZY: string[];
export function firstLazyViolation(
  closureNames: readonly string[],
  prefixes: readonly string[],
): string | null;
export function pageRouteIds(routes: RouteManifest): string[];
export function judgeRouteBudgets(args: {
  routeIds: readonly string[];
  budgets: Record<string, PageBudget>;
  measure: (id: string) => { kib: number; closure: string[] };
  slack: number;
  publicLazy: readonly string[];
  carries?: (closure: string[]) => Carried | null;
}): { rows: Array<{ id: string; kib: number; ceiling: number }>; failures: string[] };
export function chunkBaseName(file: string): string;
export function closureListViolations(
  closureNames: readonly string[],
  listed: Record<string, readonly string[]>,
): string[];
export function parseChunkModules(text: string): Record<string, string[]>;
export function moduleCensus(args: {
  record: Record<string, readonly string[]>;
  listed: readonly string[];
  exists: (path: string) => boolean;
  group?: string;
}): string[];
