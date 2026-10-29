import { describe, expect, it } from "vitest";

import { ReaderError } from "@/lib/reader-failure";

import { jobLineOf, nameQueuePageOf } from "./use-name-checks";

/** N1b-3c (INC-977) — the queue's and the job line's readers judge the door's answer alone. */
const shown = {
  profile_id: "11111111-1111-4111-8111-111111111111",
  subject: "alias",
  name: "CocaColaShop",
  checked_text: "cocacolashop",
  of: "Coca-Cola",
  name_hidden: false,
  since: "2026-10-29T10:00:00Z",
  attempts: 2,
};
const hidden = {
  ...shown,
  name: null,
  checked_text: null,
  of: null,
  name_hidden: true,
};

describe("NCQ-U the held names' reader", () => {
  it("NCQ-U1 reads a shown row, a hidden row and the next cursor", () => {
    const page = nameQueuePageOf({
      rows: [shown, hidden],
      next: { since: shown.since, profile_id: shown.profile_id },
    });
    expect(page.rows[0]).toMatchObject({ name: "CocaColaShop", of: "Coca-Cola", attempts: 2 });
    expect(page.rows[1]).toMatchObject({ name: null, of: null, nameHidden: true });
    expect(page.next).toEqual({ since: shown.since, profileId: shown.profile_id });
    expect(nameQueuePageOf({ rows: [], next: null })).toEqual({ rows: [], next: null });
  });

  it("NCQ-U2 an answer out of shape is a typed failure, never an empty queue", () => {
    for (const bad of [
      null,
      [],
      { rows: null },
      { rows: [{ ...shown, attempts: -1 }] },
      { rows: [{ ...shown, since: "soon" }] },
      { rows: [{ ...shown, subject: "business" }] },
      // a hidden row that still carries a name, and a shown row without its text
      { rows: [{ ...hidden, name: "x" }] },
      { rows: [{ ...shown, checked_text: null }] },
      { rows: [shown], next: { since: "x", profile_id: 1 } },
    ]) {
      expect(() => nameQueuePageOf(bad)).toThrow(ReaderError);
    }
  });
});

const job = (fields: Record<string, unknown>) => ({
  job: "name-check-catchup",
  last: null,
  dispatched_unclaimed: false,
  paused: null,
  ...fields,
});
const run = (outcome: string, extra: Record<string, unknown> = {}) => ({
  outcome,
  reason: null,
  started_at: "2026-10-29T10:00:00Z",
  finished_at: "2026-10-29T10:00:20Z",
  ...extra,
});

describe("JHL-U the re-check's line", () => {
  it("JHL-U1 each answer gives its own line", () => {
    expect(jobLineOf(job({}))).toEqual({ kind: "notConfigured" });
    expect(jobLineOf(job({ last: run("not_configured") }))).toEqual({ kind: "notConfigured" });
    expect(jobLineOf(job({ last: run("ok") }))).toEqual({
      kind: "lastRun",
      outcome: "ok",
      at: "2026-10-29T10:00:20Z",
    });
    expect(
      jobLineOf(
        job({
          last: run("dispatched", { finished_at: null }),
          dispatched_unclaimed: true,
        }),
      ),
    ).toEqual({ kind: "noAnswer", sentAt: "2026-10-29T10:00:00Z" });
    expect(
      jobLineOf(
        job({ last: run("ok"), paused: { reason: "credits", since: "2026-10-29T09:00:00Z" } }),
      ),
    ).toEqual({ kind: "paused", reason: "credits", since: "2026-10-29T09:00:00Z" });
  });

  it("JHL-U2 an answer out of shape is a typed failure, never a healthy line", () => {
    for (const bad of [
      null,
      job({ job: "other" }),
      job({ dispatched_unclaimed: "no" }),
      job({ last: run("done") }),
      job({ last: run("ok", { started_at: null }) }),
      job({ last: run("ok"), dispatched_unclaimed: true }),
      job({ paused: { reason: "tired", since: "2026-10-29T09:00:00Z" } }),
      job({ paused: { reason: "credits" } }),
    ]) {
      expect(() => jobLineOf(bad)).toThrow(ReaderError);
    }
  });
});
