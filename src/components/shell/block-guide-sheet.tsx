import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { useAdminShellIfAny } from "@/features/admin/admin-context";
import { resolveGuideNext } from "@/features/admin/guide-next";
import { useI18n, type MessageKey } from "@/i18n";

import type { BlockGuideSpec, GuidePart, PartsKind } from "./page-guide";

/**
 * P-1c (D313) — THE GUIDE SHEET'S BODY, fetched on the first open (guide-sheet.tsx).
 *
 * Four fixed parts, in this order and never another: What this is · Each
 * column or Each part (one line per part, in the block's or page's order, its
 * label as the term) · How to add, change or remove · What to do next, ONE
 * link. The texts are the block's or page's keys under its prefix in the
 * `guide` layer, which the sheet asks for around this body (StringsLayerGate's
 * `layers`); the part names are the shell's (`prim.guide.*`, in the same
 * layer). The link resolves through resolveGuideNext — an admin section under
 * the caller's permissions (the admin shell's carrier, read nullable: a page
 * outside it has none), or a route of this site's register — so it never names
 * a path of its own.
 *
 * P-1c turn (b) (D315) — `partsKind` is the one grammar switch: a table's
 * columns read `<prefix>.guide.col.<key>` under "Each column"; a page's parts
 * read `<partsPrefix ?? prefix>.guide.part.<key>` under "Each part". The part
 * the person is on (`current`, a wizard's step) is marked `aria-current="step"`.
 */
const PART_TITLE = "text-xs font-semibold uppercase tracking-wide text-muted-foreground";

export function BlockGuideSheet({
  anchor,
  spec,
  parts,
  partsKind,
  current,
  onNext,
}: {
  anchor: string;
  spec: BlockGuideSpec;
  parts: readonly GuidePart[];
  partsKind: PartsKind;
  current?: string;
  /** The next-link was pressed; `hash` is the frame it leads to, when it names one. */
  onNext: (hash: string | undefined) => void;
}) {
  const { t } = useI18n();
  const shell = useAdminShellIfAny();
  // The block's own keys hang under its prefix (CF-GUIDE-1 names each one).
  const key = (suffix: string) => `${spec.prefix}.guide.${suffix}` as MessageKey;
  const partsHome = spec.partsPrefix ?? spec.prefix;
  const partWord = partsKind === "columns" ? "col" : "part";
  const partKey = (part: string) => `${partsHome}.guide.${partWord}.${part}` as MessageKey;
  const target = resolveGuideNext(spec.next, shell?.permissions ?? null);
  return (
    <div data-testid={`${anchor}-guide-body`} className="flex flex-col gap-5 text-sm">
      <section className="flex flex-col gap-1.5">
        <h3 className={PART_TITLE}>{t("prim.guide.what")}</h3>
        <p className="text-foreground">{t(key("what"))}</p>
      </section>
      <section className="flex flex-col gap-1.5">
        <h3 className={PART_TITLE}>
          {partsKind === "columns" ? t("prim.guide.columns") : t("prim.guide.parts")}
        </h3>
        <dl className="flex flex-col gap-2">
          {parts.map((part) => (
            <div
              key={part.key}
              data-testid={`${anchor}-guide-${partWord}-${part.key}`}
              aria-current={current === part.key ? "step" : undefined}
              className={current === part.key ? "border-s-2 border-primary ps-2" : undefined}
            >
              <dt className="font-semibold text-foreground">{part.label}</dt>
              <dd className="text-muted-foreground">{t(partKey(part.key))}</dd>
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
