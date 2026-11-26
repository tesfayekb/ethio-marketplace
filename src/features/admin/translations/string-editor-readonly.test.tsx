import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const { mutation } = vi.hoisted(() => ({
  mutation: () => ({ mutateAsync: () => Promise.resolve(), isPending: false }),
}));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => vi.fn(), Link: () => null }));
vi.mock("./use-translations", async (original) => ({
  ...(await original<typeof import("./use-translations")>()),
  useAiTranslate: mutation,
  useSaveTranslation: mutation,
  useSetKeyContext: mutation,
  useTranslationStatusAction: mutation,
}));

import type { TranslationRow } from "./translations-service";
import { StringEditor } from "./strings-page";

const row: TranslationRow = {
  key: "a.key",
  langCode: "am",
  value: "x",
  sourceValue: "x",
  status: "edited",
  machine: false,
  flagged: false,
  flagNote: null,
  updatedBy: null,
  updatedAt: "2026-01-01T00:00:00Z",
  approvedBy: null,
  approvedAt: null,
  orphaned: false,
  context: "",
};

const draw = (mayUpdate: boolean) =>
  render(
    <StringEditor
      row={row}
      lang="am"
      rtl={false}
      mayUpdate={mayUpdate}
      mayApprove={false}
      mayMachine={false}
      mayManage={false}
      usedOn={undefined}
      guard={vi.fn()}
      saved={false}
      onSaved={vi.fn()}
    />,
    {
      wrapper: ({ children }) => (
        <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
      ),
    },
  );

describe("D44 — the translation box", () => {
  it("SPB-U1 without the door that saves it the box cannot be typed in; with it, it can", () => {
    const first = draw(false);
    expect(screen.getByTestId("string-input-a-key").hasAttribute("readonly")).toBe(true);
    first.unmount();
    draw(true);
    expect(screen.getByTestId("string-input-a-key").hasAttribute("readonly")).toBe(false);
  });
});
