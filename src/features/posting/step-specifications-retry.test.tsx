import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { StepSpecifications } from "./step-specifications";

/** DEC-464 — the schema read's own Retry reads the schema again, never the page. */
const read = vi.hoisted(() => vi.fn());
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
vi.mock("./posting-service", () => ({ readPostingSchemaAnswer: read }));
vi.mock("./attribute-options", () => ({
  loadAttributeOptions: vi.fn(async () => []),
  findHeldOption: () => undefined,
  optionLabel: (option: { value: string }) => option.value,
}));

it("SPR-U1 Retry on a failed schema read asks for the schema again", async () => {
  read.mockReset();
  read.mockResolvedValueOnce({ schema: null, rateLimited: false }).mockResolvedValueOnce({
    schema: { attributes: [], category: null, plan: null },
    rateLimited: false,
  });
  render(<StepSpecifications categoryId="c-1" values={{}} refusals={[]} onChange={() => {}} />);
  fireEvent.click(await screen.findByTestId("post-specs-error-retry"));
  await waitFor(() => expect(read).toHaveBeenCalledTimes(2));
  await waitFor(() => expect(screen.queryByTestId("post-specs-error")).toBeNull());
});

it("SPR-U2 a rate refusal draws the rate words from the service's answer", async () => {
  read.mockReset();
  read.mockResolvedValueOnce({ schema: null, rateLimited: true });
  render(<StepSpecifications categoryId="c-2" values={{}} refusals={[]} onChange={() => {}} />);
  const box = await screen.findByTestId("post-specs-error");
  expect(box).toHaveAttribute("data-failure-reason", "rateLimited");
  expect(box).toHaveTextContent("failure.rateLimitedSoon");
});
