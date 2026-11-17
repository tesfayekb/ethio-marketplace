/** INC-1192 — a signed-out Save returns through sign-in with `#save`; the signed-in arrival saves once. */
export type SaveIntentStep = "save" | "clear" | "wait" | "none";

export function saveIntentStep(input: {
  hash: string;
  pending: boolean;
  viewer: "unknown" | "signedOut" | "signedIn";
  saved: boolean | null;
  busy: boolean;
}): SaveIntentStep {
  const { hash, pending, viewer, saved, busy } = input;
  if (viewer === "unknown") return hash === "#save" || pending ? "wait" : "none";
  if (viewer === "signedOut") return "none";
  if (hash === "#save") return "clear";
  if (!pending) return "none";
  if (saved === null || busy) return "wait";
  return saved ? "none" : "save";
}
