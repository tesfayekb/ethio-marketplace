import { useLocation } from "@tanstack/react-router";

import { OrderStrip } from "@/components/shell/order-strip";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { useI18n } from "@/i18n";
import { useSettling } from "@/lib/use-settling";

import { MarketsSection } from "./markets-section";
import { monetisationSteps } from "./monetisation-order";
import { ProductsSection } from "./products-section";
import { ADMIN_MONETISATION_KEY, useMonetisation } from "./use-monetisation";
import { useMonetisationNames } from "./use-monetisation-names";
import { useMayCall } from "@/features/permissions/use-may-call";

/**
 * P-1b (D290, D295, D303, D304, D311, D312), regrouped by P-1c (D313) — ADMIN ›
 * MONETISATION: the credits model's products and their console, BY PRODUCT.
 * The order strip first (Markets · Products · Prices, each state from the one
 * read), then the blocks — Markets · Levels · Reach; a level's per-category
 * perks and every product's prices sit inside the product's own row
 * (products-section.tsx), never in a page-wide table. Every block carries its
 * Guide; the page keeps one h1.
 *
 * Gate tier: `packages:view` opens the section (the /admin layout owns it);
 * every write re-checks `packages:update` AND step-up inside its door (F3), so
 * the hidden verbs below are convenience, never authority.
 *
 * ONE READ (`admin_list_monetisation`) feeds the strip and every block; one
 * `StepUpGate` wraps the page; `useSettling` on the one key holds the verbs
 * while a write settles.
 */
export function AdminMonetisationPage() {
  const { t } = useI18n();
  const settling = useSettling(ADMIN_MONETISATION_KEY);
  const { mayCall } = useMayCall();
  // INC-1310 — each control is switched by the door it calls (DEC-507).
  const mayMarket = mayCall({ door: "admin_save_market_settings" });
  const mayProduct = mayCall({ door: "admin_save_listing_package" });
  const mayPriceAdd = mayCall({ door: "admin_save_package_price" });
  const mayPriceEdit = mayCall({ door: "admin_edit_package_price" });
  const mayPriceEnd = mayCall({ door: "admin_end_package_price" });
  const mayOverrideSave = mayCall({ door: "admin_save_level_override" });
  const mayOverrideClear = mayCall({ door: "admin_clear_level_override" });
  const query = useMonetisation();
  const products = query.data?.products ?? [];
  const overrides = query.data?.overrides ?? [];
  const prices = query.data?.prices ?? [];
  const hash = useLocation({ select: (location) => location.hash });
  const { marketName, productName } = useMonetisationNames(products);
  const steps =
    query.data === undefined
      ? null
      : monetisationSteps(
          query.data,
          new Date().toISOString(),
          {
            marketName: (code) => marketName(code, "everyMarket"),
            productName,
          },
          t,
        );
  const shared = {
    products,
    loading: query.isLoading,
    error: query.error,
    settling,
  };
  return (
    <StepUpGate>
      {(guard) => (
        <div data-testid="admin-section-monetisation" className="min-w-0 space-y-8">
          <h1 className="text-lg font-semibold text-foreground" data-testid="monetisation-header">
            {t("admin.section.monetisation.title")}
          </h1>
          {steps === null ? null : (
            <OrderStrip testid="monetisation-order" steps={steps} oneLineWhenDone />
          )}
          <MarketsSection
            rows={query.data?.markets ?? []}
            guard={guard}
            mayUpdate={mayMarket}
            {...shared}
          />
          <ProductsSection
            kind="level"
            overrides={overrides}
            prices={prices}
            hash={hash}
            guard={guard}
            mayUpdate={mayProduct}
            mayPriceAdd={mayPriceAdd}
            mayPriceEdit={mayPriceEdit}
            mayPriceEnd={mayPriceEnd}
            mayOverrideSave={mayOverrideSave}
            mayOverrideClear={mayOverrideClear}
            {...shared}
          />
          <ProductsSection
            kind="reach"
            overrides={overrides}
            prices={prices}
            hash={hash}
            guard={guard}
            mayUpdate={mayProduct}
            mayPriceAdd={mayPriceAdd}
            mayPriceEdit={mayPriceEdit}
            mayPriceEnd={mayPriceEnd}
            mayOverrideSave={mayOverrideSave}
            mayOverrideClear={mayOverrideClear}
            {...shared}
          />
        </div>
      )}
    </StepUpGate>
  );
}

export default AdminMonetisationPage;
