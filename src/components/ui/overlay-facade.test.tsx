import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

/**
 * DEC-259 (Foundations turn 31) — the overlay facades: the trigger is the
 * consumer's own element from the first render, the real primitive answers the
 * first intent on that same element, and nothing else changes for the person.
 * The module is already here (src/test/setup.ts), as on a page after its idle
 * download; overlay-facade-failure.test.tsx covers a failed download.
 */
function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button data-testid="menu-trigger">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent data-testid="menu">
        <DropdownMenuItem data-testid="item-1">One</DropdownMenuItem>
        <DropdownMenuItem data-testid="item-2">Two</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Tip() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button data-testid="tip-trigger">Save</Button>
        </TooltipTrigger>
        <TooltipContent>Save the listing</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

describe("the overlay facades (DEC-259)", () => {
  it("OVF-1 the server and the first render draw the closed trigger alone, with the closed state's attributes", () => {
    const menu = renderToString(<Menu />);
    expect(menu).toContain('aria-haspopup="menu"');
    expect(menu).toContain('aria-expanded="false"');
    expect(menu).toContain('data-state="closed"');
    expect(menu).not.toContain("One");
    expect(menu).not.toContain("radix-");
    const tip = renderToString(<Tip />);
    expect(tip).toContain('data-state="closed"');
    expect(tip).not.toContain("Save the listing");
    render(<Menu />);
    expect(screen.queryByTestId("menu")).toBeNull();
    expect(screen.getByTestId("menu-trigger")).toHaveAttribute("aria-expanded", "false");
  });

  it("OVF-2 the first press opens the real menu on the same element; Escape closes it and gives focus back to that element", async () => {
    render(<Menu />);
    const trigger = screen.getByTestId("menu-trigger");
    fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
    expect(screen.getByTestId("menu")).toBeInTheDocument();
    expect(screen.getByTestId("menu-trigger")).toBe(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("menu")).toHaveAttribute("aria-labelledby", trigger.id);
    fireEvent.keyDown(screen.getByTestId("menu"), { key: "Escape" });
    expect(screen.queryByTestId("menu")).toBeNull();
    // Radix gives the focus back on its focus scope's next task.
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("OVF-3 the first Enter opens the menu with its first item focused, as a keyboard opening does", () => {
    render(<Menu />);
    const trigger = screen.getByTestId("menu-trigger");
    act(() => trigger.focus());
    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(screen.getByTestId("menu")).toBeInTheDocument();
    expect(screen.getByTestId("item-1")).toHaveFocus();
  });

  it("OVF-4 the first hover opens the tooltip on the same element", async () => {
    render(<Tip />);
    const trigger = screen.getByTestId("tip-trigger");
    fireEvent.pointerEnter(trigger, { pointerType: "mouse" });
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Save the listing");
    expect(screen.getByTestId("tip-trigger")).toBe(trigger);
    fireEvent.pointerLeave(trigger, { pointerType: "mouse" });
  });

  it("OVF-5 the first keyboard focus opens the tooltip; a press's focus does not", async () => {
    const { unmount } = render(<Tip />);
    const trigger = screen.getByTestId("tip-trigger");
    act(() => trigger.focus());
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Save the listing");
    unmount();

    render(<Tip />);
    const pressed = screen.getByTestId("tip-trigger");
    fireEvent.pointerDown(pressed, { button: 0, pointerType: "mouse" });
    act(() => pressed.focus());
    expect(screen.queryByRole("tooltip")).toBeNull();
    expect(pressed).toHaveAttribute("data-state", "closed");
  });

  it("OVF-6 a touch on a tooltip's trigger asks for nothing and its click still lands", () => {
    let clicks = 0;
    render(
      <Tooltip>
        <TooltipTrigger asChild>
          <Button data-testid="touch-trigger" onClick={() => (clicks += 1)}>
            Go
          </Button>
        </TooltipTrigger>
        <TooltipContent>Go there</TooltipContent>
      </Tooltip>,
    );
    const trigger = screen.getByTestId("touch-trigger");
    fireEvent.pointerEnter(trigger, { pointerType: "touch" });
    fireEvent.pointerDown(trigger, { button: 0, pointerType: "touch" });
    fireEvent.click(trigger);
    expect(clicks).toBe(1);
    expect(screen.getByTestId("touch-trigger")).toBe(trigger);
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("OVF-7 a tooltip on a menu's trigger: both answer on the one element", async () => {
    render(
      <DropdownMenu modal={false}>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button data-testid="both">More</Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>More actions</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent data-testid="both-menu">
          <DropdownMenuItem>Copy</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    const trigger = screen.getByTestId("both");
    fireEvent.pointerEnter(trigger, { pointerType: "mouse" });
    expect(await screen.findByRole("tooltip")).toHaveTextContent("More actions");
    fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
    expect(screen.getByTestId("both-menu")).toBeInTheDocument();
    expect(screen.getByTestId("both")).toBe(trigger);
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
  });

  it("OVF-10 a menu its owner opens is drawn once the module is here, with no intent", async () => {
    render(
      <DropdownMenu open onOpenChange={() => undefined}>
        <DropdownMenuTrigger asChild>
          <Button data-testid="owned-trigger">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent data-testid="owned-menu">
          <DropdownMenuItem>One</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(await screen.findByTestId("owned-menu")).toBeInTheDocument();
    expect(screen.getByTestId("owned-trigger")).toHaveAttribute("aria-expanded", "true");
  });

  it("OVF-8 content that changes after the menu is real is drawn as given", () => {
    function Live({ label }: { label: string }) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button data-testid="live-trigger">Open</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent data-testid="live-menu">
            <DropdownMenuItem>{label}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    const { rerender } = render(<Live label="First" />);
    fireEvent.pointerDown(screen.getByTestId("live-trigger"), {
      button: 0,
      ctrlKey: false,
      pointerType: "mouse",
    });
    expect(screen.getByTestId("live-menu")).toHaveTextContent("First");
    rerender(<Live label="Second" />);
    expect(screen.getByTestId("live-menu")).toHaveTextContent("Second");
  });
});
