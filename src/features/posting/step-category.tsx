import { useLabelRoom } from "@/components/ui/use-label-room";
import { CutText } from "@/components/ui/cut-text";
import { useEffect, useRef, useState } from "react";

import {
  childrenOf,
  isPostable,
  pathOf,
  rootsOf,
  searchLeaves,
  type CategoryNode,
  type CategoryTree,
} from "@/features/categories/category-tree";
import { categoryGlyphOrNull } from "@/components/shell/category-glyphs";
import { entityName } from "@/i18n/entity";
import { useI18n } from "@/i18n";

import { useCatalogScope } from "./catalog-scope";
import { finderPending, useCatalogFinder, useMatchLine, type FinderMatch } from "./catalog-finder";
import { RequiredMark } from "./field";
import { readRecentCategories } from "./posting-service";
import { recentChips } from "./recent-categories";

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

/**
 * D40 — THE MARKETPLACE MENU'S TREATMENT: the rail's sidebar-accent hover, its
 * sidebar-accent selection, a visible keyboard ring; ≥44 px, logical props only.
 */
const rowClass =
  "flex min-h-11 w-full items-center gap-2 rounded-md border border-border px-3 py-2 text-start " +
  "text-sm text-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "disabled:opacity-60 disabled:hover:bg-transparent";
const rowSelected = "bg-sidebar-accent font-medium text-sidebar-accent-foreground";

/** D38 — the stored glyph before the name; none (and no gap) when absent/unknown. */
function NodeGlyph({ icon }: { icon: string | null }) {
  const Glyph = categoryGlyphOrNull(icon);
  if (Glyph === null) return null;
  return <Glyph className="h-4 w-4 shrink-0" aria-hidden="true" data-testid="post-category-icon" />;
}

const crumbClass =
  "min-h-11 rounded-md border border-border px-3 py-1 text-xs text-foreground " +
  "hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** D37-2 — one hit: name, path and, for an option hit, the line naming the match. */
function HitButton({
  node,
  matches,
  lang,
  selected,
  label,
  path,
  onChoose,
}: {
  node: CategoryNode;
  matches: FinderMatch[];
  lang: string;
  selected: boolean;
  label: string;
  path: string;
  onChoose: () => void;
}) {
  const { t } = useI18n();
  const scope = useCatalogScope();
  const line = useMatchLine(node.id, matches, lang, scope);
  return (
    <button
      type="button"
      data-testid="post-category-hit"
      data-category={node.id}
      aria-current={selected ? "true" : undefined}
      className={`${rowClass} ${selected ? rowSelected : ""} flex-col items-start gap-0`}
      onClick={onChoose}
    >
      <span className="flex items-center gap-2 font-medium">
        <NodeGlyph icon={node.icon} />
        {label}
      </span>
      <span className="text-xs text-muted-foreground">{path}</span>
      {line !== null && (
        <span className="text-xs text-foreground" data-testid="post-category-hit-match">
          {t("post.category.matchLine")
            .replace("{attribute}", line.attribute)
            .replace("{option}", line.option)}
        </span>
      )}
    </button>
  );
}

