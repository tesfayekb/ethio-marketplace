import { DIALOG_FIELD } from "@/components/ui/dialog-look";

/**
 * DEC-339 — THE ONE LOOK of a control a person answers in, at two densities:
 * `form` (a page's form: 44 px and up, 16 px text) and `dialog` (a dialog, a
 * sheet or the filter panel: 44 px, 36 px on a fine pointer from md, pressed in
 * by `DIALOG_FIELD`). Nothing else draws a field's frame (CF-FORM-5).
 */
export type FieldDensity = "form" | "dialog";

const FIELD_LOOK: Record<FieldDensity, string> = {
  form:
    "min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground " +
    "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-ring",
  dialog:
    "h-11 md:pointer-fine:h-9 w-full rounded-md border bg-background px-3 text-base md:text-sm " +
    "text-foreground placeholder:text-muted-foreground focus-visible:outline-none " +
    `focus-visible:ring-1 focus-visible:ring-ring ${DIALOG_FIELD}`,
};

/**
 * The border a control wears — U6-C1-R2, THREE STATES, NOT TWO. A refused
 * control wears the full destructive border and its ring (the door or the gate
 * has spoken); a REQUIRED control that is still EMPTY wears the destructive
 * border from the start (INC-355), so the person sees which answers the form
 * still waits for without the screen claiming a refusal nobody made (F4); any
 * other control keeps its own. Empty for that last case, so a tick or a switch
 * keeps its primitive's border.
 */
export function stateBorder(refused: boolean, soft = false): string {
  if (refused) return "border-destructive ring-1 ring-destructive";
  return soft ? "border-destructive" : "";
}

/** A text field's, a text area's or a select's whole class. */
export function controlClass(
  refused: boolean,
  soft = false,
  density: FieldDensity = "form",
): string {
  return `${FIELD_LOOK[density]} ${stateBorder(refused, soft) || "border-input"}`;
}
