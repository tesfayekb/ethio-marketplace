import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AiFeatureForm } from "./ai-feature-form";
import type { AiFeatureRow } from "./ai-service";

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

const ROW: AiFeatureRow = {
  feature: "writing_helper",
  on: true,
  offReason: null,
  offAt: null,
  monthlyBudgetCents: 500,
  unit: "call",
  unitCostMicrousd: 3_000,
  monthSpentMicrousd: 0,
  monthCalls: 0,
  monthUnits: 0,
  todayCalls: 0,
  alertLevel: 0,
  updatedAt: "",
};

const value = (testid: string) => (screen.getByTestId(testid) as HTMLInputElement).value;

/**
 * Bundle 13 turn 5 (D158) — one feature's switch, budget and price: the form
 * opens on the stored values, sends the whole record, says what switching photo
 * screening off does (bundle 13 turn 6), and refuses what the door would refuse
 * before anything is sent.
 */
describe("AiFeatureForm (D158)", () => {
  it("AIF-1 the stored values fill the form; Save sends the whole record; the switch turns it off", () => {
    const onSave = vi.fn();
    render(
      <AiFeatureForm
        row={ROW}
        name="Writing help"
        busy={false}
        refusal={null}
        onCancel={() => {}}
        onSave={onSave}
      />,
    );
    expect(screen.getByTestId("ai-editor-feature").textContent).toBe("Writing help");
    expect(value("ai-editor-budget")).toBe("5.00");
    expect(value("ai-editor-price")).toBe("0.003");
    expect((screen.getByTestId("ai-editor-on") as HTMLInputElement).checked).toBe(true);
    expect(screen.queryByTestId("ai-editor-screening-note")).toBeNull();

    fireEvent.click(screen.getByTestId("ai-editor-save"));
    expect(onSave).toHaveBeenLastCalledWith({
      feature: "writing_helper",
      enabled: true,
      monthlyBudgetCents: 500,
      unitCostMicrousd: 3_000,
    });

    fireEvent.click(screen.getByTestId("ai-editor-on"));
    fireEvent.change(screen.getByTestId("ai-editor-budget"), { target: { value: "" } });
    fireEvent.change(screen.getByTestId("ai-editor-price"), { target: { value: "0.0025" } });
    fireEvent.click(screen.getByTestId("ai-editor-save"));
    expect(onSave).toHaveBeenLastCalledWith({
      feature: "writing_helper",
      enabled: false,
      monthlyBudgetCents: null,
      unitCostMicrousd: 2_500,
    });
  });

  it("AIF-2 photo screening's switch can be turned off and says what that does; machine translation is priced per million characters", () => {
    const onSave = vi.fn();
    const { unmount } = render(
      <AiFeatureForm
        row={{ ...ROW, feature: "photo_screen", monthlyBudgetCents: null }}
        name="Photo screening"
        busy={false}
        refusal={null}
        onCancel={() => {}}
        onSave={onSave}
      />,
    );
    const on = screen.getByTestId("ai-editor-on") as HTMLInputElement;
    expect(on.checked).toBe(true);
    expect(on.disabled).toBe(false);
    expect(screen.getByTestId("ai-editor-screening-note").textContent).toBe(
      "admin.ai.field.screeningOffNote",
    );
    expect(value("ai-editor-budget")).toBe("");
    fireEvent.click(screen.getByTestId("ai-editor-on"));
    fireEvent.click(screen.getByTestId("ai-editor-save"));
    expect(onSave).toHaveBeenLastCalledWith(
      expect.objectContaining({
        feature: "photo_screen",
        enabled: false,
        monthlyBudgetCents: null,
      }),
    );
    unmount();

    render(
      <AiFeatureForm
        row={{ ...ROW, feature: "translations", unit: "character", unitCostMicrousd: 20 }}
        name="Machine translation"
        busy={false}
        refusal={null}
        onCancel={() => {}}
        onSave={onSave}
      />,
    );
    expect(screen.getByText("admin.ai.field.priceMillion")).toBeTruthy();
    expect(value("ai-editor-price")).toBe("20");
    fireEvent.click(screen.getByTestId("ai-editor-save"));
    expect(onSave).toHaveBeenLastCalledWith(
      expect.objectContaining({ feature: "translations", unitCostMicrousd: 20 }),
    );
  });

  it("AIF-3 a budget or a price the door would refuse is refused in the form; the door's own refusal is shown; Cancel and busy", () => {
    const onSave = vi.fn();
    const onCancel = vi.fn();
    const { unmount } = render(
      <AiFeatureForm
        row={ROW}
        name="Writing help"
        busy={false}
        refusal={null}
        onCancel={onCancel}
        onSave={onSave}
      />,
    );
    fireEvent.change(screen.getByTestId("ai-editor-budget"), { target: { value: "-5" } });
    fireEvent.click(screen.getByTestId("ai-editor-save"));
    expect(screen.getByTestId("ai-editor-error").textContent).toBe("admin.ai.error.badBudget");
    fireEvent.change(screen.getByTestId("ai-editor-budget"), { target: { value: "5" } });
    fireEvent.change(screen.getByTestId("ai-editor-price"), { target: { value: "11" } });
    fireEvent.click(screen.getByTestId("ai-editor-save"));
    expect(screen.getByTestId("ai-editor-error").textContent).toBe("admin.ai.error.badPrice");
    expect(onSave).not.toHaveBeenCalled();
    unmount();

    render(
      <AiFeatureForm
        row={ROW}
        name="Writing help"
        busy
        refusal={{ key: "admin.ai.error.unknown", raw: "boom" }}
        onCancel={onCancel}
        onSave={onSave}
      />,
    );
    expect(screen.getByTestId("ai-editor-error").textContent).toBe("admin.ai.error.unknown");
    expect(screen.getByTestId("ai-editor-error-reason")).toBeTruthy();
    expect((screen.getByTestId("ai-editor-save") as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByTestId("ai-editor-cancel"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
