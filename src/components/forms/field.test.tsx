import { render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/i18n", async (original) => {
  const real = await original<typeof import("@/i18n")>();
  const { en } = await import("@/i18n/locales/en");
  return {
    ...real,
    useI18n: () => ({
      t: (key: string) => (en as Record<string, string>)[key] ?? key,
      language: "en",
    }),
  };
});
import { DIALOG_FIELD } from "@/components/ui/dialog-look";
import { en } from "@/i18n/locales/en";

import { controlClass, stateBorder } from "./control-class";
import { Field } from "./field";
import { useFormGate, type FormGate } from "./use-form-gate";

const POSTING = {
  words: { required: "post.refusal.required" },
  generic: "post.refusal.unknown",
} as const;

describe("the one Field (DEC-339)", () => {
  it("FKF-1 the label names its control and says whether it is needed; nothing is described before a refusal", () => {
    render(
      <>
        <Field id="title" label="Title" required refusal={null}>
          {(control) => <input {...control} />}
        </Field>
        <Field id="note" label="Note" required={false} refusal={null}>
          {(control) => <input {...control} />}
        </Field>
      </>,
    );
    const title = screen.getByLabelText(/Title/);
    expect(title.id).toBe("title");
    expect(title.getAttribute("aria-required")).toBe("true");
    expect(title.getAttribute("aria-invalid")).toBeNull();
    expect(title.getAttribute("aria-describedby")).toBeNull();
    expect(screen.getByTestId("required-mark")).toBeTruthy();
    expect(screen.getByLabelText(/Note/).getAttribute("aria-required")).toBeNull();
    expect(screen.getByText(en["post.optional"])).toBeTruthy();
  });

  it("FKF-2 a refusal: the control is invalid and names the refusal and the hint; the words are the reader's", () => {
    render(
      <Field
        id="title"
        label="Title"
        required
        hint={<p>Short and plain</p>}
        refusal={{ field: "title", reason: "required" }}
        family={POSTING}
      >
        {(control) => <input {...control} />}
      </Field>,
    );
    const control = screen.getByLabelText(/Title/);
    const refusal = screen.getByTestId("form-field-refusal");
    expect(refusal.id).toBe("title-refusal");
    expect(refusal.getAttribute("role")).toBe("alert");
    expect(refusal.textContent).toBe(en["post.refusal.required"]);
    expect(control.getAttribute("aria-invalid")).toBe("true");
    expect(control.getAttribute("aria-describedby")).toBe("title-hint title-refusal");
    expect(document.getElementById("title-hint")?.textContent).toBe("Short and plain");
    expect(screen.getByTestId("form-field").getAttribute("data-refused")).toBe("1");
  });

  it("FKF-3 a refusal in words the reader does not know is the generic key, never the server's text", () => {
    const planted = 'duplicate key value violates unique constraint "listings_pkey"';
    render(
      <Field id="title" label="Title" required refusal={{ field: "title", reason: planted }}>
        {(control) => <input {...control} />}
      </Field>,
    );
    const refusal = screen.getByTestId("form-field-refusal");
    expect(refusal.textContent).toBe(en["common.error"]);
    expect(document.body.textContent).not.toContain("duplicate key");
  });

  it("FKF-4 a choice draws its refusal above the row and the control inside its label; inline says no 'Optional'", () => {
    render(
      <>
        <Field
          id="agree"
          label="I agree"
          required
          layout="choice"
          refusal={{ field: "agree", reason: "notTicked" }}
          family={{ words: { notTicked: "legal.agree.required" } }}
          testId="agree-box"
          refusalTestId="agree-message"
        >
          {(control) => <input type="checkbox" {...control} />}
        </Field>
        <Field id="soon" label="Take down" required={false} layout="inline" refusal={null}>
          {(control) => <input type="checkbox" {...control} />}
        </Field>
      </>,
    );
    const box = screen.getByTestId("agree-box");
    const message = screen.getByTestId("agree-message");
    expect(box.firstElementChild).toBe(message);
    expect(message.textContent).toBe(en["legal.agree.required"]);
    expect(screen.getByLabelText(/I agree/).closest("label")?.htmlFor).toBe("agree");
    expect(screen.queryByText(en["post.optional"])).toBeNull();
  });

  it("FKF-5 one class at two densities, with the three border states", () => {
    expect(controlClass(false)).toContain("min-h-11");
    expect(controlClass(false)).toContain("border-input");
    expect(controlClass(false, false, "dialog")).toContain("h-11");
    expect(controlClass(false, false, "dialog")).toContain("md:pointer-fine:h-9");
    expect(controlClass(false, false, "dialog")).toContain(DIALOG_FIELD);
    expect(controlClass(true)).toContain("ring-destructive");
    expect(controlClass(false, true)).toContain("border-destructive");
    expect(controlClass(false, true)).not.toContain("ring-destructive");
    expect(stateBorder(false)).toBe("");
  });

  it("FKF-6 a required blank answer is reported to the gate, and withdrawn when given or gone", () => {
    const seen: { gate: FormGate | null } = { gate: null };
    function Form({ value, shown }: { value: string; shown: boolean }) {
      const gate = useFormGate();
      seen.gate = gate;
      return shown ? (
        <Field id="title" label="Title" required refusal={null} gate={gate} blank={value === ""}>
          {(control) => <input {...control} value={value} readOnly />}
        </Field>
      ) : null;
    }
    const view = render(<Form value="" shown />);
    expect(seen.gate?.missing).toEqual(["title"]);
    view.rerender(<Form value="A bike" shown />);
    expect(seen.gate?.missing).toEqual([]);
    view.rerender(<Form value="" shown />);
    expect(seen.gate?.missing).toEqual(["title"]);
    view.rerender(<Form value="" shown={false} />);
    expect(seen.gate?.missing).toEqual([]);
  });

  it("FKF-7 the door's name and the control's id may differ: the gate hears the door's name", () => {
    let missing: readonly string[] = [];
    function Form() {
      const gate = useFormGate();
      missing = gate.missing;
      const [value] = useState("");
      return (
        <Field
          id="post-title"
          field="title"
          label="Title"
          required
          refusal={null}
          gate={gate}
          blank={value === ""}
        >
          {(control) => <input {...control} value={value} readOnly />}
        </Field>
      );
    }
    render(<Form />);
    expect(missing).toEqual(["title"]);
    expect(screen.getByLabelText(/Title/).id).toBe("post-title");
  });
});
