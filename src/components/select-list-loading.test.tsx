import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import type * as ListModule from "./select-list-body";

const loading = vi.hoisted(() => ({ load: vi.fn(), ready: vi.fn() }));
vi.mock("./select-list-loader", () => ({
  loadSelectList: loading.load,
  readySelectList: loading.ready,
}));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
import { SelectList } from "./select-list";
import { FieldSelect } from "./forms/field-select";

let finish: ((value: typeof ListModule | null) => void) | undefined;
beforeEach(() => {
  loading.ready.mockReset();
  loading.ready.mockReturnValue(null);
  loading.load.mockReset();
  const pending = new Promise<typeof ListModule | null>((resolve) => {
    finish = resolve;
  });
  loading.load.mockReturnValue(pending);
});
const options = [
  { value: "a", label: "A" },
  { value: "b", label: "B" },
];
function draw() {
  const answer = vi.fn();
  render(
    <SelectList
      id="cold"
      testId="cold"
      options={options}
      value={[]}
      onChange={answer}
      placeholder="Choose"
      searchLabel="Search"
      noneLabel="None"
    />,
  );
  return answer;
}
it("LSP-U6 the closed line never loads the list without hover, focus or press intent", () => {
  draw();
  expect(loading.load).not.toHaveBeenCalled();
  expect(screen.queryByRole("listbox")).toBeNull();
  fireEvent.mouseEnter(screen.getByTestId("cold"));
  expect(loading.load).toHaveBeenCalledTimes(1);
  expect(screen.queryByRole("listbox")).toBeNull();
});
it("LSP-U7 a key-opened list reserves one busy row, then highlights and picks its first row", async () => {
  const answer = draw();
  fireEvent.keyDown(screen.getByTestId("cold"), { key: "ArrowDown" });
  expect(screen.getByTestId("cold-loading")).toHaveAttribute("aria-busy", "true");
  expect(screen.queryByRole("listbox")).toBeNull();
  const real = await import("./select-list-body");
  await act(async () => {
    finish?.(real);
  });
  expect(screen.queryByTestId("cold-loading")).toBeNull();
  expect(screen.getByTestId("cold-list")).toBeInTheDocument();
  fireEvent.keyDown(screen.getByTestId("cold"), { key: "Enter" });
  expect(answer).toHaveBeenCalledWith(["a"]);
});
it("LSP-U8 focus warms without opening, and Escape dismisses a still-loading list", () => {
  draw();
  fireEvent.focus(screen.getByTestId("cold"));
  expect(loading.load).toHaveBeenCalledTimes(1);
  expect(screen.queryByTestId("cold-loading")).toBeNull();
  fireEvent.click(screen.getByTestId("cold"));
  fireEvent.keyDown(screen.getByTestId("cold"), { key: "Escape" });
  expect(screen.queryByTestId("cold-loading")).toBeNull();
});
it("FSL-U4 the form line keeps its own marks without fetching open-list code", async () => {
  render(
    <FieldSelect
      id="form-cold"
      field="codes"
      label="Codes"
      required
      refusal={{ field: "codes", reason: "required" }}
      options={options}
      value={[]}
      onChange={vi.fn()}
    />,
  );
  expect(loading.load).not.toHaveBeenCalled();
  expect(screen.getByTestId("form-cold")).toHaveAttribute("aria-invalid", "true");
  fireEvent.click(screen.getByTestId("form-cold"));
  expect(screen.getByTestId("form-cold-loading")).toHaveAttribute("aria-busy", "true");
  const real = await import("./select-list-body");
  await act(async () => {
    finish?.(real);
  });
  expect(screen.getByTestId("form-cold-list")).toBeInTheDocument();
});
