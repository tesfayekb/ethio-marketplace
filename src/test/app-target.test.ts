import { describe, expect, it } from "vitest";

import { assertAppTargetsStaging } from "../../e2e/helpers/app-target";
import { errorText } from "../lib/error-text";

const STAGING_REF = "jatpuhfdjfzctjipklmk";
const STAGING = `https://${STAGING_REF}.supabase.co`;
const PROD = "https://zwmvxvzzvjvtdcfcwiuf.supabase.co";
const KEY = "sb_secret_e2e_never_printed";

function messageOf(env: Record<string, string | undefined>): string {
  try {
    assertAppTargetsStaging(env, STAGING_REF);
  } catch (error) {
    return errorText(error);
  }
  return "";
}

describe("INC-464 — assertAppTargetsStaging", () => {
  it("refuses an unset VITE_SUPABASE_URL with the exact message", () => {
    expect(messageOf({ SUPABASE_SERVICE_ROLE_KEY: KEY })).toBe(
      "[e2e:setup] the app under test does not point at ethio-staging (VITE_SUPABASE_URL = (unset)). Start local runs with: bun run e2e:local",
    );
  });

  it("refuses the ethio-prod address", () => {
    expect(messageOf({ VITE_SUPABASE_URL: PROD })).toContain(`(VITE_SUPABASE_URL = ${PROD})`);
  });

  it("passes the staging address", () => {
    expect(messageOf({ VITE_SUPABASE_URL: STAGING, SUPABASE_URL: STAGING })).toBe("");
  });

  it("refuses a staging VITE_SUPABASE_URL with an ethio-prod SUPABASE_URL", () => {
    expect(messageOf({ VITE_SUPABASE_URL: STAGING, SUPABASE_URL: PROD })).not.toBe("");
  });

  it("never prints a key", () => {
    const envs = [
      { VITE_SUPABASE_PUBLISHABLE_KEY: KEY, SUPABASE_SERVICE_ROLE_KEY: KEY },
      { VITE_SUPABASE_URL: PROD, VITE_SUPABASE_PUBLISHABLE_KEY: KEY },
      { VITE_SUPABASE_URL: STAGING, SUPABASE_URL: PROD, SUPABASE_SERVICE_ROLE_KEY: KEY },
    ];
    for (const env of envs) expect(messageOf(env)).not.toContain(KEY);
  });
  it("passes the exact local URL with E2E_LOCAL_BACKEND=1", () => {
    expect(
      messageOf({
        E2E_LOCAL_BACKEND: "1",
        VITE_SUPABASE_URL: "https://127.0.0.1:54321",
        SUPABASE_URL: "https://127.0.0.1:54321",
      }),
    ).toBe("");
  });

  it("refuses staging-looking and production URLs with the local flag", () => {
    for (const url of [STAGING, PROD, "https://127.0.0.1:54321.evil.invalid"]) {
      expect(messageOf({ E2E_LOCAL_BACKEND: "1", VITE_SUPABASE_URL: url })).toContain(
        `(VITE_SUPABASE_URL = ${url})`,
      );
    }
    expect(
      messageOf({
        E2E_LOCAL_BACKEND: "1",
        VITE_SUPABASE_URL: "https://127.0.0.1:54321",
        SUPABASE_URL: PROD,
      }),
    ).not.toBe("");
  });

  it("INC-789 refuses the plain-http local URL with the local flag", () => {
    expect(
      messageOf({ E2E_LOCAL_BACKEND: "1", VITE_SUPABASE_URL: "http://127.0.0.1:54321" }),
    ).toContain("(VITE_SUPABASE_URL = http://127.0.0.1:54321)");
  });

  it("refuses the local URL without the local flag", () => {
    expect(messageOf({ VITE_SUPABASE_URL: "https://127.0.0.1:54321" })).toContain(
      "(VITE_SUPABASE_URL = https://127.0.0.1:54321)",
    );
  });
});