export function StepCategory({
  tree,
  isLoading,
  treeError,
  onChoose,
  invalid = false,
  cursor,
  onCursor,
  selectedId = null,
  term,
  onTerm,
}: {
  tree: CategoryTree;
  isLoading: boolean;
  treeError: boolean;
  /** D37-2 — a finder hit carries its matches; the wizard revalidates them. */
  onChoose: (categoryId: string, matches?: FinderMatch[]) => void;
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
  /** D40 — the leaf already chosen wears the menu's selected treatment. */
  selectedId?: string | null;
  /** INC-277 — the wizard holds the filter term so its Back can clear it. */
  term: string;
  onTerm: (term: string) => void;
}) {
  const { t, entities, language } = useI18n();
  const setTerm = onTerm;

  const label = (node: CategoryNode) => entityName("category", node, entities);
  // Bundle 7 D2 — asked once on mount; nothing is drawn until it answers ids.
  const [recentIds, setRecentIds] = useState<string[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    void readRecentCategories().then((ids) => {
      if (!cancelled) setRecentIds(ids);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const chips = recentChips(recentIds, tree);
  const recentRowRef = useRef<HTMLDivElement>(null);
  const recentLabelRef = useRef<HTMLSpanElement>(null);
  useLabelRoom(recentRowRef, [recentLabelRef], [
    chips.map((id) => { const node = tree.byId.get(id); return node ? label(node) : ""; }).join("\u0000"),
    language, isLoading, treeError,
  ]);
  const filtering = term.trim() !== "";
  const finder = useCatalogFinder(term, entities.lang);
  /**
   * D37-2 — the local NAME match renders at once and stays the answer while the
   * finder is asked, and when it fails (then the notice says so, F4). Once the
   * finder answers for this very term, its leaves in its order are the list.
   */
  const localHits: { node: CategoryNode; matches: FinderMatch[] }[] = filtering
    ? searchLeaves(tree, term, entities).map((node) => ({ node, matches: [] }))
    : [];
  const finderHits =
    finder.state === "ready" && finder.term === term.trim()
      ? finder.hits.flatMap((hit) => {
          const node = tree.byId.get(hit.leafId);
          return node !== undefined && isPostable(tree, node)
            ? [{ node, matches: hit.matches }]
            : [];
        })
      : null;
  const hits = finderHits ?? localHits;
  const nameOnly = finder.state === "failed" && finder.term === term.trim();
  const searching = finderPending(finder, term);
  const level = cursor === null ? rootsOf(tree) : childrenOf(tree, cursor);
  const trail = cursor === null ? [] : pathOf(tree, cursor);
  /**
   * INC-346 — the chosen leaf's path. A level ON it (the roots, or an ancestor of
   * the leaf) shows the choice as selected; a level OFF it asks again: the mark,
   * the soft border and "Current choice … Keep it".
   */
  const chosenPath = selectedId === null ? [] : pathOf(tree, selectedId);
  const chosenIds = new Set(chosenPath.map((node) => node.id));
  const offPath = selectedId !== null && !filtering && cursor !== null && !chosenIds.has(cursor);
  const unanswered = selectedId === null || offPath;

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

      {chips.length > 0 && (
        <div
          ref={recentRowRef}
          className="flex min-w-0 flex-nowrap items-center gap-2"
          data-testid="post-category-recent-row"
        >
          <span ref={recentLabelRef} className="shrink-0 text-sm text-muted-foreground">
            {t("post.category.recentLabel")}
          </span>
          {chips.map((id) => {
            const chip = tree.byId.get(id);
            if (chip === undefined) return null;
            const chipLabel = label(chip);
            return (
              <button
                key={id}
                type="button"
                data-testid="post-category-recent"
                data-category={id}
                aria-pressed={id === selectedId ? "true" : "false"}
                aria-label={chipLabel}
                title={chipLabel}
                className={
                  "min-h-11 max-w-[45%] shrink rounded-full border px-3 md:px-4 text-sm " +
                  (id === selectedId
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input bg-background text-foreground")
                }
                onClick={() => {
                  onCursor(tree.parentOf.get(id) ?? null);
                  onChoose(id);
                }}
              >
                <CutText text={chipLabel} />
              </button>
            );
          })}
        </div>
      )}

      <div className="space-y-1">
        {/* W4 D1 — the search is optional: its label carries no mark. */}
        <label
          htmlFor="post-category-search"
          className="flex items-center gap-1 text-sm font-medium text-foreground"
        >
          <span>{t("post.category.filterLabel")}</span>
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

      {/* W4 D1 — the required mark sits on the LIST heading and clears with the
          soft border the moment a leaf is chosen (including after Back). */}
      <p
        className="flex items-center gap-1 text-sm font-medium text-foreground"
        data-testid="post-category-list-heading"
      >
        <span>{t("post.step.category")}</span>
        {unanswered && <RequiredMark />}
      </p>

      {offPath && selectedId !== null && (
        <p
          className="flex flex-wrap items-center gap-2 text-sm text-foreground"
          data-testid="post-category-current"
        >
          <span className="text-muted-foreground">{t("post.category.currentChoice")}</span>
          <span className="font-medium">{chosenPath.map((step) => label(step)).join(" › ")}</span>
          <button
            type="button"
            data-testid="post-category-keep"
            className="min-h-11 px-2 text-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => onCursor(tree.parentOf.get(selectedId) ?? null)}
          >
            {t("post.category.keepIt")}
          </button>
        </p>
      )}

      {/* THE ONE CONTROL. Filtered, it is the matching leaves with their paths;
          unfiltered, it is the level the seller stands on. */}
      {/* D71 — the U6-C1-R2 soft state: while no leaf is chosen and nothing is
          refused the group wears the soft required border, at every level; full
          destructive after a refusal; none once a leaf is chosen. INC-346: a
          level off the chosen leaf's path counts as unanswered. */}
      <div
        data-testid="post-category-group"
        data-invalid={invalid ? "1" : "0"}
        data-empty={unanswered ? "1" : "0"}
        className={
          invalid
            ? "scroll-mt-20 rounded-md border border-destructive p-2 ring-1 ring-destructive"
            : unanswered
              ? "scroll-mt-20 rounded-md border border-destructive p-2"
              : "scroll-mt-20 rounded-md border border-transparent p-2"
        }
      >
        {invalid && (
          <p className="pb-2 text-sm text-destructive" data-testid="post-category-refusal">
            {t("post.category.chooseOne")}
          </p>
        )}
        {filtering ? (
          <ul className="space-y-2" data-testid="post-category-hits">
            {nameOnly && (
              <li className="text-xs text-muted-foreground" data-testid="post-category-nameonly">
                {t("post.category.nameMatchesOnly")}
              </li>
            )}
            {hits.length === 0 && searching && (
              <li
                className="text-sm text-muted-foreground"
                data-testid="post-category-searching"
                role="status"
              >
                {t("post.category.searching")}
              </li>
            )}
            {hits.length === 0 && !searching && (
              <li className="text-sm text-muted-foreground" data-testid="post-category-nohits">
                {t("post.category.noHits")}
              </li>
            )}
            {hits.map(({ node, matches }) => (
              <li key={node.id}>
                <HitButton
                  node={node}
                  matches={matches}
                  lang={entities.lang}
                  selected={node.id === selectedId}
                  label={label(node)}
                  path={pathOf(tree, node.id)
                    .map((step) => label(step))
                    .join(" › ")}
                  onChoose={() => onChoose(node.id, matches)}
                />
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
            <ul className="max-h-[60vh] space-y-2 overflow-y-auto" data-testid="post-browse-level">
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
                      aria-current={node.id === selectedId ? "true" : undefined}
                      data-on-path={chosenIds.has(node.id) ? "1" : undefined}
                      className={`${rowClass} ${chosenIds.has(node.id) ? rowSelected : ""}`}
                      onClick={() => {
                        if (folder) onCursor(node.id);
                        else onChoose(node.id);
                      }}
                    >
                      <NodeGlyph icon={node.icon} />
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
