import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

/**
 * Turn S6-3 (row 48) — the popover's facade: the trigger is the consumer's own element from the
 * first render, with the closed state's attributes; the first click is replayed on that element
 * once Radix's popover is here (src/test/setup.ts holds the module, as a page after its idle
 * download), and the consumer's own click handler hears the person's click once.
 */
function Panel({ onClick }: { onClick?: (event: React.MouseEvent) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button data-testid="p-trigger" onClick={onClick}>
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent data-testid="p-panel" variant="panel">
        <p data-testid="p-body">body</p>
      </PopoverContent>
    </Popover>
  );
}

describe("the popover's facade (turn S6-3)", () => {
  it("OVF-23 the server and the first render draw the closed trigger alone, with the closed state's attributes", () => {
    const html = renderToString(<Panel />);
    expect(html).toContain('aria-haspopup="dialog"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('data-state="closed"');
    expect(html).not.toContain("body");
    render(<Panel />);
    expect(screen.queryByTestId("p-panel")).toBeNull();
    expect(screen.getByTestId("p-trigger")).toHaveAttribute("type", "button");
  });

  it("OVF-24 the first click opens the real popover on the same element; the consumer's click is heard once; Escape closes it", () => {
    const heard = vi.fn();
    render(<Panel onClick={heard} />);
    const trigger = screen.getByTestId("p-trigger");
    fireEvent.click(trigger);
    expect(screen.getByTestId("p-body")).toBeInTheDocument();
    expect(screen.getByTestId("p-trigger")).toBe(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(heard).toHaveBeenCalledTimes(1);
    const panel = screen.getByTestId("p-panel");
    expect(panel).toHaveAttribute("data-dialog-panel", "");
    expect(trigger).toHaveAttribute("aria-controls", panel.id);
    fireEvent.keyDown(panel, { key: "Escape" });
    expect(screen.queryByTestId("p-panel")).toBeNull();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    expect(screen.getByTestId("p-panel")).toBeInTheDocument();
    expect(heard).toHaveBeenCalledTimes(2);
  });

  it("OVF-25 a click the consumer prevented opens nothing, as on Radix's trigger", () => {
    render(<Panel onClick={(event) => event.preventDefault()} />);
    fireEvent.click(screen.getByTestId("p-trigger"));
    expect(screen.queryByTestId("p-panel")).toBeNull();
    expect(screen.getByTestId("p-trigger")).toHaveAttribute("aria-expanded", "false");
  });

  it("OVF-26 a controlled popover: the trigger asks its owner, the owner's open draws it, the owner's close removes it", () => {
    const asked = vi.fn();
    function Owned() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" data-testid="owner-open" onClick={() => setOpen(true)} />
          <Popover
            open={open}
            onOpenChange={(next) => {
              asked(next);
              setOpen(next);
            }}
          >
            <PopoverTrigger asChild>
              <Button data-testid="p-trigger">Filters</Button>
            </PopoverTrigger>
            <PopoverContent data-testid="p-panel">x</PopoverContent>
          </Popover>
        </>
      );
    }
    render(<Owned />);
    fireEvent.click(screen.getByTestId("p-trigger"));
    expect(asked).toHaveBeenLastCalledWith(true);
    expect(screen.getByTestId("p-panel")).toBeInTheDocument();
    fireEvent.keyDown(screen.getByTestId("p-panel"), { key: "Escape" });
    expect(asked).toHaveBeenLastCalledWith(false);
    expect(screen.queryByTestId("p-panel")).toBeNull();
    fireEvent.click(screen.getByTestId("owner-open"));
    expect(screen.getByTestId("p-panel")).toBeInTheDocument();
  });
});
