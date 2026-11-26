import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("./use-translations", () => ({
  useImportTranslations: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useUndoImport: () => ({ mutateAsync: vi.fn(), isPending: false }),
}));

import { TransferBar } from "./transfer-bar";

const draw = (mayExport: boolean, mayImport: boolean) =>
  render(
    <TransferBar
      lang="am"
      baseLang="en"
      guard={vi.fn()}
      mayExport={mayExport}
      mayImport={mayImport}
      mayUndo={false}
    />,
  );

describe("D44 — the transfer bar's controls follow their own doors", () => {
  it("TB-U1 export without import draws only the export buttons; import without export only import", () => {
    const first = draw(true, false);
    expect(screen.getByTestId("strings-export-csv")).toBeTruthy();
    expect(screen.queryByTestId("strings-import")).toBeNull();
    first.unmount();
    draw(false, true);
    expect(screen.queryByTestId("strings-export-csv")).toBeNull();
    expect(screen.queryByTestId("strings-export-xliff")).toBeNull();
    expect(screen.getByTestId("strings-import")).toBeTruthy();
  });
});
