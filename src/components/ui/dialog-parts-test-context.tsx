import type { ReactNode } from "react";

import { EMPTY_ENTITY_BUNDLE } from "@/i18n/entity";
import { I18nContext } from "@/i18n/i18n-context";
import type { I18nValue } from "@/i18n/provider";

/** The real anatomy is preloaded by the component harness before per-suite mocks. */
const words: I18nValue = {
  language: "en",
  t: (key) => key,
  has: () => true,
  entities: EMPTY_ENTITY_BUNDLE,
  publicLanguages: [],
  star: null,
  setStar: () => {},
  layerStates: { admin: "ready", member: "ready", guide: "ready" },
  requestStringsLayer: () => {},
};

export function PanelTestContext({ children }: { children: ReactNode }) {
  return <I18nContext.Provider value={words}>{children}</I18nContext.Provider>;
}
