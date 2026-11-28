import { useLayoutEffect, type ReactNode } from "react";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ownValue } from "@/lib/own-key";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useCallback, useState } from "react";
import { beforeEach, expect, it, vi } from "vitest";
import { StepWho } from "./step-who";
import { draftRefusalText } from "./refusal-text";
import { focusFirstRefusal } from "./field-refusals";
import { readFailed } from "@/lib/reader-failure";

const words = vi.hoisted(() => ({ real: false, amharic: false }));
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => (words.real ? (ownValue(words.amharic ? am : en, key) ?? key) : key),
    language: words.amharic ? "am" : "en",
    entities: {},
  }),
}));
vi.mock("@/i18n/entity", () => ({ entityName: () => "scratch" }));
vi.mock("@/components/shell/location-data", () => ({
  readAreaCookie: () => ({ country: "ET" }),
  useOpenMarkets: () => ({ markets: [] }),
}));
const phone = vi.hoisted(() => ({ fails: false }));
const refresh = vi.hoisted(() => ({ calls: 0 }));
vi.mock("./phone-parse", async (original) => ({
  ...(await original<typeof import("./phone-parse")>()),
  loadPhoneLib: async () => {
    if (phone.fails) throw new TypeError("Failed to fetch dynamically imported module");
    return null;
  },
}));
vi.mock("@/lib/on-demand-failure", async (original) => ({
  ...(await original<typeof import("@/lib/on-demand-failure")>()),
  refreshPage: () => {
    refresh.calls += 1;
  },
}));
const who = vi.hoisted(() => ({
  alias: "e2e_owner" as string | null,
  failure: null as unknown,
  saveReason: null as string | null,
  /** A whole answer for the identity save (a refusal no control shows, or none at all). */
  saveAnswer: null as null | { ok: boolean; refusals: { field: string; reason: string }[] },
  lastContact: null as Record<string, unknown> | null,
  reads: 0,
  suggest: null as null | (() => Promise<string[]>),
}));
vi.mock("./posting-service", () => ({
  readSellerIdentity: async () => {
    who.reads += 1;
    if (who.failure !== null) throw who.failure;
    return {
      alias: who.alias,
      sellerType: "person",
      businessName: null,
      firstName: "",
      lastName: "Owner",
      homeCountryCode: "ET",
      homeCountryConfirmed: true,
      contactPrefs: {},
    };
  },
  readSellerLine: async () => null,
  readCountries: async () => [],
  readLastListingContact: async () => who.lastContact,
  saveIdentity: async () =>
    who.saveAnswer !== null
      ? who.saveAnswer
      : who.saveReason === null
        ? { ok: true, refusals: [] }
        : { ok: false, refusals: [{ field: "seller_type", reason: who.saveReason }] },
  suggestAliases: () => (who.suggest === null ? Promise.resolve([]) : who.suggest()),
  checkAlias: async () => ({ ok: true, refusals: [] }),
  changeHomeCountry: async () => ({ ok: true, refusals: [] }),
}));

/**
 * INC-1353 — the step reports its missing answers inside the commit that draws it: a parent's
 * layout effect (which runs after its children's layout effects and before any passive effect)
 * already sees the report, so a submit in that same tick meets a closed gate.
 */
function Probe({ onCommit, children }: { onCommit: () => void; children: ReactNode }) {
  useLayoutEffect(() => {
    onCommit();
  });
  return <>{children}</>;
}

it("UFP-4 the contact step's missing answers are heard by the gate in the commit that draws it", () => {
  const onMissing = vi.fn();
  let atCommit: unknown[][] = [];
  render(
    <Probe onCommit={() => (atCommit = onMissing.mock.calls.slice())}>
      <StepWho
        contactPref={{ messages: true }}
        refusals={[]}
        onChange={() => {}}
        onMissing={onMissing}
      />
    </Probe>,
  );
  expect(atCommit.length).toBeGreaterThan(0);
});
