/**
 * DEC-362 (housekeeping turn 1b) — WHICH MODULES EACH CLIENT CHUNK HOLDS, written by the
 * build for the budget step's module census (scripts/bundle-closure.mjs `moduleCensus`).
 * Nothing is shipped: the record is written beside the client output (`dist/`, never
 * under `dist/client/`, which nitro serves), so no visitor can download it.
 *
 * `moduleKey` is the one spelling of a module's identity: a path relative to the project
 * for our own files, `node_modules/<package>/<file>` for a dependency (the resolved folder
 * above the last node_modules is dropped), vite's virtual helpers as a vite package file.
 * vite.config.ts uses the same function for the groups' `test`, so the groups, the record
 * and the lists in scripts/route-budgets.mjs can never name a module two ways.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

/** A module id (absolute path, virtual id, query suffix and all) as the lists name it. */
export function moduleKey(id, root) {
  const clean = id.replace(/^\0/, "").split("?")[0] ?? "";
  const dependency = clean.lastIndexOf("/node_modules/");
  if (dependency >= 0) return `node_modules/${clean.slice(dependency + "/node_modules/".length)}`;
  if (clean.startsWith("vite/")) return `node_modules/${clean}`;
  if (clean.startsWith(`${root}/`)) return clean.slice(root.length + 1);
  return clean;
}

/** The Vite plugin: in the client environment's build, write `{ <chunk file>: [<module key>, …] }`. */
export function chunkModulesPlugin({ file, root }) {
  return {
    name: "ethio:chunk-modules",
    apply: "build",
    applyToEnvironment: (environment) => environment.name === "client",
    generateBundle(_options, bundle) {
      const record = {};
      for (const [name, chunk] of Object.entries(bundle)) {
        if (chunk.type !== "chunk") continue;
        record[name.split("/").pop() ?? name] = Object.keys(chunk.modules)
          .map((id) => moduleKey(id, root))
          .sort();
      }
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, JSON.stringify(record));
    },
  };
}
