import { useCallback } from "react";

import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";

/**
 * C3-UX-2 PART B — THE ONE ATTRIBUTE LABEL RESOLVER.
 *
 * Attribute labels follow the same overlay law as category and location names
 * (law D3, src/i18n/entity.ts): approved `entity_translations` value for the
 * active language ▸ the compiled/EN label. Every surface that renders an
 * attribute label — library, link manager, card picker, category editor — calls
 * THIS hook (law B2), never `nameEn` directly.
 *
 * Option VALUES stay English for now; they are C3-UX-3.
 */
export function useAttributeLabel(): (id: string, nameEn: string) => string {
  const { entities } = useI18n();
  return useCallback(
    (id: string, nameEn: string) => entityName("attribute", { id, nameEn }, entities),
    [entities],
  );
}
