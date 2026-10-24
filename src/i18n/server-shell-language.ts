import { BASE_LANGUAGE } from "./provider";

/**
 * INC-872 / CHANGE (1) — the `<html lang|dir>` of the FIRST server byte. The
 * server renders the base catalog for every visitor (the provider's first
 * state), so the first byte declares the base language and its direction from
 * the gate rows ("ltr" when absent) — never the star cookie. The client
 * switches both once the star language's catalog is applied (`appliedLanguage`).
 */
export function serverShellLanguage(languages: ReadonlyArray<{ code: string; rtl: boolean }>): {
  lang: string;
  dir: "ltr" | "rtl";
} {
  const rtl = languages.find((row) => row.code === BASE_LANGUAGE)?.rtl ?? false;
  return { lang: BASE_LANGUAGE, dir: rtl ? "rtl" : "ltr" };
}
