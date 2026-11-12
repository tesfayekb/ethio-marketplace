import type { Plugin } from "vite";

export function moduleKey(id: string, root: string): string;
export function chunkModulesPlugin(options: { file: string; root: string }): Plugin;
