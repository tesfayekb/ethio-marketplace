import { useLayoutEffect, type ReactNode } from "react";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ownValue } from "@/lib/own-key";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const seams = vi.hoisted(() => ({ reason: "featureOff" }));
const words = vi.hoisted(() => ({ real: false, amharic: false }));
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => (words.real ? (ownValue(words.amharic ? am : en, key) ?? key) : key),
    language: words.amharic ? "am" : "en",
    entities: {},
  }),
}));
vi.mock("./catalog-scope", () => ({ useCatalogScope: () => null }));
vi.mock("./attribute-options", () => ({ loadAttributeOptions: () => Promise.resolve([]) }));
vi.mock("./posting-service", () => ({
  peekAssist: () => Promise.resolve(null),
  requestAssist: () =>
    Promise.resolve({ ok: false, payload: {}, refusals: [{ reason: seams.reason }] }),
}));

import { StepDetails } from "./step-details";

const draw = (onAssistOff = vi.fn()) =>
  render(
    <StepDetails
      listingId={null}
      categoryId="c-1"
      categoryPath=""
      attributes={{}}
      definitions={[]}
      photoIds={[]}
      title={"A title"}
      description=""
      onChange={vi.fn()}
      refusals={[]}
      onAssistOff={onAssistOff}
    />,
  );

const press = async () => {
  await act(async () => {
    fireEvent.click(screen.getByTestId("post-assist"));
  });
};

/**
 * INC-1353 — the step reports its missing answers inside the commit that draws it: a parent's
 * layout effect (which runs after its children's layout effects and before any passive effect)
 * already sees the report, so a submit in that same tick meets a closed gate.
 */
function Probe({ onCommit, children }: { onCommit: () => void; children: ReactNode }) {
  useLayoutEffect(() => {
    onCommit();
  });
  return <>{children}</>;
}

it("UFP-1 the details step's blank title is heard by the gate in the commit that draws it", () => {
  const onMissing = vi.fn();
  let atCommit: unknown[][] = [];
  render(
    <Probe onCommit={() => (atCommit = onMissing.mock.calls.slice())}>
      <StepDetails
        listingId={null}
        categoryId="c-1"
        categoryPath=""
        attributes={{}}
        definitions={[]}
        photoIds={[]}
        title=""
        description=""
        onChange={vi.fn()}
        refusals={[]}
        onMissing={onMissing}
      />
    </Probe>,
  );
  expect(atCommit).toEqual([[["title"]]]);
});
