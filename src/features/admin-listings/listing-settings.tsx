import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { useState } from "react";

import { TableActionButton } from "@/components/shell/table-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";
import { refreshAfterWrite } from "@/lib/refresh-after-write";

import {
  daysOf,
  parsePolicy,
  POLICY_KEY,
  settingsErrorKey,
  type ListingPolicy,
} from "./listing-policy";

/**
 * Bundle 16 turn R2 (D174 3, D175 2; spec v2 §2) — ADMIN › LISTINGS › SETTINGS:
 * the two renew settings, `listing_policy` (one row): whether a seller may renew an
 * expired ad, and the days a renewal gives (30 at launch). Read by any signed-in
 * user; written only through `admin_set_listing_policy` — listings:enforce with a
 * fresh second factor, 1 to 365 days, audited `listing.policy_set`. The header's
 * Settings button opens it for listings:enforce only.
 *
 * Testids: the button `listings-settings`, the dialog `listings-settings-dialog`,
 * its switch `listings-settings-renew`, its days `listings-settings-days`, the
 * problem line `listings-settings-problem`, Save `listings-settings-save`, Cancel
 * `listings-settings-cancel`; a failed read `listings-settings-load-error`.
 */

async function readPolicy(): Promise<ListingPolicy> {
  const { data, error } = await supabase
    .from("listing_policy")
    .select("renew_allowed, renew_days")
    .maybeSingle();
  if (error) throw new Error(error.message);
  const policy = parsePolicy(data);
  if (policy === null) throw new Error("listing_policy: malformed answer");
  return policy;
}

export function ListingSettings({
  guard,
  onSaved,
}: {
  guard: GuardFn;
  /** The saved line, said where the page says its outcomes. */
  onSaved: (text: string) => void;
}) {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [renewAllowed, setRenewAllowed] = useState(true);
  const [days, setDays] = useState("");
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);

  const query = useQuery({ queryKey: POLICY_KEY, queryFn: readPolicy, enabled: open });
  const [shown, setShown] = useState<ListingPolicy | null>(null);
  // The form opens on the row as read, once (INC-558's rule: never measured against a re-read).
  if (open && query.data !== undefined && shown === null) {
    setShown(query.data);
    setRenewAllowed(query.data.renewAllowed);
    setDays(String(query.data.renewDays));
  }

  const close = () => {
    setOpen(false);
    setShown(null);
    setProblem(null);
  };

  const save = async () => {
    const value = daysOf(days);
    if (value === null) {
      setProblem(t("admin.listings.settings.daysHelp"));
      return;
    }
    setBusy(true);
    setProblem(null);
    try {
      await guard(async () => {
        const { error } = await supabase.rpc("admin_set_listing_policy", {
          p_renew_allowed: renewAllowed,
          p_renew_days: value,
        });
        if (error) throw error;
      });
    } catch (error) {
      setBusy(false);
      const abort = stepUpAbortKey(error);
      // A cancelled second factor leaves the dialog open, as it was.
      if (abort === null) return;
      const message =
        error !== null && typeof error === "object" && "message" in error
          ? String((error as { message: unknown }).message)
          : "";
      setProblem(t(abort ?? settingsErrorKey(message)));
      return;
    }
    setBusy(false);
    await refreshAfterWrite(queryClient, { queryKey: POLICY_KEY });
    close();
    onSaved(t("admin.listings.settings.saved"));
  };

  return (
    <>
      <TableActionButton
        data-testid="listings-settings"
        icon={<Settings />}
        label={t("admin.listings.settings.open")}
        onClick={() => setOpen(true)}
      />
      {open ? (
        <CategoryModal
          testid="listings-settings-dialog"
          openedBy="listings-settings"
          title={t("admin.listings.settings.title")}
          onClose={close}
        >
          <div className="min-w-0 space-y-4">
            <p className="text-sm text-muted-foreground">{t("admin.listings.settings.body")}</p>
            {query.isError ? (
              <p
                role="alert"
                data-testid="listings-settings-load-error"
                className="text-sm text-destructive"
              >
                {t("admin.listings.settings.loadError")}
              </p>
            ) : shown === null ? (
              <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
                {t("common.loading")}
              </p>
            ) : (
              <>
                <div className="flex min-h-11 items-center justify-between gap-3">
                  <label
                    htmlFor="listings-settings-renew"
                    className="text-sm font-medium text-foreground"
                  >
                    {t("admin.listings.settings.renewAllowed")}
                  </label>
                  <Switch
                    id="listings-settings-renew"
                    data-testid="listings-settings-renew"
                    checked={renewAllowed}
                    onCheckedChange={(checked) => {
                      setRenewAllowed(checked);
                      setProblem(null);
                    }}
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-2">
                  <label
                    htmlFor="listings-settings-days"
                    className="text-sm font-medium text-foreground"
                  >
                    {t("admin.listings.settings.renewDays")}
                  </label>
                  <Input
                    id="listings-settings-days"
                    data-testid="listings-settings-days"
                    inputMode="numeric"
                    value={days}
                    maxLength={3}
                    aria-describedby="listings-settings-days-help"
                    onChange={(event) => {
                      setDays(event.target.value);
                      setProblem(null);
                    }}
                  />
                  <p id="listings-settings-days-help" className="text-xs text-muted-foreground">
                    {t("admin.listings.settings.daysHelp")}
                  </p>
                </div>
              </>
            )}
            {problem !== null ? (
              <p
                role="alert"
                data-testid="listings-settings-problem"
                className="text-sm text-destructive"
              >
                {problem}
              </p>
            ) : null}
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="touch"
                data-testid="listings-settings-cancel"
                disabled={busy}
                onClick={close}
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="button"
                size="touch"
                data-testid="listings-settings-save"
                disabled={busy || shown === null}
                onClick={() => void save()}
              >
                {t("admin.listings.settings.save")}
              </Button>
            </div>
          </div>
        </CategoryModal>
      ) : null}
    </>
  );
}

export default ListingSettings;
