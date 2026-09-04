import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";

import { CategoryModal } from "./category-dialogs";
import {
  CategoryImageError,
  generateCategoryImage,
  type GeneratedAssets,
} from "./category-images-service";
import type { CategoryRow } from "./categories-service";

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
  hasExisting,
  testid,
  onGenerated,
}: {
  categoryId: string;
  hasExisting: boolean;
  testid: string;
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
   * C5e PART B — VERSIONED ASSETS. Object names now carry the generation
   * timestamp, so there is no deterministic URL to guess: the preview renders
   * the URLs THIS generation returned, and an already-imaged category simply
   * shows its caption until it is regenerated. `hasExisting` still decides the
   * Generate/Regenerate label.
   */
  const shown = assets;

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

export function CategoryImageDialog({
  category,
  openedBy,
  onClose,
}: {
  category: CategoryRow;
  openedBy: string;
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
      <GeneratePanel
        categoryId={category.id}
        hasExisting={category.hasImage}
        testid="category-image"
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
