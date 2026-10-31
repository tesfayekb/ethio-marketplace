import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconButton, IconButtonBare } from "@/components/ui/icon-button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import { OPEN_CONTROL } from "./menu-row";

/**
 * BUNDLE 9 B2 — the one way a row or a card offers its actions: Edit, Delete,
 * then a three-dots menu. Every control is named `<label> — <row name>`; its
 * tooltip shows the label alone. The three-dots follows THE TOOLTIP RULE:
 * Tooltip › TooltipTrigger asChild › DropdownMenuTrigger asChild › the button.
 *
 * Bundle 11 B1 fix (INC-539) — the menu is NOT modal. A menu entry usually
 * opens a dialog; a modal menu and a modal dialog both lock the page's pointer
 * events, and when the dialog opens while the menu is still closing, the lock
 * outlives both and the page takes no click after the dialog closes. The
 * dialog alone locks the page; the menu still closes on a choice, on Escape
 * and on a click outside, and gives focus back to the three-dots.
 *
 * Bundle 11 B2 (INC-541) — the menu leaves the page at once when it closes:
 * no fade-out (`data-[state=closed]:animate-none!`). While a closing menu
 * faded out (about 0.2 s), a dialog opened from it and closed again inside
 * that time handed focus back to the fading menu, and the menu took the next
 * press on the three-dots as a click outside itself: the press reopened
 * nothing. The menu still fades in.
 */

export type RowAction = { label: string; onSelect: () => void; disabled?: boolean };
export type RowMoreAction = {
  key: string;
  label: string;
  icon?: ReactNode;
  tone?: "neutral" | "danger";
  onSelect: () => void;
  disabled?: boolean;
};

export interface RowActionsProps {
  testid: string;
  name: string;
  edit?: RowAction;
  remove?: RowAction;
  more?: RowMoreAction[];
}

/**
 * Bundle 11 V2 (D132) — a phone card draws the same RowActions twice: the
 * three-dots alone in its top corner, Edit and Delete alone in its footer
 * (DataTable splits them). Each control keeps its one testid.
 */
export function RowActions({ testid, name, edit, remove, more }: RowActionsProps) {
  const { t } = useI18n();
  const hasMore = (more?.length ?? 0) > 0;
  if (!edit && !remove && !hasMore) return null;

  const plain = (more ?? []).filter((m) => m.tone !== "danger");
  const danger = (more ?? []).filter((m) => m.tone === "danger");
  const moreLabel = t("prim.table.actions");

  const item = (m: RowMoreAction) => (
    <DropdownMenuItem
      key={m.key}
      data-testid={`${testid}-more-${m.key}`}
      disabled={m.disabled}
      className={cn(m.tone === "danger" && "text-destructive focus:text-destructive")}
      onSelect={() => m.onSelect()}
    >
      {m.icon ? (
        <span aria-hidden="true" className="inline-flex [&_svg]:size-4">
          {m.icon}
        </span>
      ) : null}
      <span>{m.label}</span>
    </DropdownMenuItem>
  );

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex items-center justify-end gap-1">
        {edit ? (
          <IconButton
            data-testid={`${testid}-edit`}
            label={`${edit.label} — ${name}`}
            tooltip={edit.label}
            icon={<Pencil />}
            disabled={edit.disabled}
            onClick={() => edit.onSelect()}
          />
        ) : null}
        {remove ? (
          <IconButton
            data-testid={`${testid}-delete`}
            label={`${remove.label} — ${name}`}
            tooltip={remove.label}
            tone="danger"
            icon={<Trash2 />}
            disabled={remove.disabled}
            onClick={() => remove.onSelect()}
          />
        ) : null}
        {hasMore ? (
          <DropdownMenu modal={false}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <IconButtonBare
                    data-testid={`${testid}-more`}
                    className={OPEN_CONTROL}
                    label={`${moreLabel} — ${name}`}
                    icon={<EllipsisVertical />}
                  />
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>{moreLabel}</TooltipContent>
            </Tooltip>
            <DropdownMenuContent
              align="end"
              data-testid={`${testid}-menu`}
              className="data-[state=closed]:animate-none!"
            >
              {plain.map(item)}
              {danger.length > 0 ? (
                <>
                  {plain.length > 0 ? <DropdownMenuSeparator /> : null}
                  {danger.map(item)}
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </TooltipProvider>
  );
}
