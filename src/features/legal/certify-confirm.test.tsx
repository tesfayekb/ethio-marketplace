import { useEffect } from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";

import { renderPanel } from "@/components/ui/dialog-parts-test-render";
import type { CertifyState } from "./certify-refusal";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));
vi.mock("./certify-block", () => ({
  CertifyBlock: ({ onChange }: { onChange: (state: CertifyState) => void }) => {
    useEffect(() => {
      onChange({ state: "ready", ticked: false, versionIds: [], acceptancePending: false });
    }, [onChange]);
    return (
      <input
        type="checkbox"
        aria-label={en["legal.certify.title"]}
        onChange={(event) =>
          onChange({
            state: "ready",
            ticked: event.target.checked,
            versionIds: [],
            acceptancePending: false,
          })
        }
      />
    );
  },
}));

import { CertifyConfirm } from "./certify-confirm";

describe("the renewal panel preserves its certification gate", () => {
  it("CCP-1 an unticked press sends nothing; ticking confirms once with the same certification arguments", async () => {
    const confirm = vi.fn();
    renderPanel(
      <CertifyConfirm
        listingId="scratch"
        title={en["legal.certify.title"]}
        yes={en["legal.certify.title"]}
        subjectTitle="Scratch ad"
        onCancel={() => {}}
        onConfirm={confirm}
      />,
    );
    const yes = await screen.findByTestId("certify-confirm-yes");
    expect(yes).not.toBeDisabled();
    expect(yes).toHaveAttribute("data-closed", "1");
    fireEvent.click(yes);
    expect(confirm).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("checkbox", { name: en["legal.certify.title"] }));
    await waitFor(() => expect(yes).not.toHaveAttribute("data-closed"));
    fireEvent.click(yes);
    fireEvent.click(yes);
    expect(confirm).toHaveBeenCalledExactlyOnceWith({ certified: [], language: "en" });
  });
});
