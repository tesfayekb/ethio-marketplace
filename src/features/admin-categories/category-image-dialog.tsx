import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";

import { relativeTime } from "@/lib/relative-time";

import { CategoryModal } from "./category-dialogs";
import {
  acceptCategoryImage,
  CategoryImageError,
  generateCategoryImage,
  type GeneratedAssets,
  loadCategoryImages,
} from "./category-images-service";

/**
 * C5b PART A — THE IMAGE SURFACE.
 *
 * REVIEW MODEL (ruling logged in /docs/features/categories.md): a generation
 * PERSISTS immediately — the route writes the three objects and the row in one
 * gated call, and this surface is where the result is reviewed and, if wrong,
 * regenerated. There is no draft-asset state yet; it arrives when listings
 * consume category imagery.
 */

export function useImageFailure() {
  const { t } = useI18n();
  const [message, setMessage] = useState<string | null>(null);
  const fail = (error: unknown) => {
    if (error instanceof CategoryImageError) {
      const stage =
        error.stage === null ? "" : ` (${t("admin.categories.image.stageLabel")} ${error.stage})`;
      setMessage(`${t("admin.categories.error.imageFailed")}${stage}: ${error.message}`);
      return;
    }
    setMessage(t("admin.categories.error.imageFailed"));
  };
  return { message, setMessage, fail };
}

export function AssetsPreview({
  assets,
  testid,
}: {
  assets: { imageUrl: string; thumbUrl: string; ogUrl: string };
  testid: string;
}) {
  const { t } = useI18n();
  return (
    <div className="space-y-2" data-testid={testid}>
      <figure className="space-y-1">
        <img
          src={assets.imageUrl}
          alt={t("admin.categories.image.card")}
          width={256}
          height={256}
          loading="lazy"
          data-testid={`${testid}-card`}
          className="h-auto w-40 rounded-md border border-border bg-background"
        />
        <figcaption className="text-xs text-muted-foreground">
          {t("admin.categories.image.card")}
        </figcaption>
      </figure>
      <figure className="space-y-1">
        <img
          src={assets.thumbUrl}
          alt={t("admin.categories.image.thumb")}
          width={64}
          height={64}
          loading="lazy"
          data-testid={`${testid}-thumb`}
          className="h-auto w-16 rounded-md border border-border bg-background"
        />
        <figcaption className="text-xs text-muted-foreground">
          {t("admin.categories.image.thumb")}
        </figcaption>
      </figure>
      <figure className="space-y-1">
        <img
          src={assets.ogUrl}
          alt={t("admin.categories.image.og")}
          width={240}
          height={126}
          loading="lazy"
          data-testid={`${testid}-og`}
          className="h-auto w-full max-w-xs rounded-md border border-border bg-background"
        />
        <figcaption className="text-xs text-muted-foreground">
          {t("admin.categories.image.og")}
        </figcaption>
      </figure>
    </div>
  );
}

/** The generate control + preview + timings, shared by the tab and the create flow. */
export function GeneratePanel({
  categoryId,
  testid,
  stored,
  onGenerated,
}: {
  categoryId: string;
  testid: string;
  /** C5h PART B — the row's STORED assets, rendered exactly like fresh ones. */
  stored?: { imageUrl: string; thumbUrl: string; ogUrl: string } | null;
  onGenerated?: (assets: GeneratedAssets) => void;
}) {
  const { t } = useI18n();
  const { message, setMessage, fail } = useImageFailure();
  const [busy, setBusy] = useState(false);
  const [assets, setAssets] = useState<GeneratedAssets | null>(null);

  const run = async () => {
    setMessage(null);
    setBusy(true);
    try {
      // C5c PART C — UNIFORM PROMPT: the house prompt is the only prompt.
      const result = await generateCategoryImage({ categoryId });
      setAssets(result);
      onGenerated?.(result);
    } catch (error) {
      fail(error);
    } finally {
      setBusy(false);
    }
  };

  /**
   * C5e PART B — VERSIONED ASSETS: object names carry the generation timestamp,
   * so there is no URL to guess. C5h PART B closes the gap the other way — the
   * caller supplies the row's STORED urls, and this generation's result simply
   * supersedes them. `hasExisting` still decides the Generate/Regenerate label.
   */
  const shown = assets ?? stored ?? null;

  return (
    <div className="space-y-3" data-testid={testid}>
      <p className="text-sm text-muted-foreground">{t("admin.categories.image.review")}</p>
      {shown === null ? (
        <p className="text-sm text-muted-foreground" data-testid={`${testid}-empty`}>
          {t("admin.categories.image.empty")}
        </p>
      ) : (
        <AssetsPreview assets={shown} testid={`${testid}-assets`} />
      )}
      {assets === null ? null : (
        <p className="text-xs text-muted-foreground" data-testid={`${testid}-timings`}>
          {`${t("admin.categories.image.stageLabel")} ${assets.stage} · ${assets.timings.genMs}/${assets.timings.processMs}/${assets.timings.totalMs} ms`}
        </p>
      )}
      {message === null ? null : (
        <p role="alert" data-testid={`${testid}-error`} className="text-sm text-destructive">
          {message}
        </p>
      )}
      <Button
        type="button"
        className="min-h-11 w-full sm:w-auto"
        data-testid={`${testid}-generate`}
        disabled={busy}
        onClick={() => void run()}
      >
        {busy
          ? t("admin.categories.image.busy")
          : shown === null
            ? t("admin.categories.image.generate")
            : t("admin.categories.image.regenerate")}
      </Button>
    </div>
  );
}

