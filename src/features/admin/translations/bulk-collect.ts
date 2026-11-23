import {
  AI_CHUNK_SIZE,
  entityAfterOf,
  listEntityTranslations,
  listTranslations,
  type AiEntityItem,
  type AiTranslateItem,
  type EntityAfter,
} from "./translations-service";

/**
 * INC-1141 — THE BULK TRANSLATE COLLECTS ITS WORK BY KEY, NEVER BY POSITION.
 *
 * Both collectors read the untranslated rows of one language page by page and
 * ask each next page for "the rows after the last key read", so a row added or
 * removed while the run collects is neither skipped nor read twice (an offset
 * moves with the list). A page shorter than the chunk is the last one. A page
 * that fails stops the collection with its own failure; the caller reports it.
 */

/** The untranslated strings of `lang` (those matching `search`), as work items. */
export async function collectUi(lang: string, search: string): Promise<AiTranslateItem[]> {
  const items: AiTranslateItem[] = [];
  let after: string | undefined;
  for (;;) {
    const page = await listTranslations({
      lang,
      status: "untranslated",
      search,
      limit: AI_CHUNK_SIZE,
      offset: 0,
      ...(after === undefined ? {} : { after }),
    });
    for (const row of page.rows) {
      if (row.sourceValue !== null && row.sourceValue !== "") {
        items.push({ key: row.key, source: row.sourceValue });
      }
    }
    const last = page.rows[page.rows.length - 1];
    if (last === undefined || page.rows.length < AI_CHUNK_SIZE) break;
    after = last.key;
  }
  return items;
}

/** The untranslated content names of `lang` (those matching `search`), as work items. */
export async function collectEntities(lang: string, search: string): Promise<AiEntityItem[]> {
  const items: AiEntityItem[] = [];
  let after: EntityAfter | undefined;
  for (;;) {
    const page = await listEntityTranslations({
      lang,
      status: "untranslated",
      search,
      limit: AI_CHUNK_SIZE,
      offset: 0,
      ...(after === undefined ? {} : { after }),
    });
    for (const row of page.rows) {
      if (row.sourceValue !== null && row.sourceValue !== "") {
        items.push({
          key: `${row.entityType}:${row.entityId}`,
          source: row.sourceValue,
          type: row.entityType,
          id: row.entityId,
          field: row.field,
        });
      }
    }
    const last = page.rows[page.rows.length - 1];
    if (last === undefined || page.rows.length < AI_CHUNK_SIZE) break;
    after = entityAfterOf(last);
  }
  return items;
}
