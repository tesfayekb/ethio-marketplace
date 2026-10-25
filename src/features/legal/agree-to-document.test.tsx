import { fireEvent, render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { walkFiles } from "../../../scripts/conformance/kit";

vi.mock("@/i18n", async (original) => {
  const real = await original<typeof import("@/i18n")>();
  const { en } = await import("@/i18n/locales/en");
  return {
    ...real,
    useI18n: () => ({
      t: (key: string) => (en as Record<string, string>)[key] ?? key,
      language: "en",
    }),
  };
});
import { en } from "@/i18n/locales/en";
import { AgreeToDocument } from "./agree-to-document";

const LINKS = { terms: "/terms", privacy: "/privacy" };

function mount(props: { checked?: boolean; refused?: boolean; onChange?: (v: boolean) => void }) {
  return render(
    <AgreeToDocument
      id="agreement"
      testId="auth-agree-tick"
      sentence="legal.agree.first.both"
      links={LINKS}
      checked={props.checked ?? false}
      onCheckedChange={props.onChange ?? (() => {})}
      refused={props.refused ?? false}
      message="legal.agree.required"
    />,
  );
}

describe("AgreeToDocument (bundle 22 turn 32)", () => {
  it("renders the sentence with two inline document links", () => {
    mount({});
    expect(screen.getByTestId("agree-to-document").textContent).toContain("I am 18 or older.");
    expect(screen.getByTestId("agree-to-document").querySelector("ul")).toBeNull();
    expect(screen.getByTestId("post-required-mark")).toBeTruthy();
    const links = screen.getAllByTestId("agree-link");
    expect(links.map((a) => a.getAttribute("href"))).toEqual(["/terms", "/privacy"]);
    expect(links.map((a) => a.textContent)).toEqual(["Terms of Service", "Privacy Policy"]);
    expect(links.map((a) => a.getAttribute("data-role"))).toEqual(["terms", "privacy"]);
    for (const a of links) {
      expect(a.getAttribute("target")).toBe("_blank");
      expect(a.getAttribute("rel")).toBe("noopener noreferrer");
    }
    expect(screen.queryByTestId("agree-message")).toBeNull();
  });

  it("refused: shows the message, marks the control invalid, names the message and focuses it", () => {
    mount({ refused: true });
    const control = screen.getByTestId("auth-agree-tick");
    const message = screen.getByTestId("agree-message");
    expect(message.textContent).toBe(en["legal.agree.required"]);
    expect(message.getAttribute("role")).toBe("alert");
    expect(control.getAttribute("aria-invalid")).toBe("true");
    expect(control.getAttribute("aria-describedby")).toBe(message.id);
    expect(document.activeElement).toBe(control);
    expect(screen.getByTestId("agree-to-document").getAttribute("data-refused")).toBe("1");
  });

  it("the soft border while required and empty, the full border while refused, neither once checked", () => {
    const soft = mount({});
    const softClass = screen.getByTestId("auth-agree-tick").className;
    expect(softClass).toContain("border-destructive");
    expect(softClass).not.toContain("ring-destructive");
    soft.unmount();
    const full = mount({ refused: true });
    expect(screen.getByTestId("auth-agree-tick").className).toContain("ring-destructive");
    full.unmount();
    mount({ checked: true, refused: true });
    const done = screen.getByTestId("auth-agree-tick");
    expect(done.className).not.toContain("border-destructive");
    expect(done.getAttribute("aria-invalid")).toBeNull();
    expect(screen.queryByTestId("agree-message")).toBeNull();
  });

  it("reports the tick", () => {
    const seen: boolean[] = [];
    mount({ onChange: (v) => seen.push(v) });
    fireEvent.click(screen.getByTestId("auth-agree-tick"));
    expect(seen).toEqual([true]);
  });

  it("census: a Checkbox beside a legal.* key lives only in the component", () => {
    const matches = walkFiles([join(process.cwd(), "src")], {
      ext: ["ts", "tsx"],
      skipTests: true,
    })
      .filter((path) => {
        const text = readFileSync(path, "utf8");
        return text.includes("<Checkbox") && /["'`]legal\./.test(text);
      })
      .map((path) => relative(process.cwd(), path));
    // Allowlist: none (a future exception is a line here with its reason and `until`, G55).
    const outside = matches.filter((m) => m !== "src/features/legal/agree-to-document.tsx");
    expect(outside.sort()).toEqual([]);
  });
});

function sentenceFindings(english: string, amharic: string): string[] {
  const read = (text: string) =>
    Object.fromEntries([...text.matchAll(/"([^"]+)":\s*"([^"\n]*)"/g)].map((m) => [m[1], m[2]]));
  const enRows = read(english);
  const amRows = read(amharic);
  const findings: string[] = [];
  // These do not name a document; until a kind beyond terms/privacy is asked for on this screen.
  const exceptions = ["legal.accept.agreeFirst.docs", "legal.accept.agreeUpdated.docs"];
  for (const [key, value] of Object.entries(enRows)) {
    if (
      exceptions.includes(key) ||
      !key.startsWith("legal.agree.") ||
      !/Terms of Service|Privacy Policy|publishing statement/.test(value)
    )
      continue;
    for (const [lang, sentence] of [
      ["en", value],
      ["am", amRows[key] ?? ""],
    ]) {
      const roles = [
        ...sentence.matchAll(/\[([^\]\n]{1,120})\]\((terms|privacy|publishing)\)/g),
      ].map((m) => m[2]);
      const wanted = [...value.matchAll(/\[([^\]\n]{1,120})\]\((terms|privacy|publishing)\)/g)].map(
        (m) => m[2],
      );
      if (
        !roles.length ||
        JSON.stringify(roles.slice().sort()) !== JSON.stringify(wanted.slice().sort()) ||
        /\]\((?!(?:terms|privacy|publishing)\))/.test(sentence)
      )
        findings.push(`${lang}:${key}`);
    }
  }
  return findings;
}

describe("D235 sentence census", () => {
  it("every named document has its tokens in both catalogues", () => {
    expect(
      sentenceFindings(
        readFileSync("src/i18n/locales/en-base.ts", "utf8"),
        readFileSync("src/i18n/locales/am-base.ts", "utf8"),
      ),
    ).toEqual([]);
  });
  it("refuses a planted token-less sentence", () => {
    expect(
      sentenceFindings(
        '"legal.agree.plant": "I agree to the Terms of Service.",',
        '"legal.agree.plant": "plain",',
      ),
    ).toEqual(["en:legal.agree.plant", "am:legal.agree.plant"]);
  });
});
