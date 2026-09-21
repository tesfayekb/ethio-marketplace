import { useState } from "react";

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

/**
 * U6-C1-R1 — STEP 1: ONE CONTROL (operator walk 2026-09-18).
 *
 * The step used to ask twice: a search box titled "What are you selling?" and,
 * beneath it, a second heading "Or browse". A seller read that as two questions
 * and answered neither. So there is now ONE control — the tree — with a FILTER
 * above it:
 *
 *  - typing narrows the tree IN PLACE to the postable leaves that match, each
 *    shown with its full path, because "Doors" means nothing on its own;
 *  - empty, the tree stands as it is: groups open (a chevron), leaves choose;
 *  - choosing a LEAF is the answer. It advances at once — no confirmation
 *    screen — and the chosen path rides along as a chip on every later step,
 *    which is where "Change" lives now.
 *
 * D11 is rendered rather than explained: a group drills in, a postable leaf is
 * choosable, an unpostable leaf is visible but inert.
 *
 * U6-C1-R3b-3d STEP 5 — WHERE YOU ARE, AND THE WAY BACK. The level is now named
 * by TAPPABLE CRUMBS (All categories › Vehicles › Cars): a tap goes straight to
 * that level, so nobody climbs a deep tree one row at a time. "Up one level" is
 * retired — the wizard's own Back does that job while there is a level to leave,
 * and the crumbs say what Back will do. The level list scrolls INSIDE the card,
 * so Back and Next stay on screen at every size (the LAYOUT-1 sticky bar).
 */

const rowClass =
  "flex min-h-11 w-full items-center gap-2 rounded-md border border-border px-3 py-2 text-start " +
  "text-sm text-foreground hover:bg-accent disabled:opacity-60";

const crumbClass =
  "min-h-11 rounded-md border border-border px-3 py-1 text-xs text-foreground hover:bg-accent";

export function StepCategory({
  tree,
  isLoading,
  treeError,
  onChoose,
  invalid = false,
  cursor,
  onCursor,
}: {
  tree: CategoryTree;
  isLoading: boolean;
  treeError: boolean;
  onChoose: (categoryId: string) => void;
  /**
   * U6-C1-R3a-2 — true once someone tried to continue with no leaf chosen: the
   * choice group wears the refusal outline until a choice clears it (F4).
   */
  invalid?: boolean;
  /**
   * Where the tree stands: `null` is the root level. The WIZARD holds it, because
   * its Back button leaves a level before it leaves the step.
   */
  cursor: string | null;
  onCursor: (id: string | null) => void;
}) {
  const { t, entities } = useI18n();
  const [term, setTerm] = useState("");

  const label = (node: CategoryNode) => entityName("category", node, entities);
  const filtering = term.trim() !== "";
  const hits = filtering ? searchLeaves(tree, term, entities) : [];
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

  return (
    <div className="space-y-4" data-testid="post-category">
      <p className="text-sm text-muted-foreground">{t("post.category.why")}</p>

      <div className="space-y-1">
        <label htmlFor="post-category-search" className="text-sm font-medium text-foreground">
          {t("post.category.filterLabel")}
        </label>
        <input
          id="post-category-search"
          data-testid="post-category-search"
          className={
            "min-h-11 w-full rounded-md border border-input bg-background px-3 text-base " +
            "text-foreground placeholder:text-muted-foreground focus-visible:outline-none " +
            "focus-visible:ring-2 focus-visible:ring-ring"
          }
          value={term}
          autoComplete="off"
          placeholder={t("post.category.searchPlaceholder")}
          onChange={(event) => setTerm(event.target.value)}
        />
        <p className="text-xs text-muted-foreground">{t("post.category.filterHint")}</p>
      </div>

      {/* THE ONE CONTROL. Filtered, it is the matching leaves with their paths;
          unfiltered, it is the level the seller stands on. */}
      <div
        data-testid="post-category-group"
        data-invalid={invalid ? "1" : "0"}
        className={
          invalid
            ? "rounded-md border border-destructive p-2 ring-1 ring-destructive"
            : "rounded-md border border-transparent p-2"
        }
      >
        {invalid && (
          <p className="pb-2 text-sm text-destructive" data-testid="post-category-refusal">
            {t("post.category.chooseOne")}
          </p>
        )}
        {filtering ? (
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
                  <span className="text-xs text-muted-foreground">
                    {pathOf(tree, node.id)
                      .map((step) => label(step))
                      .join(" › ")}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="space-y-2">
            {/* THE CRUMBS ARE THE NAVIGATION: each one is a level, each one a tap. */}
            <nav
              className="flex flex-wrap items-center gap-1"
              data-testid="post-browse-trail"
              aria-label={t("post.category.trailLabel")}
            >
              <button
                type="button"
                data-testid="post-browse-crumb"
                data-category=""
                className={crumbClass}
                disabled={cursor === null}
                onClick={() => onCursor(null)}
              >
                {t("post.category.allRoots")}
              </button>
              {trail.map((node) => (
                <span key={node.id} className="flex items-center gap-1">
                  <span aria-hidden="true" className="text-xs text-muted-foreground">
                    ›
                  </span>
                  <button
                    type="button"
                    data-testid="post-browse-crumb"
                    data-category={node.id}
                    className={crumbClass}
                    disabled={node.id === cursor}
                    onClick={() => onCursor(node.id)}
                  >
                    {label(node)}
                  </button>
                </span>
              ))}
            </nav>
            {/* The level scrolls inside the card, so Back and Next never leave the
                screen on a 360-pixel phone. */}
            <ul
              className="max-h-[60vh] space-y-2 overflow-y-auto"
              data-testid="post-browse-level"
            >
              {level.map((node) => {
                const postable = isPostable(tree, node);
                const folder = childrenOf(tree, node.id).length > 0;
                return (
                  <li key={node.id}>
                    <button
                      type="button"
                      data-testid={folder ? "post-browse-folder" : "post-browse-leaf"}
                      data-category={node.id}
                      disabled={!folder && !postable}
                      className={rowClass}
                      onClick={() => {
                        if (folder) onCursor(node.id);
                        else onChoose(node.id);
                      }}
                    >
                      <span className="grow">{label(node)}</span>
                      {folder && (
                        <span className="text-xs text-muted-foreground" aria-hidden="true">
                          ›
                        </span>
                      )}
                      {folder && <span className="sr-only">{t("post.category.folder")}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default StepCategory;
