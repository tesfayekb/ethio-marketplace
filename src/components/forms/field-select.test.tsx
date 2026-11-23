import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
import { FieldSelect } from "./field-select";
import { useFormGate } from "./use-form-gate";
const options = [
  { value: "a", label: "A" },
  { value: "b", label: "B" },
];
describe("the form select", () => {
  it("FSL-U1 id stays distinct from the door field; a blank required answer holds the door", async () => {
    const send = vi.fn();
    function Fixture() {
      const [value, setValue] = useState<string[]>([]);
      const gate = useFormGate();
      return (
        <>
          <FieldSelect
            id="control"
            field="codes"
            label="Codes"
            required
            gate={gate}
            refusal={gate.marks.find((mark) => mark.field === "codes") ?? null}
            options={options}
            value={value}
            onChange={setValue}
          />
          <button
            onClick={() => {
              if (gate.try()) send(value);
            }}
          >
            Save
          </button>
        </>
      );
    }
    render(<Fixture />);
    fireEvent.click(screen.getByText("Save"));
    expect(send).not.toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.getByTestId("control")).toHaveAttribute("aria-invalid", "true"),
    );
    expect(screen.getByTestId("control")).toHaveAttribute("aria-describedby", "control-refusal");
    fireEvent.click(screen.getByTestId("control"));
    fireEvent.click(screen.getByTestId("control-b"));
    fireEvent.click(screen.getByText("Save"));
    expect(send).toHaveBeenCalledWith(["b"]);
  });
  it.each(["loading", "failed"] as const)(
    "FSL-U2 %s says the form's own words and cannot open",
    (state) => {
      render(
        <FieldSelect
          id="control"
          field="codes"
          label="Codes"
          required={false}
          refusal={null}
          options={options}
          value={["a"]}
          onChange={vi.fn()}
          state={state}
          loadingLabel="Loading codes"
          failedLabel="Codes failed"
        />,
      );
      expect(screen.getByTestId("control")).toBeDisabled();
      expect(screen.getByTestId("control")).toHaveTextContent(
        state === "loading" ? "Loading codes" : "Codes failed",
      );
      fireEvent.click(screen.getByTestId("control"));
      expect(screen.queryByTestId("control-list")).toBeNull();
    },
  );
});

it("FSL-U3 the form line shows a count only for several answers, and permits the full data set", () => {
  function Fixture() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <FieldSelect
        id="control"
        field="codes"
        label="Codes"
        required={false}
        refusal={null}
        multiple
        options={options}
        value={value}
        onChange={setValue}
      />
    );
  }
  render(<Fixture />);
  fireEvent.click(screen.getByTestId("control"));
  fireEvent.click(screen.getByTestId("control-a"));
  expect(screen.queryByTestId("control-count")).toBeNull();
  fireEvent.click(screen.getByTestId("control-b"));
  expect(screen.getByTestId("control-count")).toBeInTheDocument();
  expect(screen.getByTestId("control-a")).toHaveAttribute("aria-selected", "true");
  expect(screen.getByTestId("control-b")).toHaveAttribute("aria-selected", "true");
});
