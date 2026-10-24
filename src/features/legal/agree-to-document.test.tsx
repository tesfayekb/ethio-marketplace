import { fireEvent, render, screen } from "@testing-library/react";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it, vi } from "vitest";

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

const LINKS = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

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
  it("renders the sentence, the required mark and every link with its href and target", () => {
    mount({});
    expect(screen.getByText(en["legal.agree.first.both"], { exact: false })).toBeTruthy();
    expect(screen.getByTestId("post-required-mark")).toBeTruthy();
    const links = screen.getAllByTestId("agree-link");
    expect(links.map((a) => a.getAttribute("href"))).toEqual(["/terms", "/privacy"]);
    expect(links.map((a) => a.textContent)).toEqual(["Terms", "Privacy"]);
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
    const matches: string[] = [];
    function visit(dir: string) {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) visit(path);
        else if (/\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)) {
          const text = readFileSync(path, "utf8");
          if (text.includes("<Checkbox") && /["'`]legal\./.test(text))
            matches.push(relative(process.cwd(), path));
        }
      }
    }
    visit(join(process.cwd(), "src"));
    // Allowlist: none (a future exception is a line here with its reason and `until`, G55).
    const outside = matches.filter((m) => m !== "src/features/legal/agree-to-document.tsx");
    expect(outside.sort()).toEqual([]);
  });
});
