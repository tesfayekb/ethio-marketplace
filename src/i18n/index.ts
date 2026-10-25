export {
  I18nProvider,
  useI18n,
  useStringsLayers,
  LANGUAGE_STORAGE_KEY,
  LANGUAGE_STAR_STORAGE_KEY,
  LANGUAGE_STAR_COOKIE,
  BASE_LANGUAGE,
  readDeviceStar,
} from "./provider";
export type { LayerState, PublicLanguage } from "./provider";
export { STRINGS_LAYERS, isStringsLayer, type StringsLayer } from "./compiled-catalog";

export { SUPPORTED_LANGUAGES } from "./types";
export { catalogText, entityName, EMPTY_ENTITY_BUNDLE } from "./entity";
export { catalogPieces, catalogWords, drawCatalog } from "./catalog-tokens";
export type { CatalogPiece, CatalogTokens } from "./catalog-tokens";
export type { EntityBundle, EntityType, NamedEntity } from "./entity";
export type { Language, Messages, MessageKey } from "./types";
