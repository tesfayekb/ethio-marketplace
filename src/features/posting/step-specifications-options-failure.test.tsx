import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { readFailed } from "@/lib/reader-failure";
import { ownValue } from "@/lib/own-key";
import type { AttrDef } from "./posting-service";
import type { AttrOption } from "./attribute-options";

const state = vi.hoisted(() => ({
  amharic: false,
  read: vi.fn(),
  options: {} as Record<string, AttrOption[]>,
  failure: null as Error | null,
  calls: 0,
}));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(state.amharic ? am : en, key) ?? key,
    language: state.amharic ? "am" : "en",
    entities: { map: {}, lang: state.amharic ? "am" : "en" },
  }),
}));
vi.mock("@/i18n/entity", async (original) => ({
  ...(await original<typeof import("@/i18n/entity")>()),
  entityName: (_kind: string, row: { nameEn: string }) => row.nameEn,
}));
vi.mock("./catalog-scope", () => ({ useCatalogScope: () => null }));
vi.mock("./posting-service", () => ({ readPostingSchemaAnswer: state.read }));
vi.mock("./attribute-options", async (original) => ({
  ...(await original<typeof import("./attribute-options")>()),
  loadAttributeOptions: async (id: string) => {
    state.calls += 1;
    return state.failure === null
      ? { ok: true, options: ownValue(state.options, id) ?? [] }
      : { ok: false, failure: state.failure, held: null };
  },
}));
import { StepSpecifications } from "./step-specifications";
// Definition fixture copied from step-specifications-last-answer.test.tsx.
function definition(attrKey: string, attrType: string): AttrDef {
  return {
    attributeId: attrKey,
    attrKey,
    attrType,
    nameEn: attrKey,
    nameAm: null,
    helpTextEn: null,
    helpTextAm: null,
    isRequired: false,
    isFilterable: false,
    unit: null,
    minBound: null,
    maxBound: null,
    decimals: null,
    format: null,
    preset: null,
    maxLength: null,
    optionCount: attrType === "single_select" ? 2 : 0,
    allowOther: false,
    allowedOptions: null,
    defaultValue: null,
    visibleWhen: null,
    cardRank: null,
    factRank: null,
  };
}
function option(
  value: string,
  parent: string | null = null,
  facts: Record<string, unknown> | null = null,
): AttrOption {
  return {
    value,
    labelEn: value,
    labelAm: null,
    parent,
    facts,
    allowed: null,
    bounds: null,
    swatch: null,
  };
}
function schema(definitions: AttrDef[]) {
  state.read.mockResolvedValue({
    schema: { attributes: definitions, category: null, plan: null },
    rateLimited: false,
  });
}
beforeEach(() => {
  state.amharic = false;
  state.read.mockReset();
  state.options = {};
  state.failure = null;
  state.calls = 0;
});
it("UFO-5 a failed choices read is said in the section's words with the failure, and Retry reads that list again", async () => {
  schema([definition("make", "single_select"), definition("body", "single_select")]);
  state.options = { make: [option("maker1")] };
  state.failure = new TypeError("Failed to fetch");
  render(<StepSpecifications categoryId="uf-o5" values={{}} refusals={[]} onChange={vi.fn()} />);
  const notice = (await screen.findAllByTestId("post-attr-options-error"))[0] as HTMLElement;
  expect(notice).toHaveTextContent(en["post.specs.optionsFailed"]);
  expect(notice).toHaveTextContent(en["failure.network"]);
  const before = state.calls;
  expect(before).toBe(2);
  state.failure = null;
  fireEvent.click(within(notice).getByRole("button", { name: en["common.retry"] }));
  await waitFor(() => expect(screen.getAllByTestId("post-attr-options-error")).toHaveLength(1));
  expect(state.calls).toBe(before + 1);
});
it("UFO-6 a refused choices read is said as refused and offers no Retry", async () => {
  schema([definition("make", "single_select"), definition("body", "single_select")]);
  state.failure = readFailed({ code: "P0D01", message: "badValue:attribute" }, 400);
  render(<StepSpecifications categoryId="uf-o6" values={{}} refusals={[]} onChange={vi.fn()} />);
  const notice = (await screen.findAllByTestId("post-attr-options-error"))[0] as HTMLElement;
  await waitFor(() => expect(notice).toHaveAttribute("data-failure-reason", "refused"));
  expect(within(notice).queryByRole("button", { name: en["common.retry"] })).toBeNull();
});
