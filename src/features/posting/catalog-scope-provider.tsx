import type { ReactNode } from "react";

import { ScopeContext, type CatalogScope } from "./catalog-scope";

/** Bundle 4 steps 28–29 — the wizard provides the catalogue-token scope here. */
export function CatalogScopeProvider({
  value,
  children,
}: {
  value: CatalogScope;
  children: ReactNode;
}) {
  return <ScopeContext.Provider value={value}>{children}</ScopeContext.Provider>;
}
