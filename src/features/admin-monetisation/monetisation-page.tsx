import { useAdminShell } from "@/features/admin/admin-context";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { useI18n } from "@/i18n";
import { useSettling } from "@/lib/use-settling";

import { CapsSection } from "./caps-section";
import { MarketsSection } from "./markets-section";
import { OverridesSection } from "./overrides-section";
import { PricesSection } from "./prices-section";
import { ProductsSection } from "./products-section";
import { ADMIN_MONETISATION_KEY, useMonetisation } from "./use-monetisation";

/**
 * P-1b (D290, D295, D303, D304, D311, D312) — ADMIN › MONETISATION: the credits
 * model's products and their console, in the ruled order — Markets · Levels ·
 * Per-category perks · Reach · Prices · Posting caps.
 *
 * Gate tier: `packages:view` opens the section (the /admin layout owns it);
 * every write re-checks `packages:update` AND step-up inside its door (F3), so
 * the hidden verbs below are convenience, never authority. The caps block
 * keeps its own gate pair (`coverage:view` / `coverage:update`).
 *
 * ONE READ (`admin_list_monetisation`) feeds the first five blocks; one
 * `StepUpGate` wraps the page; `useSettling` on the one key holds the verbs
 * while a write settles.
 */
export function AdminMonetisationPage() {
  const { t } = useI18n();
  const settling = useSettling(ADMIN_MONETISATION_KEY);
  const { permissions } = useAdminShell();
  const mayUpdate = permissions.includes("packages:update");
  const maySeeCaps = permissions.includes("coverage:view");
  const mayUpdateCaps = permissions.includes("coverage:update");
  const query = useMonetisation();
  const products = query.data?.products ?? [];
  const shared = {
    products,
    loading: query.isLoading,
    error: query.error,
    mayUpdate,
    settling,
  };

  return (
    <StepUpGate>
      {(guard) => (
        <div data-testid="admin-section-monetisation" className="min-w-0 space-y-8">
          <h1 className="text-lg font-semibold text-foreground" data-testid="monetisation-header">
            {t("admin.section.monetisation.title")}
          </h1>
          <MarketsSection rows={query.data?.markets ?? []} guard={guard} {...shared} />
          <ProductsSection kind="level" guard={guard} {...shared} />
          <OverridesSection rows={query.data?.overrides ?? []} guard={guard} {...shared} />
          <ProductsSection kind="reach" guard={guard} {...shared} />
          <PricesSection rows={query.data?.prices ?? []} guard={guard} {...shared} />
          {maySeeCaps ? (
            <CapsSection mayUpdate={mayUpdateCaps} settling={settling} guard={guard} />
          ) : null}
        </div>
      )}
    </StepUpGate>
  );
}

export default AdminMonetisationPage;
