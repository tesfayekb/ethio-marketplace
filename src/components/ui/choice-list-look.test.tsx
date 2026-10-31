import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  LIST_PANEL,
  LIST_ROW,
  LIST_ROW_CURRENT,
  LIST_SURFACE,
  LIST_TICK,
  OPEN_CONTROL,
} from "@/components/shell/menu-row";
import { PickerOption, pickerPopClass } from "@/components/searchable-picker";

/** D264 (Foundations turn F): the open list's one look, read from menu-row.ts. */
describe("CL-U — every open list reads menu-row.ts's constants", () => {
  it("CL-U1: the row is 44 px to tap, 40 px on a fine pointer, 10 px radius, one line", () => {
    for (const cls of ["min-h-11", "md:pointer-fine:h-10", "rounded-list-row", "whitespace-nowrap"])
      expect(LIST_ROW.split(" ")).toContain(cls);
  });
  it("CL-U2: the current row and the open control take the shell's selected look", () => {
    expect(LIST_ROW_CURRENT).toContain("bg-nav-pill");
    expect(LIST_ROW_CURRENT).toContain("text-nav-ink");
    expect(LIST_TICK).toContain("text-nav-ink");
    expect(OPEN_CONTROL).toContain("data-[state=open]:bg-nav-pill");
  });
  it("CL-U3: the panel is the menu surface — no border, no zoom", () => {
    for (const cls of ["bg-popover", "rounded-menu", "p-1.5", "shadow-menu"])
      expect(LIST_SURFACE.split(" ")).toContain(cls);
    expect(LIST_PANEL).not.toMatch(/\bborder\b|zoom-/);
    expect(LIST_PANEL).toContain("max-w-[calc(100vw-2rem)]");
  });
  it("CL-U4: the facade's impl defaults — sideOffset 0, align start, the trigger-width minimum", () => {
    const impl = readFileSync("src/components/ui/dropdown-menu-impl.tsx", "utf8");
    expect(impl).toContain('sideOffset = 0, align = "start"');
    expect(impl).toContain("min-w-[var(--radix-dropdown-menu-trigger-width)]");
    // DEC-259: only overlays-impl may reach the impl by value, so its classes are read
    // from its source: the content and every row part start from the constants.
    expect(impl.match(/\bLIST_PANEL,/g)?.length).toBe(2);
    expect(impl.match(/\bLIST_ROW,/g)?.length).toBe(4);
    expect(impl).not.toMatch(/zoom-|rounded-sm|py-1\.5|\bborder\b/);
  });
  it("CL-U5: the picker's rows and panel come from the constants, against the box's edge", () => {
    render(
      <PickerOption selected highlighted={false} testId="opt" data={{}} onPick={() => {}}>
        x
      </PickerOption>,
    );
    const row = screen.getByTestId("opt").className;
    for (const cls of [...LIST_ROW.split(" "), ...LIST_ROW_CURRENT.split(" ")])
      expect(row).toContain(cls);
    expect(pickerPopClass("down")).toContain("top-full");
    expect(pickerPopClass("down")).not.toMatch(/\bmt-1\b/);
    expect(pickerPopClass("up")).not.toMatch(/\bmb-1\b/);
    expect(pickerPopClass("down")).toContain(LIST_SURFACE);
  });
});