/**
 * C5l PART A — THE SHARED IMAGE SURFACE.
 *
 * C5g PART C / C5h PARTS B+C — the ACCEPT surface, reading STORED truth.
 *
 * On open the surface asks the row what it holds (gated definer reader), so a
 * reopened surface renders the saved assets and the acceptance badge exactly
 * like a fresh generation. BUTTON LAW: no image -> no Accept button at all;
 * image present and unaccepted -> Accept; accepted -> badge only. `onAccepted`
 * decides what a successful accept does next (the editor dialog closes after a
 * beat; the create flow's Step 2 leaves closing to its Finish button). This is
 * the ONE surface — editor and create flow reuse it, no fork (B3).
 */
export function CategoryImagePanel({
  categoryId,
  guard,
  onAccepted,
}: {
  categoryId: string;
  guard: (run: () => Promise<void>) => Promise<void>;
  onAccepted?: () => void;
}) {
  const { t, language } = useI18n();
  const { message, setMessage, fail } = useImageFailure();
  const [loading, setLoading] = useState(true);
  const [acceptedAt, setAcceptedAt] = useState<string | null>(null);
  const [stored, setStored] = useState<{
    imageUrl: string;
    thumbUrl: string;
    ogUrl: string;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  // PART B — truth on open. A failed read is surfaced (F4), never a silent
  // "no image": the Accept button stays absent because nothing is known.
  useEffect(() => {
    let live = true;
    setLoading(true);
    loadCategoryImages(categoryId)
      .then((row) => {
        if (!live) return;
        if (row && row.imageUrl !== null && row.thumbUrl !== null && row.ogUrl !== null) {
          setStored({ imageUrl: row.imageUrl, thumbUrl: row.thumbUrl, ogUrl: row.ogUrl });
        }
        setAcceptedAt(row?.acceptedAt ?? null);
      })
      .catch((error: unknown) => {
        if (live) fail(error);
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const accept = () => {
    setMessage(null);
    setBusy(true);
    void guard(async () => {
      const at = await acceptCategoryImage(categoryId);
      setAcceptedAt(at);
      setDone(true);
      onAccepted?.();
    })
      .catch((error: unknown) => {
        const raw = error instanceof Error ? error.message : "";
        if (raw.startsWith("admin.categories.error.")) {
          setMessage(t(raw as Parameters<typeof t>[0]));
          return;
        }
        fail(error);
      })
      .finally(() => {
        setBusy(false);
      });
  };

  const hasAssets = stored !== null;

  return (
    <>
      {loading ? (
        <p className="text-sm text-muted-foreground" data-testid="category-image-loading">
          {t("admin.categories.image.loading")}
        </p>
      ) : (
        <GeneratePanel
          categoryId={categoryId}
          testid="category-image"
          stored={stored}
          onGenerated={(assets) => {
            // A NEW generation is not the accepted one (the RPC cleared it too).
            setAcceptedAt(null);
            setDone(false);
            setStored({
              imageUrl: assets.imageUrl,
              thumbUrl: assets.thumbUrl,
              ogUrl: assets.ogUrl,
            });
          }}
        />
      )}
      {acceptedAt === null ? null : (
        <p
          data-testid="category-image-accepted-badge"
          className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
        >
          {`${t("admin.categories.image.accepted")} · ${relativeTime(acceptedAt, language)}`}
        </p>
      )}
      {done ? (
        <p
          role="status"
          data-testid="category-image-accept-toast"
          className="rounded-md bg-muted px-2 py-1 text-sm text-foreground"
        >
          {t("admin.categories.image.acceptToast")}
        </p>
      ) : null}
      {message === null ? null : (
        <p
          role="alert"
          data-testid="category-image-accept-error"
          className="text-sm text-destructive"
        >
          {message}
        </p>
      )}
      {!loading && hasAssets && acceptedAt === null ? (
        <div className="flex flex-wrap justify-end gap-2">
          <Button
            type="button"
            className="min-h-11"
            data-testid="category-image-accept"
            disabled={busy}
            onClick={accept}
          >
            {t("admin.categories.image.accept")}
          </Button>
        </div>
      ) : null}
    </>
  );
}

/** The editor's Image door: the shared panel in a titled, closable dialog. */
export function CategoryImageDialog({
  categoryId,
  openedBy,
  guard,
  onClose,
}: {
  categoryId: string;
  hasImage: boolean;
  openedBy: string;
  guard: (run: () => Promise<void>) => Promise<void>;
  onClose: () => void;
}) {
  const { t } = useI18n();

  return (
    <CategoryModal
      testid="category-image-dialog"
      openedBy={openedBy}
      title={t("admin.categories.image.title")}
      onClose={onClose}
    >
      <CategoryImagePanel
        categoryId={categoryId}
        guard={guard}
        // PART C — accept-closes: the confirmation is read, then the surface goes.
        onAccepted={() => window.setTimeout(onClose, 1200)}
      />
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          data-testid="category-image-close"
          onClick={onClose}
        >
          {t("common.close")}
        </Button>
      </div>
    </CategoryModal>
  );
}
