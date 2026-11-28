import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { beforeEach, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ownValue } from "@/lib/own-key";
import type { AttrDef } from "./posting-service";
import type { AttrOption } from "./attribute-options";

const state = vi.hoisted(() => ({
  amharic: false,
  read: vi.fn(),
  options: {} as Record<string, AttrOption[]>,
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
  loadAttributeOptions: async (id: string) => ownValue(state.options, id) ?? [],
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
});
it("UFW-12 specifications without a category ask for one uf:S7s3.1", () => {
  render(<StepSpecifications categoryId={null} values={{}} refusals={[]} onChange={vi.fn()} />);
  expect(screen.getByText(en["post.specs.needCategory"])).toBeVisible();
});
it("UFW-13 a failed schema and a rate refusal say so with Retry uf:S7s3.2", async () => {
  state.read.mockResolvedValueOnce({ schema: null, rateLimited: false }).mockResolvedValueOnce({
    schema: { attributes: [], category: null, plan: null },
    rateLimited: false,
  });
  render(
    <StepSpecifications
      categoryId="uf-schema-failed"
      values={{}}
      refusals={[]}
      onChange={vi.fn()}
    />,
  );
  expect(await screen.findByTestId("post-specs-error")).toHaveTextContent(
    en["post.specs.loadFailed"],
  );
  fireEvent.click(await screen.findByRole("button", { name: en["common.retry"] }));
  expect(await screen.findByTestId("post-specs-none")).toHaveTextContent(en["post.specs.none"]);
  expect(state.read).toHaveBeenCalledTimes(2);
  cleanup();
  state.read.mockResolvedValueOnce({ schema: null, rateLimited: true });
  render(
    <StepSpecifications categoryId="uf-schema-rate" values={{}} refusals={[]} onChange={vi.fn()} />,
  );
  expect(await screen.findByTestId("post-specs-error")).toHaveTextContent(
    en["failure.rateLimitedSoon"],
  );
  expect(screen.getByTestId("post-specs-error")).toHaveAttribute(
    "data-failure-reason",
    "rateLimited",
  );
});
it("UFW-14 dependent choices say choose the parent first and none for that parent uf:S7s3.9", async () => {
  schema([definition("make", "single_select"), definition("model", "single_select")]);
  state.options = {
    make: [option("maker1"), option("maker2")],
    model: [option("model1", "maker1")],
  };
  const view = render(
    <StepSpecifications categoryId="uf-dependent" values={{}} refusals={[]} onChange={vi.fn()} />,
  );
  expect(await screen.findByTestId("post-attr-parent-first")).toHaveTextContent(
    en["post.specs.parentFirst"].replace("{parent}", "make"),
  );
  view.rerender(
    <StepSpecifications
      categoryId="uf-dependent"
      values={{ make: "maker2" }}
      refusals={[]}
      onChange={vi.fn()}
    />,
  );
  expect(await screen.findByTestId("post-attr-no-options")).toHaveTextContent(
    en["post.specs.noneForParent"],
  );
});
it("UFW-15 the model fills a detail and Use model value restores the offered answer uf:S7s3.10", async () => {
  schema([definition("model", "single_select"), definition("detail", "text")]);
  state.options = {
    model: [option("m1", null, { detail: "one" }), option("m2", null, { detail: "two" })],
  };
  function Form() {
    const [values, setValues] = useState<Record<string, unknown>>({});
    return (
      <StepSpecifications
        categoryId="uf-model"
        values={values}
        refusals={[]}
        onChange={setValues}
      />
    );
  }
  render(<Form />);
  const model = await screen.findByRole("combobox", { name: (label) => label.startsWith("model") });
  fireEvent.focus(model);
  await waitFor(() => expect(model.querySelector('option[value="m1"]')).not.toBeNull());
  fireEvent.change(model, { target: { value: "m1" } });
  const detail = screen.getByRole("textbox", { name: (label) => label.startsWith("detail") });
  await waitFor(() => expect(detail).toHaveValue("one"));
  expect(screen.getByTestId("post-attr-from-model")).toHaveTextContent(en["post.specs.fromModel"]);
  fireEvent.change(detail, { target: { value: "seller answer" } });
  expect(screen.getByTestId("post-attr-model-differs")).toHaveTextContent(
    en["post.specs.modelDiffers"],
  );
  fireEvent.click(screen.getByRole("button", { name: en["post.specs.useModelValue"] }));
  expect(detail).toHaveValue("one");
});
it("UFW-16 More opens and closes the stored field help uf:S7s3.12", async () => {
  schema([{ ...definition("detail", "text"), helpTextEn: "First sentence. Second sentence." }]);
  render(<StepSpecifications categoryId="uf-help" values={{}} refusals={[]} onChange={vi.fn()} />);
  expect(await screen.findByText("First sentence.")).toBeVisible();
  const more = screen.getByRole("button", { name: en["post.specs.helpMore"] });
  expect(screen.queryByTestId("post-attr-help-rest")).not.toBeInTheDocument();
  fireEvent.click(more);
  expect(screen.getByTestId("post-attr-help-rest")).toHaveTextContent("Second sentence.");
  expect(more).toHaveAttribute("aria-expanded", "true");
  fireEvent.click(more);
  expect(screen.queryByTestId("post-attr-help-rest")).not.toBeInTheDocument();
});
it("UFW-17 the specifications screen uses Amharic catalogue words uf:S7s3.16", async () => {
  state.amharic = true;
  schema([]);
  await act(async () => {
    render(
      <StepSpecifications categoryId="uf-spec-am" values={{}} refusals={[]} onChange={vi.fn()} />,
    );
  });
  expect(screen.getByTestId("post-specs-none")).toHaveTextContent(am["post.specs.none"]);
  if (am["post.specs.none"] !== en["post.specs.none"])
    expect(screen.queryByText(en["post.specs.none"])).not.toBeInTheDocument();
});
