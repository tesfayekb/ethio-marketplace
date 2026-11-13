import * as React from "react";

import { pressTarget } from "@/lib/press";

/**
 * INC-1130 (the app-fixes turn, part C) — EVERY PANEL GIVES THE FOCUS BACK TO ITS OPENER (WCAG
 * 2.4.3): the dialog, the sheet and the alert dialog alike, whatever their size and however they
 * were opened. Radix returns the focus only to a trigger of its own (`aria-controls` naming the
 * panel); a panel opened from state has none, so the focus fell to the page. The opener is the
 * control that held the focus when the panel opened, or the control the opening press landed on
 * (INC-1126). It is left to the library when it is the panel's own trigger, to the owner when the
 * owner's `onCloseAutoFocus` prevented the default, and to the default when it has left the page.
 */

/**
 * INC-1126 — the press that may open a panel. Safari leaves the focus on the page (or on the
 * focusable box around the control) after a click, so the opener is then the control the press
 * landed on, as press.ts names it (`pressTarget`); press.ts's own mark ends at the pointer's
 * release, before the click opens anything. The next press or key ends the gesture; an opening
 * takes the record and empties it.
 */
let pressed: HTMLElement | null = null;
let hearingPresses = false;

function hearPresses(doc: Document) {
  if (hearingPresses) return;
  hearingPresses = true;
  doc.addEventListener(
    "pointerdown",
    (event) => {
      const control = pressTarget(event.target);
      pressed = control instanceof HTMLElement ? control : null;
    },
    true,
  );
  doc.addEventListener(
    "keydown",
    () => {
      pressed = null;
    },
    true,
  );
}

// From the module's first evaluation: a panel mounted only on its opening (`<Dialog open>`) is
// opened by a press that came before any panel's own effect could hear it.
if (typeof document !== "undefined") hearPresses(document);

/** What held the focus when a panel opened, or the gesture's press when the focus sat around it. */
function openerOf(held: Element | null): HTMLElement | null {
  const press = pressed;
  pressed = null;
  const page = held === null || held === held.ownerDocument.body;
  const around = held !== null && held !== press && press !== null && held.contains(press);
  if (press !== null && press.isConnected && (page || around)) return press;
  return held instanceof HTMLElement ? held : null;
}

/** The panel's own library trigger: Radix names the panel it controls in `aria-controls`. */
function isTriggerOf(control: HTMLElement, panel: HTMLElement): boolean {
  return panel.id !== "" && control.getAttribute("aria-controls") === panel.id;
}

export type OpenerFocus = {
  /** In the panel's onOpenAutoFocus, before the owner's: records the opener. */
  opened: (event: Event) => void;
  /** In the panel's onCloseAutoFocus, after the owner's: gives the focus back to the opener. */
  closed: (event: Event) => void;
};

/** One panel's opener, recorded when it opens and given the focus when it closes. */
export function useOpenerFocus(): OpenerFocus {
  const opener = React.useRef<HTMLElement | null>(null);
  return React.useMemo(
    () => ({
      opened: (event) => {
        const panel = event.target;
        if (!(panel instanceof HTMLElement)) return;
        const held = openerOf(panel.ownerDocument.activeElement);
        opener.current = held !== null && !isTriggerOf(held, panel) ? held : null;
      },
      closed: (event) => {
        const back = opener.current;
        opener.current = null;
        if (event.defaultPrevented || back === null || !back.isConnected) return;
        if (back === back.ownerDocument.body) return;
        event.preventDefault();
        back.focus({ preventScroll: true });
      },
    }),
    [],
  );
}
