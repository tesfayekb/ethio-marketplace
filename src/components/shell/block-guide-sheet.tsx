import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { useAdminShell } from "@/features/admin/admin-context";
import { resolveGuideNext } from "@/features/admin/guide-next";
import { useI18n, type MessageKey } from "@/i18n";

import type { BlockGuideSpec, GuideColumn } from "./block-guide";

/**
 * P-1c (D313) — THE GUIDE SHEET'S BODY, fetched on the first open (block-guide.tsx).
 *
 * Four fixed parts, in this order and never another: What this is · Each
 * column (one line per VISIBLE column, in the table's order, its label as the
 * term) · How to add, change or remove · What to do next, ONE link. The texts
 * are the block's keys under its prefix in the `guide` layer, which the control
 * asks for around this body (block-guide.tsx: StringsLayerGate's `layers`, in
 * the same chunk as the control, so this on-demand piece shares no module with
 * the entry — measured, P-1c); the part names are the shell's (`prim.guide.*`).
 * The link resolves through resolveGuideNext — the section register and the
 * caller's permissions — so it never names a path of its own.
 */
const PART_TITLE = "text-xs font-semibold uppercase tracking-wide text-muted-foreground";

export function BlockGuideSheet({
  anchor,
  spec,
  columns,
  onNext,
}: {
  anchor: string;
  spec: BlockGuideSpec;
  columns: readonly GuideColumn[];
  /** The next-link was pressed; `hash` is the frame it leads to, when it names one. */
  onNext: (hash: string | undefined) => void;
}) {
  const { t } = useI18n();
  const { permissions } = useAdminShell();
  // The block's own keys hang under its prefix (CF-GUIDE-1 names each one).
  const key = (suffix: string) => `${spec.prefix}.guide.${suffix}` as MessageKey;
  const target = resolveGuideNext(spec.next, permissions);
  return (
    <div data-testid={`${anchor}-guide-body`} className="flex flex-col gap-5 text-sm">
      <section className="flex flex-col gap-1.5">
        <h3 className={PART_TITLE}>{t("prim.guide.what")}</h3>
        <p className="text-foreground">{t(key("what"))}</p>
      </section>
      <section className="flex flex-col gap-1.5">
        <h3 className={PART_TITLE}>{t("prim.guide.columns")}</h3>
        <dl className="flex flex-col gap-2">
          {columns.map((column) => (
            <div key={column.key} data-testid={`${anchor}-guide-col-${column.key}`}>
              <dt className="font-semibold text-foreground">{column.label}</dt>
              <dd className="text-muted-foreground">{t(key(`col.${column.key}`))}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="flex flex-col gap-1.5">
        <h3 className={PART_TITLE}>{t("prim.guide.how")}</h3>
        <p className="text-foreground">{t(key("how"))}</p>
      </section>
      <section className="flex flex-col gap-1.5">
        <h3 className={PART_TITLE}>{t("prim.guide.next")}</h3>
        <Link
          to={target.to}
          hash={target.hash}
          data-testid={`${anchor}-guide-next`}
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
          onClick={() => onNext(target.hash)}
        >
          <span>{t(key("next"))}</span>
          <ArrowRight aria-hidden="true" className="size-4 shrink-0 rtl:-scale-x-100" />
        </Link>
      </section>
    </div>
  );
}

export default BlockGuideSheet;
