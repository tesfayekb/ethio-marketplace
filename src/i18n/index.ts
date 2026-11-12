export { I18nProvider, LANGUAGE_STORAGE_KEY, BASE_LANGUAGE } from "./provider";
export {
  useI18n,
  useStringsLayers,
  LANGUAGE_STAR_STORAGE_KEY,
  LANGUAGE_STAR_COOKIE,
  readDeviceStar,
} from "./i18n-context";
export type { LayerState, PublicLanguage } from "./provider";
export {
  STRINGS_LAYERS,
  isStringsLayer,
  shippedCatalogues,
  type ShippedCatalogues,
  type StringsLayer,
} from "./compiled-catalog";

export { SUPPORTED_LANGUAGES } from "./types";
export { catalogText, entityName, EMPTY_ENTITY_BUNDLE } from "./entity";
export { catalogPieces, catalogWords, drawCatalog } from "./catalog-tokens";
export type { CatalogPiece, CatalogTokens } from "./catalog-tokens";
export type { EntityBundle, EntityType, NamedEntity } from "./entity";
export type { Language, Messages, MessageKey } from "./types";
