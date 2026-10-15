import { describe, expect, it } from "vitest";

import { en } from "@/i18n/locales/en";

import { daysOf, parsePolicy, settingsErrorKey } from "./listing-policy";

/**
 * Bundle 16 turn R2 (D174 3, D175 2) — the renew settings as the row holds them,
 * the days box's rule and the door's refusal in words.
 */
describe("the renew settings (turn R2)", () => {
  it("RS-1 the row reads whole or not at all", () => {
    expect(parsePolicy({ renew_allowed: true, renew_days: 30 })).toEqual({
      renewAllowed: true,
      renewDays: 30,
    });
    expect(parsePolicy({ renew_allowed: false, renew_days: 365 })).toEqual({
      renewAllowed: false,
      renewDays: 365,
    });
    for (const bad of [
      null,
      [],
      "x",
      {},
      { renew_allowed: "true", renew_days: 30 },
      { renew_allowed: true, renew_days: 0 },
      { renew_allowed: true, renew_days: 366 },
      { renew_allowed: true, renew_days: 7.5 },
      { renew_allowed: true, renew_days: "30" },
    ]) {
      expect(parsePolicy(bad), JSON.stringify(bad)).toBeNull();
    }
  });

  it("RS-2 the days box holds a whole number from 1 to 365", () => {
    expect(daysOf("30")).toBe(30);
    expect(daysOf(" 1 ")).toBe(1);
    expect(daysOf("365")).toBe(365);
    for (const bad of ["", "0", "366", "1000", "7.5", "-3", "30d", "abc"]) {
      expect(daysOf(bad), bad).toBeNull();
    }
  });

  it("RS-3 the door's refusal in the admin's words", () => {
    expect(settingsErrorKey("renew days are 1 to 365")).toBe("admin.listings.settings.daysHelp");
    expect(settingsErrorKey("permission denied")).toBe("admin.listings.settings.failed");
    for (const key of [
      "admin.listings.settings.open",
      "admin.listings.settings.title",
      "admin.listings.settings.body",
      "admin.listings.settings.renewAllowed",
      "admin.listings.settings.renewDays",
      "admin.listings.settings.daysHelp",
      "admin.listings.settings.save",
      "admin.listings.settings.saved",
      "admin.listings.settings.loadError",
      "admin.listings.settings.failed",
    ] as const) {
      expect(en[key], key).toBeTruthy();
    }
  });
});
