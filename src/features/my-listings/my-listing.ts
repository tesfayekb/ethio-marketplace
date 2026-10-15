import type { Refusal } from "@/features/posting/types";
import type { MessageKey } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { ownValue } from "@/lib/own-key";

import {
  LISTING_GROUPS,
  parseRow,
  type ListingGroup,
  type MyListingRow,
  type SoldWord,
} from "./my-listings";

/**
 * Bundle 16 turn 3 — ONE OF THE SELLER'S ADS, its history and its actions (D138;
 * D173–D176; docs/features/my-listings.md, "One ad's page").
 *
 * The read is one door, `my_listing(id)`: the same row as the list (the door's
 * proof P5 holds the two equal), its group, the status a closed ad reopens to, its
 * country and the admin's renew setting. "Not yours" and "not there" are one
 * answer. The history is `listing_history(id)` (who: you, staff or the system —
 * never a staff member's name). The actions are the doors of turn 1; each one
 * re-checks everything (F3), so the buttons offered here are a convenience, never
 * the rule: a refusal comes back in words and the page reloads the ad.
 */

export interface MyListing {
  listing: MyListingRow;
  group: ListingGroup;
  /** The live status a closed ad reopens to; null for any other ad. */
  resumeStatus: "active" | "reduced" | null;
  countryCode: string | null;
  /** D174 3, D175 2 — the admin's renew setting. */
  renewAllowed: boolean;
  renewDays: number | null;
}

type Rec = Record<string, unknown>;

