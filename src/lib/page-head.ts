import { enBase } from "@/i18n/locales/en-base";
import type { MessageKey } from "@/i18n/types";

/** INC-990: base-first head. Layer fallbacks stay in the route that already carried them. */
export function pageHead(
  titleKey: MessageKey,
  descriptionKey: MessageKey | null,
  nameKey: MessageKey | null = null,
  name: string | null = null,
  titleFallback?: string | null,
  descriptionFallback?: string | null,
) {
  const base = enBase as Partial<Record<MessageKey, string>>;
  const value = name ?? (nameKey ? base[nameKey] : "") ?? "";
  const title =
    (nameKey && base[nameKey] === undefined
      ? titleFallback
      : base[titleKey]?.replace("{name}", value)) ??
    titleFallback ??
    "";
  const description = descriptionKey
    ? base[descriptionKey]?.replace("{name}", value) || descriptionFallback || ""
    : (descriptionFallback ?? "");
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "ethio-head", content: JSON.stringify([titleKey, descriptionKey, nameKey, name]) },
    ],
  };
}
