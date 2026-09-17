import { useEffect, useState } from "react";

import {
  childrenOf,
  isPostable,
  pathOf,
  rootsOf,
  searchLeaves,
  type CategoryNode,
  type CategoryTree,
} from "@/features/categories/category-tree";
import { entityName } from "@/i18n/entity";
import { useI18n } from "@/i18n";

import { readPostingSchema } from "./posting-service";
import { fill } from "./refusal-text";

/**
 * U6-C1a — STEP 1: THE CATEGORY, REACHED BY SEARCH OR BY BROWSING (D11).
 *
 * The category is the most consequential answer in the whole wizard: it decides
 * which details exist, which price laws apply, and how buyers will ever find the
 * listing. So it is asked FIRST and it is asked in two ways at once, because the
 * two halves of the audience differ:
 *
 *  - SEARCH is for the seller who knows the word ("phone", "ስልክ"). It matches the
 *    active language's entity name AND the English one, and it only ever answers
 *    with POSTABLE LEAVES — never a folder the door would refuse.
 *  - BROWSING is for the seller who does not know the word, or whose keyboard is
 *    not the catalogue's language. Folders are shown and drilled into; they are
 *    visibly not selectable, which is the D11 law rendered rather than explained.
 *
 * Once a leaf is chosen the step says WHAT WILL BE ASKED (the schema's detail
 * count) and shows the category illustration, so the seller can judge the
 * choice before committing effort to it.
 */

const searchFieldClass =
  "min-h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground " +
  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const rowClass =
  "flex min-h-11 w-full items-center gap-2 rounded-md border border-border px-3 py-2 text-start " +
  "text-sm text-foreground hover:bg-accent disabled:opacity-60";

export function StepCategory({
  tree,
  isLoading,
  treeError,
  chosenId,
  onChoose,
}: {
  tree: CategoryTree;
  isLoading: boolean;
  treeError: boolean;
  chosenId: string | null;
  onChoose: (categoryId: string) => void;
}) {
  const { t, entities } = useI18n();
  const [term, setTerm] = useState("");
  /** Where the browser stands: `null` is the root level. */
  const [cursor, setCursor] = useState<string | null>(null);
  const [expect, setExpect] = useState<{ details: number; required: number } | null>(null);

  const chosen = chosenId === null ? null : (tree.byId.get(chosenId) ?? null);

  /** D11 — what this category will ask for, read before the seller invests time. */
  useEffect(() => {
    if (chosenId === null) {
      setExpect(null);
      return;
    }
    let cancelled = false;
    void readPostingSchema(chosenId).then((schema) => {
      if (cancelled) return;
      setExpect(schema === null ? null : { details: schema.details, required: schema.required });
    });
    return () => {
      cancelled = true;
    };
  }, [chosenId]);

  const label = (node: CategoryNode) => entityName("category", node, entities);
  const hits = searchLeaves(tree, term, entities);
  const level = cursor === null ? rootsOf(tree) : childrenOf(tree, cursor);
  const trail = cursor === null ? [] : pathOf(tree, cursor);

  if (treeError) {
    return (
      <p data-testid="post-category-error" className="text-sm text-destructive">
        {t("post.category.treeError")}
      </p>
    );
  }

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">{t("post.loading")}</p>;
  }

  if (tree.nodes.length === 0) {
    return <p className="text-sm text-muted-foreground">{t("post.category.empty")}</p>;
  }

  if (chosen !== null) {
    return (
      <div className="space-y-4" data-testid="post-category-chosen">
        <p className="text-sm text-muted-foreground">{t("post.category.why")}</p>
        {chosen.imageUrl !== null && (
          <img
            src={chosen.imageUrl}
            alt={t("post.category.illustrationAlt")}
            width={320}
            height={240}
            loading="lazy"
            className="h-32 w-full rounded-md object-cover"
          />
        )}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">{t("post.category.chosen")}</p>
          <p className="text-sm font-medium text-foreground" data-testid="post-category-name">
            {pathOf(tree, chosen.id)
              .map((node) => label(node))
              .join(" › ")}
          </p>
          <p className="text-xs text-muted-foreground" data-testid="post-category-expect">
            {expect === null || expect.details === 0
              ? t("post.category.expectNone")
              : fill(t("post.category.expect"), {
                  details: expect.details,
                  required: expect.required,
                })}
          </p>
        </div>
        <button
          type="button"
          data-testid="post-category-change"
          className={rowClass}
          onClick={() => {
            setTerm("");
            setCursor(null);
            onChoose("");
          }}
        >
          {t("post.category.change")}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{t("post.category.why")}</p>

      <div className="space-y-1">
        <label htmlFor="post-category-search" className="text-sm font-medium text-foreground">
          {t("post.category.searchLabel")}
        </label>
        <input
          id="post-category-search"
          data-testid="post-category-search"
          className={searchFieldClass}
          value={term}
          autoComplete="off"
          placeholder={t("post.category.searchPlaceholder")}
          onChange={(event) => setTerm(event.target.value)}
        />
        <p className="text-xs text-muted-foreground">{t("post.category.searchHint")}</p>
      </div>

      {term.trim() !== "" && (
        <ul className="space-y-2" data-testid="post-category-hits">
          {hits.length === 0 && (
            <li className="text-sm text-muted-foreground" data-testid="post-category-nohits">
              {t("post.category.noHits")}
            </li>
          )}
          {hits.map((node) => (
            <li key={node.id}>
              <button
                type="button"
                data-testid="post-category-hit"
                data-category={node.id}
                className={`${rowClass} flex-col items-start gap-0`}
                onClick={() => onChoose(node.id)}
              >
                <span className="font-medium">{label(node)}</span>
                {/* The full path, because "Phones" means little without it. */}
                <span className="text-xs text-muted-foreground">
                  {pathOf(tree, node.id)
                    .map((step) => label(step))
                    .join(" › ")}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">{t("post.category.browseLabel")}</p>
        {cursor !== null && (
          <>
            <p className="text-xs text-muted-foreground" data-testid="post-browse-trail">
              {trail.map((node) => label(node)).join(" › ")}
            </p>
            <button
              type="button"
              data-testid="post-browse-up"
              className={rowClass}
              onClick={() => setCursor(tree.parentOf.get(cursor) ?? null)}
            >
              {t("post.category.upOneLevel")}
            </button>
          </>
        )}
        <ul className="space-y-2" data-testid="post-browse-level">
          {level.map((node) => {
            const postable = isPostable(tree, node);
            const folder = childrenOf(tree, node.id).length > 0;
            return (
              <li key={node.id}>
                <button
                  type="button"
                  data-testid={folder ? "post-browse-folder" : "post-browse-leaf"}
                  data-category={node.id}
                  // D11 rendered: a folder drills, a postable leaf is chosen,
                  // and an unpostable leaf is visible but inert.
                  disabled={!folder && !postable}
                  className={rowClass}
                  onClick={() => {
                    if (folder) setCursor(node.id);
                    else onChoose(node.id);
                  }}
                >
                  <span className="grow">{label(node)}</span>
                  {folder && (
                    <span className="text-xs text-muted-foreground">
                      {t("post.category.folder")}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default StepCategory;
