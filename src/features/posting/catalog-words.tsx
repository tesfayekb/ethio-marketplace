import { catalogPieces } from "@/i18n";

import { useCatalogScope } from "./catalog-scope";

/**
 * Catalogue text drawn for the seller or the buyer: {country} as the country
 * name, {category:<slug>} as a button carrying the category's full path. The
 * text arrives already in the screen's language; the one renderer resolves it.
 */
export function CatalogWords({ text }: { text: string }) {
  const scope = useCatalogScope();
  return (
    <>
      {catalogPieces(text, scope).map((piece, index) =>
        piece.kind === "text" ? (
          <span key={index}>{piece.text}</span>
        ) : scope.moveTo === null ? (
          <span key={index} data-testid="post-category-pointer" data-slug={piece.slug}>
            {piece.path}
          </span>
        ) : (
          <button
            key={index}
            type="button"
            data-testid="post-category-pointer"
            data-slug={piece.slug}
            className="inline min-h-11 rounded-sm px-0.5 text-start font-medium text-primary underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => scope.moveTo?.(piece.slug)}
          >
            {piece.path}
          </button>
        ),
      )}
    </>
  );
}
