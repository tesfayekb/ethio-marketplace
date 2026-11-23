import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Switch } from "./switch";

const thumbOf = (control: HTMLElement) => control.querySelector("span");

describe("the one switch", () => {
  it("SW-U1 the checked thumb travels the reading direction: rtl moves it the other way, ltr is unchanged", () => {
    render(
      <div dir="rtl">
        <Switch aria-label="On" checked onCheckedChange={() => {}} />
      </div>,
    );
    const thumb = thumbOf(screen.getByRole("switch", { name: "On" }));
    const classes = thumb?.className.split(/\s+/) ?? [];
    expect(classes).toContain("rtl:data-[state=checked]:-translate-x-4");
    expect(classes).toContain("data-[state=checked]:translate-x-4");
    expect(classes).toContain("data-[state=unchecked]:translate-x-0");
    expect(classes.filter((name) => name.startsWith("rtl:"))).toEqual([
      "rtl:data-[state=checked]:-translate-x-4",
    ]);
    expect(thumb?.getAttribute("data-state")).toBe("checked");
  });
});
