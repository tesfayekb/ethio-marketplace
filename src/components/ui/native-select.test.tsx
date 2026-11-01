import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DIALOG_FIELD } from "./dialog-look";
import { NativeSelect } from "./native-select";

/**
 * Turn S6-2 — the one native select's two looks: the shared closed control (pressed in inside a
 * panel) and the posting form kit's, which the step passes whole.
 */
function classesOf(element: HTMLElement): Set<string> {
  return new Set(element.className.split(/\s+/).filter(Boolean));
}

describe("NativeSelect (turn S6-2)", () => {
  it("NSL-U1 the control look is the default: the size rule, the field fill inside a panel, the caller's layout", () => {
    render(
      <NativeSelect data-testid="s" className="w-full">
        <option value="">x</option>
      </NativeSelect>,
    );
    const have = classesOf(screen.getByTestId("s"));
    for (const cls of ["h-11", "md:pointer-fine:h-9", "border-input", "bg-card", "w-full"])
      expect(have.has(cls), cls).toBe(true);
    for (const cls of DIALOG_FIELD.split(/\s+/)) expect(have.has(cls), cls).toBe(true);
  });

  it("NSL-U2 the form look draws the caller's class whole and none of the control look", () => {
    const form =
      "min-h-11 w-full rounded-md border bg-background px-3 text-base border-destructive";
    const ref = createRef<HTMLSelectElement>();
    render(
      <NativeSelect
        ref={ref}
        look="form"
        id="post-x"
        data-testid="s"
        className={form}
        aria-invalid
        disabled
      >
        <option value="">x</option>
      </NativeSelect>,
    );
    const select = screen.getByTestId("s");
    expect(select.className).toBe(form);
    for (const cls of ["shadow-xs", "disabled:opacity-50", "bg-card", "md:pointer-fine:h-9"])
      expect(classesOf(select).has(cls), cls).toBe(false);
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toHaveAttribute("id", "post-x");
    expect(select).toBeDisabled();
    expect(ref.current).toBe(select);
  });
});
