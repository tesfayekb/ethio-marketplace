import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/** The newest declaration, not an earlier seed, is the feature-list authority. */
export function migrationAiFeatures(): string[] {
  const directory = join(process.cwd(), "supabase/migrations");
  for (const file of readdirSync(directory).filter((name) => name.endsWith(".sql")).sort().reverse()) {
    const source = readFileSync(join(directory, file), "utf8");
    const declarations = [...source.matchAll(/(?:CONSTRAINT\s+ai_features_feature_check\s+CHECK)\s*\(\s*feature\s+IN\s*\(([^)]+)\)/gi)];
    const declaration = declarations.at(-1);
    const values = declaration?.[1];
    if (values === undefined) continue;
    const features = [...values.matchAll(/'([^']+)'/g)].flatMap((match) => {
      const feature = match[1];
      return feature === undefined ? [] : [feature];
    });
    if (features.length === 0) throw new Error(`Empty AI feature declaration: ${file}`);
    return features.sort();
  }
  throw new Error("Missing ai_features_feature_check declaration");
}