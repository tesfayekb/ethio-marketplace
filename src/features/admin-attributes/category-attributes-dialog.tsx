import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CategoryModal, SELECT_CLASS } from "@/features/admin-categories/category-dialogs";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";

import { AttributeErrorLine, useAttributeError } from "./attribute-dialogs";
import { useAttributeLabel } from "./use-attribute-label";
import {
  CARD_ATTRIBUTE_MAXIMUM,
  CARD_ATTRIBUTE_MINIMUM,
  optionLabel,
  type AttributeLink,
} from "./attributes-service";

import {
  useAdminAttributes,
  useCategoryLinks,
  useEffectiveCategoryLinks,
  useLinkAttribute,
  useSetAttributeLinkOrder,
  useSetCardAttributes,
  useUnlinkAttribute,
  useUpdateAttributeLink,
} from "./use-attributes";

/**
 * C3c PART C — THE PER-CATEGORY LINK MANAGER.
 *
 * Opened from the category editor's "Attributes" verb, so it obeys the
 * return-path law: closing it hands the operator back to the editor, never to
 * a bare roster. Every write goes through the page's step-up `guard`.
 */
export function CategoryAttributesDialog({
  categoryId,
  categoryName,
  guard,
  onClose,
}: {
  categoryId: string;
  categoryName: string;
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  // C3-UX-2 — linked names, the card caption and the picker all read the
  // translated label, with the EN definition name as fallback.
  const attributeLabel = useAttributeLabel();
  const links = useCategoryLinks(categoryId);
  /**
   * C3-INH (DEC-044) — the tab lists the category's OWN links (editable) and,
   * below them, the ones inherited from an ancestor: read-only, named by their
   * origin. The two-must-display flag counts the EFFECTIVE card set, because a
   * child that inherits two card attributes already has scannable cards.
   */
  const effective = useEffectiveCategoryLinks(categoryId);
  const inherited = (effective.data ?? []).filter((row) => row.inherited);
  const library = useAdminAttributes();
  const link = useLinkAttribute();
  const unlink = useUnlinkAttribute();
  const updateLink = useUpdateAttributeLink();
  const reorder = useSetAttributeLinkOrder();
  const setCards = useSetCardAttributes();
  const { message, setMessage, fail } = useAttributeError();
  const [picker, setPicker] = useState("");
  const [search, setSearch] = useState("");

  const rows: AttributeLink[] = [...(links.data ?? [])].sort(
    (a, b) =>
      a.displayOrder - b.displayOrder ||
      attributeLabel(a.attributeId, a.nameEn).localeCompare(
        attributeLabel(b.attributeId, b.nameEn),
      ),
  );
  const linkedIds = new Set(rows.map((row) => row.attributeId));
  const term = search.trim().toLowerCase();
  const candidates = (library.data ?? []).filter(
    (row) =>
      !linkedIds.has(row.id) &&
      (term === "" ||
        attributeLabel(row.id, row.nameEn).toLowerCase().includes(term) ||
        row.attrKey.toLowerCase().includes(term)),
  );

  const carded = rows
    .filter((row) => row.cardRank !== null)
    .sort((a, b) => (a.cardRank ?? 0) - (b.cardRank ?? 0));
  const effectiveCardCount =
    carded.length + inherited.filter((row) => row.cardRank !== null).length;

  /**
   * DEC-045 — a dependent link only cascades when its PARENT definition is in
   * the effective set of this category; otherwise there is nothing to choose.
   */
  const [chosen, setChosen] = useState<Record<string, string>>({});
  const effectiveRows = [...rows, ...inherited];
  const cascades = rows
    .filter((row) => row.dependsOnKey !== null)
    .map((child) => {
      const parent = effectiveRows.find((row) => row.attrKey === child.dependsOnKey);
      return {
        child,
        // DEC-045b PART C — the preview speaks in NAMES, never in keys.
        parentLabel:
          parent === undefined
            ? (child.dependsOnKey ?? "")
            : attributeLabel(parent.attributeId, parent.nameEn),
        parentValues: (parent?.options ?? []).map((option) => option.value),
      };
    })
    .filter((entry) => entry.parentValues.length > 0);

  const run = (action: () => Promise<void>) => {
    setMessage(null);
    void guard(async () => {
      try {
        await action();
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  /**
   * UX-2 PART 5 — THE ATOMIC WRITE SAYS SO. A checkbox that silently persists
   * teaches nobody that the change is already saved, so each Required/Filterable
   * toggle reports "Saved" for a moment after its own write; a failure is the
   * inline error line the dialog already carries (F4 — never a silent success).
   */
  const [savedTag, setSavedTag] = useState<string | null>(null);
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (savedTimer.current !== null) clearTimeout(savedTimer.current);
    },
    [],
  );
  const runToggle = (tag: string, action: () => Promise<void>) => {
    setMessage(null);
    setSavedTag(null);
    void guard(async () => {
      try {
        await action();
        setSavedTag(tag);
        if (savedTimer.current !== null) clearTimeout(savedTimer.current);
        savedTimer.current = setTimeout(() => setSavedTag(null), 2500);
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  const move = (index: number, delta: number) => {
    const next = [...rows];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    const moved = next[index]!;
    next[index] = next[target]!;
    next[target] = moved;
    run(() => reorder.mutateAsync({ categoryId, orderedLinkIds: next.map((row) => row.linkId) }));
  };

  const toggleCard = (attributeId: string, on: boolean) => {
    const current = carded.map((row) => row.attributeId);
    const next = on
      ? [...current, attributeId].slice(0, CARD_ATTRIBUTE_MAXIMUM)
      : current.filter((entry) => entry !== attributeId);
    run(() => setCards.mutateAsync({ categoryId, orderedAttributeIds: next }));
  };

  return (
    <CategoryModal
      testid="category-attributes-dialog"
      openedBy="editor-attributes"
      title={`${t("admin.categories.action.attributes")} — ${categoryName}`}
      onClose={onClose}
    >
      {/* THE TWO-MUST-DISPLAY CAPTION: what a listing card will actually show. */}
      <p data-testid="category-attributes-card-caption" className="text-sm text-muted-foreground">
        {carded.length === 0
          ? t("admin.attributes.card.none")
          : t("admin.attributes.card.caption").replace(
              "{list}",
              carded.map((row) => attributeLabel(row.attributeId, row.nameEn)).join(" · "),
            )}
      </p>
      {effectiveCardCount < CARD_ATTRIBUTE_MINIMUM ? (
        <p
          role="status"
          data-testid="category-attributes-needs-card"
          className="text-sm text-amber-600 dark:text-amber-400"
        >
          {t("admin.categories.flag.needsCard")}
        </p>
      ) : null}

      {links.isPending ? (
        <p className="text-sm text-muted-foreground">{t("common.loading")}</p>
      ) : links.isError ? (
        <p role="alert" className="text-sm text-destructive">
          {t("admin.attributes.links.error")}
        </p>
      ) : rows.length === 0 ? (
        <p data-testid="category-attributes-empty" className="text-sm text-muted-foreground">
          {t("admin.attributes.links.empty")}
        </p>
      ) : (
        <ul className="space-y-2">
          {rows.map((row, index) => (
            <li
              key={row.linkId}
              data-testid={`category-attribute-link-${row.attrKey}`}
              className="space-y-2 rounded-md border border-border p-3"
            >
              <div className="flex min-w-0 items-baseline gap-2">
                <span className="min-w-0 truncate text-sm font-medium">
                  {attributeLabel(row.attributeId, row.nameEn)}
                </span>
                <span className="text-xs text-muted-foreground">{row.attrKey}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <label className="flex min-h-11 items-center gap-2 text-sm">
                  <Checkbox
                    data-testid={`category-attribute-required-${row.attrKey}`}
                    checked={row.isRequired}
                    onCheckedChange={(next) =>
                      // FIX-SCAN-1 ISSUE 1 — one atomic write: card_rank and
                      // display_order survive, and a failure cannot lose the link.
                      run(() =>
                        updateLink.mutateAsync({
                          linkId: row.linkId,
                          isRequired: next === true,
                        }),
                      )
                    }
                  />
                  {t("admin.attributes.links.required")}
                </label>
                <label className="flex min-h-11 items-center gap-2 text-sm">
                  <Checkbox
                    data-testid={`category-attribute-filterable-${row.attrKey}`}
                    checked={row.isFilterable}
                    onCheckedChange={(next) =>
                      run(() =>
                        updateLink.mutateAsync({
                          linkId: row.linkId,
                          isFilterable: next === true,
                        }),
                      )
                    }
                  />
                  {t("admin.attributes.links.filterable")}
                </label>
                <label className="flex min-h-11 items-center gap-2 text-sm">
                  <Checkbox
                    data-testid={`category-attribute-card-${row.attrKey}`}
                    checked={row.cardRank !== null}
                    disabled={row.cardRank === null && carded.length >= CARD_ATTRIBUTE_MAXIMUM}
                    onCheckedChange={(next) => toggleCard(row.attributeId, next === true)}
                  />
                  {row.cardRank === null
                    ? t("admin.attributes.card.rankNone")
                    : t("admin.attributes.card.rank").replace("{rank}", String(row.cardRank))}
                </label>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="touch"
                  data-testid={`category-attribute-up-${row.attrKey}`}
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                >
                  {t("admin.categories.action.up")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="touch"
                  data-testid={`category-attribute-down-${row.attrKey}`}
                  disabled={index === rows.length - 1}
                  onClick={() => move(index, 1)}
                >
                  {t("admin.categories.action.down")}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="touch"
                  data-testid={`category-attribute-unlink-${row.attrKey}`}
                  onClick={() => run(() => unlink.mutateAsync(row.linkId))}
                >
                  {t("admin.attributes.links.unlink")}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* C3-INH — INHERITED: read-only, no verb, origin named. */}
      {inherited.length === 0 ? null : (
        <ul className="space-y-2" data-testid="category-attributes-inherited">
          {inherited.map((row) => (
            <li
              key={row.linkId}
              data-testid={`category-attribute-inherited-${row.attrKey}`}
              className="space-y-1 rounded-md border border-dashed border-border p-3"
            >
              <div className="flex min-w-0 items-baseline gap-2">
                <span className="min-w-0 truncate text-sm font-medium">
                  {attributeLabel(row.attributeId, row.nameEn)}
                </span>
                <span className="text-xs text-muted-foreground">{row.attrKey}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t("admin.attributes.inherited.badge").replace("{origin}", row.originNameEn)}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* DEC-045 — THE CASCADE, as the poster will meet it: choosing a value of
          the parent attribute narrows the dependent one's options; clearing it
          empties them. Read-only preview — no write happens here. */}
      {cascades.length === 0 ? null : (
        <div className="space-y-3 border-t border-border pt-3" data-testid="category-cascades">
          {cascades.map(({ child, parentLabel, parentValues }) => {
            const childLabel = attributeLabel(child.attributeId, child.nameEn);
            return (
              <div
                key={child.linkId}
                className="space-y-2"
                data-testid={`category-attribute-cascade-${child.attrKey}`}
              >
                <p
                  className="text-sm font-medium"
                  data-testid={`category-attribute-cascade-prompt-${child.attrKey}`}
                >
                  {t("admin.attributes.dependsOn.previewPrompt")
                    .replace("{parent}", parentLabel)
                    .replace("{child}", childLabel)}
                </p>
                <select
                  aria-label={parentLabel}
                  data-testid={`category-attribute-cascade-parent-${child.attrKey}`}
                  className={SELECT_CLASS}
                  value={chosen[child.attrKey] ?? ""}
                  onChange={(event) =>
                    setChosen((prev) => ({ ...prev, [child.attrKey]: event.target.value }))
                  }
                >
                  <option value="">{t("admin.attributes.dependsOn.previewNone")}</option>
                  {parentValues.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                <p
                  className="text-xs text-muted-foreground"
                  data-testid={`category-attribute-cascade-caption-${child.attrKey}`}
                >
                  {t("admin.attributes.dependsOn.previewResults").replace("{child}", childLabel)}
                </p>
                <ul
                  className="space-y-1"
                  data-testid={`category-attribute-cascade-options-${child.attrKey}`}
                >
                  {child.options
                    .filter(
                      (option) =>
                        (chosen[child.attrKey] ?? "") !== "" &&
                        option.parent === chosen[child.attrKey],
                    )
                    .map((option) => (
                      <li
                        key={option.value}
                        data-testid={`category-attribute-cascade-option-${option.value}`}
                        className="text-sm text-muted-foreground"
                      >
                        {optionLabel(option)}
                      </li>
                    ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {/* ADD: a searchable picker over the library, linked names excluded. */}
      <div className="space-y-2 border-t border-border pt-3">
        <Input
          data-testid="category-attribute-search"
          placeholder={t("admin.attributes.links.searchPlaceholder")}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select
          aria-label={t("admin.attributes.links.add")}
          data-testid="category-attribute-picker"
          className={SELECT_CLASS}
          value={picker}
          onChange={(event) => setPicker(event.target.value)}
        >
          <option value="">{t("admin.attributes.links.pickNone")}</option>
          {candidates.map((row) => (
            <option key={row.id} value={row.id}>
              {`${attributeLabel(row.id, row.nameEn)} (${row.attrKey})`}
            </option>
          ))}
        </select>
        <Button
          type="button"
          size="touch"
          className="w-full sm:w-auto"
          data-testid="category-attribute-add"
          disabled={picker === "" || link.isPending}
          onClick={() =>
            run(async () => {
              await link.mutateAsync({
                categoryId,
                attributeId: picker,
                isRequired: false,
                isFilterable: false,
                displayOrder: rows.length,
              });
              setPicker("");
            })
          }
        >
          {t("admin.attributes.links.add")}
        </Button>
      </div>

      <AttributeErrorLine message={message} />
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="touch"
          data-testid="category-attributes-close"
          onClick={onClose}
        >
          {t("common.close")}
        </Button>
      </div>
    </CategoryModal>
  );
}
