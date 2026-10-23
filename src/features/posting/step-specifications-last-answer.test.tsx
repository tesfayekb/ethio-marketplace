import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { useEffect } from "react";
import { keepListedAnswers } from "./catalog-held-answers";
import { StepSpecifications } from "./step-specifications";
import { useDraft } from "./use-draft";
import type { AttrDef, DraftBody } from "./posting-service";

const door = vi.hoisted(() => ({
  bodies: [] as DraftBody[],
  answers: [] as Array<() => void>,
  reads: [] as Array<() => void>,
}));
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, entities: {}, language: "en" }),
  drawCatalog: (text: string) => text,
  catalogText: (text: string) => text,
  catalogWords: (text: string) => text,
}));
vi.mock("@/i18n/entity", () => ({
  entityName: (_kind: string, row: { nameEn: string }) => row.nameEn,
}));
vi.mock("./catalog-scope", () => ({ useCatalogScope: () => ({}) }));
vi.mock("./posting-service", () => ({
  readDraft: vi.fn(async () => null),
  readPostingSchemaAnswer: vi.fn(async () => ({
    schema: {
      attributes: [definition("model", "single_select"), definition("detail", "text")],
      category: null,
      plan: null,
    },
    rateLimited: false,
  })),
  saveDraft: vi.fn(
    (body: DraftBody) =>
      new Promise((resolve) => {
        door.bodies.push(structuredClone(body));
        door.answers.push(() =>
          resolve({ ok: true, payload: { listing_id: "l-1", draft_step: 1 }, refusals: [] }),
        );
      }),
  ),
}));
vi.mock("./attribute-options", () => ({
  loadAttributeOptions: vi.fn(async () => [
    { value: "m1", labelEn: "m1", labelAm: null, parent: null, facts: { detail: "one" } },
    { value: "m2", labelEn: "m2", labelAm: null, parent: null, facts: { detail: "two" } },
  ]),
  findHeldOption: (value: string, options: Array<{ value: string }>) =>
    options.find((option) => option.value === value),
  optionLabel: (option: { value: string }) => option.value,
}));

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

it("INC-809 Specifications shows the last of four choices after deferred saves", async () => {
  door.bodies.length = 0;
  door.answers.length = 0;
  door.reads.length = 0;
  function Form() {
    const draft = useDraft(null);
    const answers = draft.values.attributes;
    const change = draft.change;
    useEffect(() => {
      if (answers["model"] === undefined) return;
      let cancelled = false;
      const complete = () => {
        if (cancelled) return;
        const kept = keepListedAnswers({
          answers,
          categoryId: "c-1",
          read: {
            state: "ok",
            categoryId: "c-1",
            definitions: [definition("model", "single_select")],
          },
          optionsByKey: { model: ["m1", "m2"] },
        });
        if (kept !== answers) change({ attributes: kept }, false, answers);
      };
      door.reads.push(complete);
      return () => {
        cancelled = true;
      };
    }, [answers, change]);
    return (
      <StepSpecifications
        categoryId="c-1"
        values={draft.values.attributes}
        refusals={[]}
        onChange={(attributes, immediate) =>
          draft.change({ categoryId: "c-1", attributes }, immediate)
        }
      />
    );
  }
  const { unmount } = render(<Form />);
  const model = await waitFor(() => {
    const field = document.getElementById("post-attr-model");
    if (!field) throw new Error("model not rendered");
    return field;
  });
  fireEvent.focus(model);
  await waitFor(() => expect(model.querySelector('option[value="m1"]')).not.toBeNull());
  vi.useFakeTimers();
  fireEvent.change(model, { target: { value: "m2" } });
  await act(async () => {
    await vi.advanceTimersByTimeAsync(2000);
  });
  fireEvent.change(model, { target: { value: "m1" } });
  fireEvent.change(model, { target: { value: "m2" } });
  act(() => {
    fireEvent.change(model, { target: { value: "m1" } });
    door.reads.at(-1)?.();
  });
  await act(async () => {
    await vi.advanceTimersByTimeAsync(2000);
  });
  for (let index = 0; index < door.answers.length; index += 1) {
    await act(async () => {
      door.answers[index]?.();
    });
  }
  expect((door.bodies.at(-1)?.attributes as Record<string, unknown> | undefined)?.["model"]).toBe(
    "m1",
  );
  expect(model).toHaveValue("m1");
  unmount();
  vi.useRealTimers();
});