function isObject(value: unknown): value is Rec {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function isStrOrNull(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

/** The door's answer, or null on any mismatch (F4). */
export function parseMyListing(value: unknown): MyListing | null {
  if (!isObject(value)) return null;
  const listing = parseRow(value.listing);
  if (listing === null) return null;
  const group = LISTING_GROUPS.find((entry) => entry === value.group);
  if (group === undefined) return null;
  const resume = value.resumeStatus;
  if (!(resume === null || resume === "active" || resume === "reduced")) return null;
  if (!isStrOrNull(value.countryCode) || typeof value.renewAllowed !== "boolean") return null;
  const days = value.renewDays;
  if (!(days === null || (typeof days === "number" && Number.isInteger(days) && days > 0)))
    return null;
  return {
    listing,
    group,
    resumeStatus: resume,
    countryCode: value.countryCode,
    renewAllowed: value.renewAllowed,
    renewDays: days,
  };
}

/**
 * The ad, as its seller; `"notYours"` when the door says the ad is not the
 * caller's (or does not exist). Any other failure, and a malformed answer, throws.
 */
export async function readMyListing(listingId: string): Promise<MyListing | "notYours"> {
  const { data, error } = await supabase.rpc("my_listing", { p_listing_id: listingId });
  if (error) {
    if (error.message.includes("not your listing")) return "notYours";
    throw new Error(error.message);
  }
  const parsed = parseMyListing(data);
  if (parsed === null) throw new Error("my_listing: malformed answer");
  return parsed;
}

/** One line of the ad's history, newest first. */
export interface HistoryLine {
  at: string;
  kind: string;
  by: "you" | "staff" | "system";
  /** A status change's statuses; null when the line changed no status. */
  from: string | null;
  to: string | null;
  /** A Reserved change's new value; null when the line is not one. */
  reserved: boolean | null;
  /** The names of the other fields the change touched. */
  fields: string[];
  /** A staff change's reason (an `admin.listings.reason.*` word) and note. */
  reason: string | null;
  note: string | null;
}

function parseLine(value: unknown): HistoryLine | null {
  if (!isObject(value)) return null;
  const v = value;
  if (typeof v.at !== "string" || typeof v.kind !== "string") return null;
  if (v.by !== "you" && v.by !== "staff" && v.by !== "system") return null;
  if (!isStrOrNull(v.from) || !isStrOrNull(v.to)) return null;
  if (!(v.reserved === null || typeof v.reserved === "boolean")) return null;
  if (!Array.isArray(v.fields) || !v.fields.every((field) => typeof field === "string"))
    return null;
  if (!isStrOrNull(v.reason) || !isStrOrNull(v.note)) return null;
  return {
    at: v.at,
    kind: v.kind,
    by: v.by,
    from: v.from,
    to: v.to,
    reserved: v.reserved,
    fields: v.fields as string[],
    reason: v.reason,
    note: v.note,
  };
}

/** The door's answer, or null on any mismatch (F4). */
export function parseHistory(value: unknown): HistoryLine[] | null {
  if (!Array.isArray(value)) return null;
  const lines: HistoryLine[] = [];
  for (const entry of value) {
    const line = parseLine(entry);
    if (line === null) return null;
    lines.push(line);
  }
  return lines;
}

export async function readHistory(listingId: string): Promise<HistoryLine[]> {
  const { data, error } = await supabase.rpc("listing_history", { p_listing_id: listingId });
  if (error) throw new Error(error.message);
  const lines = parseHistory(data);
  if (lines === null) throw new Error("listing_history: malformed answer");
  return lines;
}

/** The seller's one-tap actions (D173, D174). */
export type ListingAction =
  | "reserve"
  | "unreserve"
  | "sell"
  | "close"
  | "reopen"
  | "renew"
  | "delete";

/**
 * The actions an ad offers, in the order the page shows them: a live ad —
 * Reserved on or off, Mark as sold, No longer available; a closed ad — Reopen,
 * Mark as sold; an expired ad — Renew, when the admin allows it. Turn 3b (call
 * F): every ad but a removed one can also be deleted, last — a draft, an ad in
 * review (it waits for its answer otherwise, call G), a refused or a sold one
 * included. Editing comes with the edit boxes.
 *
 * Bundle 16 turn R1 (D181) — ONE rule for the ad's page (`actionsFor`, from
 * `my_listing`) and for each row of My listings (`rowActionsFor`, from
 * `my_listings`), so the two never offer different things.
 */
export function offerFor(
  status: string,
  reserved: boolean,
  canReopen: boolean,
  renewAllowed: boolean,
): ListingAction[] {
  switch (status) {
    case "active":
    case "reduced":
      return [reserved ? "unreserve" : "reserve", "sell", "close", "delete"];
    case "closed":
      return canReopen ? ["reopen", "sell", "delete"] : ["sell", "delete"];
    case "expired":
      return renewAllowed ? ["renew", "delete"] : ["delete"];
    case "removed":
      return [];
    default:
      return ["delete"];
  }
}

export function actionsFor(ad: MyListing): ListingAction[] {
  return offerFor(
    ad.listing.status,
    ad.listing.reserved,
    ad.resumeStatus !== null,
    ad.renewAllowed,
  );
}

/**
 * Turn R1 — what a row of My listings offers: what its ad's page offers. The list
 * does not carry the status a closed ad reopens to (closing records it, so a closed
 * ad holds one); Reopen is offered, and `runListAction` reads the ad again first.
 */
export function rowActionsFor(row: MyListingRow, renewAllowed: boolean): ListingAction[] {
  return offerFor(row.status, row.reserved, true, renewAllowed);
}

/** Turn R1 — the ad's main next step, drawn filled on its page: Reopen, Renew, then Mark as sold. */
export function primaryAction(actions: ListingAction[]): ListingAction | null {
  for (const action of ["reopen", "renew", "sell"] as const) {
    if (actions.includes(action)) return action;
  }
  return null;
}

/** The actions that cannot be undone ask first. */
export const ASKS_FIRST: ReadonlySet<ListingAction> = new Set<ListingAction>(["sell", "delete"]);

/** The door's refusal, in the seller's words. */
export function actionErrorKey(message: string): MessageKey {
  if (message.includes("rateLimited")) return "myListings.error.rateLimited";
  // Bundle 16 turn R2 — the edit's and the copy's own refusals.
  if (message.includes("nothing changed") || message.includes("nothing to change"))
    return "myListings.editBox.nothing";
  if (message.includes("an ad in review is edited")) return "myListings.ad.waiting";
  if (message.includes("residencyUnknown")) return "post.refusal.residencyUnknown";
  if (message.includes("account is deactivated")) return "myListings.error.deactivated";
  if (message.includes("renewOff")) return "myListings.renewOff";
  if (message.includes("removed by enforcement only")) return "myListings.error.severe";
  if (message.includes("not your listing") || message.includes("listing not found"))
    return "myListings.error.notYours";
  if (
    message.includes("illegal transition") ||
    message.includes("only a live listing") ||
    message.includes("owner only") ||
    message.includes("renewNeedsExpired")
  )
    return "myListings.error.changed";
  return "myListings.error.failed";
}

export type ActionOutcome = { ok: true } | { ok: false; key: MessageKey };

/** The renew door answers its refusals in its body, not as an error. */
function refusalOf(data: unknown): string | null {
  if (!isObject(data) || data.ok !== false) return null;
  const first = Array.isArray(data.refusals) ? data.refusals[0] : undefined;
  return isObject(first) && typeof first.reason === "string" ? first.reason : "failed";
}

/** One action, through its door, as the signed-in seller. */
export async function runAction(ad: MyListing, action: ListingAction): Promise<ActionOutcome> {
  const id = ad.listing.id;
  let result: { data: unknown; error: { message: string } | null };
  switch (action) {
    case "reserve":
    case "unreserve":
      result = await supabase.rpc("set_listing_reserved", {
        p_listing_id: id,
        p_reserved: action === "reserve",
      });
      break;
    case "sell":
      result = await supabase.rpc("mark_sold", { p_listing_id: id });
      break;
    case "close":
      result = await supabase.rpc("transition_listing", {
        p_listing_id: id,
        p_new_status: "closed",
      });
      break;
    case "reopen":
      if (ad.resumeStatus === null) return { ok: false, key: "myListings.error.changed" };
      result = await supabase.rpc("transition_listing", {
        p_listing_id: id,
        p_new_status: ad.resumeStatus,
      });
      break;
    case "renew":
      result = await supabase.rpc("renew_listing", { p_listing_id: id });
      break;
    case "delete":
      // Turn 3b (call F) — deleted by its owner: it leaves My listings; the record stays.
      result = await supabase.rpc("transition_listing", {
        p_listing_id: id,
        p_new_status: "removed",
      });
      break;
  }
  if (result.error) return { ok: false, key: actionErrorKey(result.error.message) };
  const refusal = refusalOf(result.data);
  if (refusal !== null) return { ok: false, key: actionErrorKey(refusal) };
  return { ok: true };
}

/**
 * Turn R1 — an action taken from the list. The ad is read again first: its status
 * may have changed since the list was read, and a closed ad's reopening status
 * comes with it. The action runs only when the ad still offers it; its door
 * re-checks everything anyway (F3).
 */
export async function runListAction(
  listingId: string,
  action: ListingAction,
): Promise<ActionOutcome> {
  let ad: MyListing | "notYours";
  try {
    ad = await readMyListing(listingId);
  } catch {
    return { ok: false, key: "myListings.error.failed" };
  }
  if (ad === "notYours") return { ok: false, key: "myListings.error.notYours" };
  if (!actionsFor(ad).includes(action)) return { ok: false, key: "myListings.error.changed" };
  return runAction(ad, action);
}

/** What the page says once an action is done (a deleted ad's page leaves for My listings). */
export const DONE_KEY: Record<Exclude<ListingAction, "delete">, MessageKey> = {
  reserve: "myListings.done.reserve",
  unreserve: "myListings.done.unreserve",
  sell: "myListings.done.sell",
  close: "myListings.done.close",
  reopen: "myListings.done.reopen",
  renew: "myListings.done.renew",
};

/** Turn R1 — what the list says once an ad is deleted from it. */
export const DELETED_KEY: MessageKey = "myListings.done.delete";

/** Each action's button. */
export const ACTION_KEY: Record<ListingAction, MessageKey> = {
  reserve: "myListings.action.reserve",
  unreserve: "myListings.action.unreserve",
  sell: "myListings.action.sell",
  close: "myListings.action.close",
  reopen: "myListings.action.reopen",
  renew: "myListings.action.renew",
  delete: "myListings.action.delete",
};

/** Turn 3b (call H) — Mark as sold, rented or filled, by the ad's word. */
export const SELL_KEY: Record<SoldWord, MessageKey> = {
  sold: "myListings.action.sell",
  rented: "myListings.action.rent",
  filled: "myListings.action.fill",
};
export const SOLD_DONE_KEY: Record<SoldWord, MessageKey> = {
  sold: "myListings.done.sell",
  rented: "myListings.done.rent",
  filled: "myListings.done.fill",
};

/** The button's word and the done line, the sold word applied. */
export function actionKey(action: ListingAction, word: SoldWord): MessageKey {
  return action === "sell" ? SELL_KEY[word] : ACTION_KEY[action];
}
export function doneKey(action: Exclude<ListingAction, "delete">, word: SoldWord): MessageKey {
  return action === "sell" ? SOLD_DONE_KEY[word] : DONE_KEY[action];
}

/** The confirm of an action that cannot be undone: its question and what it means. */
export function confirmKeys(
  action: "sell" | "delete",
  word: SoldWord,
): { title: MessageKey; body: MessageKey; yes: MessageKey } {
  if (action === "delete")
    return {
      title: "myListings.confirm.deleteTitle",
      body: "myListings.confirm.deleteBody",
      yes: "myListings.action.delete",
    };
  const title: Record<SoldWord, MessageKey> = {
    sold: "myListings.confirm.sellTitle",
    rented: "myListings.confirm.rentTitle",
    filled: "myListings.confirm.fillTitle",
  };
  const body: Record<SoldWord, MessageKey> = {
    sold: "myListings.confirm.sellBody",
    rented: "myListings.confirm.rentBody",
    filled: "myListings.confirm.fillBody",
  };
  return { title: title[word], body: body[word], yes: SELL_KEY[word] };
}

/**
 * Turn R1 (D182 2) — the actions My listings takes on several ticked ads at once,
 * from tablet width up: Mark as sold, No longer available, Renew, Delete. Each one
 * is offered for the ticked ads that offer it, asks first with their count, and
 * runs ad by ad through `runListAction`.
 */
export const BULK_ACTIONS = ["sell", "close", "renew", "delete"] as const;
export type BulkAction = (typeof BULK_ACTIONS)[number];

/** The ticked ads that offer an action, in the list's order. */
export function bulkTargets(
  rows: MyListingRow[],
  action: BulkAction,
  renewAllowed: boolean,
): MyListingRow[] {
  return rows.filter((row) => rowActionsFor(row, renewAllowed).includes(action));
}

/** The words of the ticked ads' sold marks, each once, in the order sold, rented, filled. */
export function soldWordsOf(rows: MyListingRow[]): SoldWord[] {
  const words = new Set(rows.map((row) => row.soldWord));
  return (["sold", "rented", "filled"] as const).filter((word) => words.has(word));
}

/** A bulk action's button: Mark as sold (rented, filled) by the ads' one word, or all three. */
export function bulkLabelKey(action: BulkAction, words: SoldWord[]): MessageKey {
  if (action !== "sell") return ACTION_KEY[action];
  const [only, ...rest] = words;
  return only !== undefined && rest.length === 0 ? SELL_KEY[only] : "myListings.bulk.sellMixed";
}

/** What a bulk action's confirm says. */
export const BULK_BODY_KEY: Record<BulkAction, MessageKey> = {
  sell: "myListings.bulk.sellBody",
  close: "myListings.bulk.closeBody",
  renew: "myListings.bulk.renewBody",
  delete: "myListings.bulk.deleteBody",
};

/** The seller's word for a status in the history (reach is staff's lever and is not shown). */
export const STATUS_WORD: Record<string, MessageKey> = {
  draft: "myListings.status.draft",
  screening: "myListings.group.review",
  held: "myListings.group.review",
  active: "myListings.group.live",
  reduced: "myListings.group.live",
  rejected: "myListings.notApproved",
  removed: "admin.listings.status.removed",
  closed: "myListings.closedLine",
  expired: "admin.listings.status.expired",
  sold: "myListings.group.sold",
};

/**
 * The history the seller reads: a status change between two statuses the seller
 * reads as one — active and reduced (reach is staff's lever and is not shown), screening
 * and held — that changed nothing else is left out.
 */
export function sellerLines(lines: HistoryLine[]): HistoryLine[] {
  return lines.filter((line) => {
    if (line.from === null || line.to === null || line.reserved !== null) return true;
    if (line.fields.length > 0) return true;
    const from = ownValue(STATUS_WORD, line.from);
    return from === undefined || from !== ownValue(STATUS_WORD, line.to);
  });
}

/**
 * Bundle 16 turn R2 (D172, D177) — THE SELLER'S EDIT IN BOXES. The statuses an ad
 * is edited in: live (with full or reduced reach), closed and refused. An ad in
 * review waits for its answer (call G), an expired ad is renewed first, a draft
 * continues in the posting form, a sold or removed ad is not edited. The door
 * (`edit_my_listing`) holds the same rule.
 */
export const EDITABLE_STATUSES: ReadonlySet<string> = new Set([
  "active",
  "reduced",
  "closed",
  "rejected",
]);

/**
 * D182 4 — the ads "Post a similar ad" copies: every ad but a draft (it continues in
 * the posting form), a removed one (staff's) and a refused one (it is edited). The
 * door (`copy_my_listing`) holds the same rule.
 */
export function copyable(status: string): boolean {
  return status !== "draft" && status !== "removed" && status !== "rejected";
}

export type EditOutcome =
  | { ok: true; status: string; review: boolean }
  | { ok: false; refusals: Refusal[] }
  | { ok: false; key: MessageKey };

function refusalsOf(value: unknown): Refusal[] {
  if (!isObject(value) || !Array.isArray(value.refusals)) return [];
  return value.refusals.flatMap((entry): Refusal[] =>
    isObject(entry) && typeof entry.field === "string" && typeof entry.reason === "string"
      ? [{ field: entry.field, reason: entry.reason }]
      : [],
  );
}

/**
 * The changed fields of one ad, through its door. The door decides what applies at
 * once (amounts and picked answers) and what goes to review (words, D177); its
 * content refusals come back as the posting form's, under their fields.
 */
export async function editMyListing(
  listingId: string,
  changes: Record<string, unknown>,
): Promise<EditOutcome> {
  const { data, error } = await supabase.rpc("edit_my_listing", {
    p_listing_id: listingId,
    p_changes: changes as Json,
  });
  if (error) return { ok: false, key: actionErrorKey(error.message) };
  if (isObject(data) && data.ok === true && typeof data.status === "string") {
    return { ok: true, status: data.status, review: data.review === true };
  }
  const refusals = refusalsOf(data);
  return refusals.length > 0
    ? { ok: false, refusals }
    : { ok: false, key: "myListings.error.failed" };
}

/** D182 4 — Post a similar ad: the new draft's id, or the refusal in words. */
export async function copyMyListing(
  listingId: string,
): Promise<{ ok: true; listingId: string } | { ok: false; key: MessageKey }> {
  const { data, error } = await supabase.rpc("copy_my_listing", { p_listing_id: listingId });
  if (error) return { ok: false, key: actionErrorKey(error.message) };
  if (isObject(data) && data.ok === true && typeof data.listing_id === "string") {
    return { ok: true, listingId: data.listing_id };
  }
  return { ok: false, key: "myListings.error.failed" };
}
