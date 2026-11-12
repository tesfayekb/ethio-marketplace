export const NEAR_KIB: number;
export const LOCAL_ALLOWANCE_KIB: number;
export function ceilingFor(sizeKib: number): number;
export function ceilingForLocal(sizeKib: number): number;
export function judgedSize(sizeKib: number, ci?: boolean): number;
export function exceedsCeiling(sizeKib: number, ceiling: number, ci?: boolean): boolean;
export function nearFindings(
  rows: ReadonlyArray<{ label: string; kib: number; ceiling: number }>,
  ci?: boolean,
): string[];
