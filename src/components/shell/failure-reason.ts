import { onlineManager } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type { MessageKey } from "@/i18n";
import { loadOnce } from "@/lib/load-once";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import type { DoorFamily } from "@/lib/door-family";
import { rateUntilOf, readRefusal, type RefusalRead } from "@/lib/refusal";

/**
 * DEC-464 / INC-1279 — THE FAILURE NOTICE'S ONE READING. A query's or an action's failure becomes
 * one kind, decided STATUS FIRST (a status does not drift; a code list does). Each kind has one
 * set of words and one next step (failure-notice.tsx). No caller adds codes. Reading never
 * throws: anything unreadable is `server`.
 */
export type FailureKind =
  | "network"
  | "server"
  | "gone"
  | "changed"
  | "noAccess"
  | "signedOut"
  | "stepUp"
  | "rateLimited"
  | "refused";

export type FailureStep = "retry" | "exit" | "reload" | "back" | "signIn" | "stepUp" | "retryLater";

export const KINDS: Readonly<Record<FailureKind, { words: MessageKey; step: FailureStep }>> = {
  network: { words: "failure.network", step: "retry" },
  server: { words: "failure.server", step: "retry" },
  gone: { words: "failure.gone", step: "exit" },
  changed: { words: "failure.changed", step: "reload" },
  noAccess: { words: "failure.noAccess", step: "back" },
  signedOut: { words: "session.expired", step: "signIn" },
  stepUp: { words: "failure.stepUp", step: "stepUp" },
  rateLimited: { words: "failure.rateLimitedSoon", step: "retryLater" },
  refused: { words: "failure.refused", step: "back" },
};

/** Retry is drawn at once only for these (the query client's background rule is the same). */
export function isRetryable(kind: FailureKind): boolean {
  return kind === "network" || kind === "server";
}

/** The rate refusal's words: `{when}` only for an instant still to come (the reader's own rule). */
export const RATE_FAMILY = {
  words: { rateLimited: "failure.rateLimitedSoon" },
  when: { rateLimited: "failure.rateLimited" },
} as const satisfies DoorFamily<{ doors: never }>;

export type FailureReading = {
  kind: FailureKind;
  /** The failure's class, for a `data-` attribute and the console only — never words. */
  diagnostic: string;
  /** The rate gate's reset instant, when it named one. */
  until: string | undefined;
};

const CODE = /^[a-z][A-Za-z]*$/;

// INC-864 — reader-failure stays off the first download: it loads only when a read failed.
const readerModule = loadOnce(() => import("@/lib/reader-failure"));
type ReaderModule = typeof import("@/lib/reader-failure");

/** Starts (or joins) the reader's download; resolves once `failureKind` reads with it. */
export function loadFailureReader(): Promise<unknown> {
  return readerModule.load().catch((e: unknown) => reportOnDemandFailure("reader-failure", e));
}

function codeOf(mod: ReaderModule, error: unknown): string | undefined {
  const gate = mod.gateRefusal(error);
  if (gate !== null) return gate.code;
  const failure = mod.readerFailure(error);
  return failure.code !== undefined && CODE.test(failure.code) ? failure.code : undefined;
}

function decide(status: number | undefined, code: string | undefined, cls: string): FailureKind {
  if (status === 401 || code === "notSignedIn") return "signedOut";
  if (status === 428 || code === "stepUpRequired") return "stepUp";
  if (status === 429 || code === "rateLimited") return "rateLimited";
  if (status === 403 || code === "permissionDenied" || code === "accountDeactivated")
    return "noAccess";
  if (status === 404 || status === 410) return "gone";
  if (status === 409) return "changed";
  if (cls === "network") return "network";
  if ((status !== undefined && status >= 500) || cls === "server" || cls === "malformed")
    return "server";
  if (cls === "refused" || cls === "auth") return "refused";
  return "server";
}

/** INC-864 — before the reader arrives: what the error itself carries (a status, a TypeError). */
function carried(error: unknown): { status: number | undefined; cls: string } {
  const raw =
    typeof error === "object" && error !== null
      ? (error as { status?: unknown }).status
      : undefined;
  const status = typeof raw === "number" ? raw : undefined;
  return { status, cls: error instanceof TypeError ? "network" : "server" };
}

function readFailure(error: unknown): FailureReading {
  try {
    const mod = readerModule.ready();
    if (mod === null) {
      const { status, cls } = carried(error);
      const kind = decide(status, undefined, cls);
      return {
        kind,
        diagnostic: `${cls}${status === undefined ? "" : ` ${status}`} (reader pending)`,
        until: undefined,
      };
    }
    const failure = mod.readerFailure(error);
    const gate = mod.gateRefusal(error);
    const status = gate?.status ?? failure.status;
    const diagnostic = `${failure.class}${status === undefined ? "" : ` ${status}`}`;
    const kind = decide(status, codeOf(mod, error), failure.class);
    return { kind, diagnostic, until: kind === "rateLimited" ? rateUntilOf(error) : undefined };
  } catch {
    return { kind: "server", diagnostic: "unreadable", until: undefined };
  }
}

/**
 * INC-1286 — a failure read while the device is offline and the reader could only say `server` is
 * a failure of the network: the read is paused for it (TanStack's `networkMode`), and its words
 * are the network's. A refusal is still a refusal; only the unreadable-as-server kind moves.
 */
export function failureKind(error: unknown): FailureReading {
  const reading = readFailure(error);
  if (reading.kind !== "server" || onlineManager.isOnline()) return reading;
  return { ...reading, kind: "network", diagnostic: `${reading.diagnostic} (offline)` };
}

/**
 * INC-864 — the notice's reading: at once from what the error carries, then again once the
 * reader arrives. A failed download goes to the shell's one notice (Refresh); the words stay.
 */
export function useFailureKind(error: unknown): FailureReading {
  const [, setArrived] = useState(readerModule.ready() !== null);
  useEffect(() => {
    if (readerModule.ready() !== null) return;
    let live = true;
    readerModule
      .load()
      .then(() => {
        if (live) setArrived(true);
      })
      .catch((e: unknown) => reportOnDemandFailure("reader-failure", e));
    return () => {
      live = false;
    };
  }, []);
  return failureKind(error);
}

/** The rate words' read, for `refusalText` (the one place `{when}` is filled). */
export function rateRead(error: unknown) {
  return readRefusal(error, RATE_FAMILY);
}

/** DEC-464 — a read that answered and found nothing: the caller's read already decided it. */
export function goneReading(): FailureReading {
  return { kind: "gone", diagnostic: "answered none", until: undefined };
}

/** DEC-464 — a service that already answered a rate refusal, with its reset instant if named. */
export function rateReading(until: string | undefined): FailureReading {
  return { kind: "rateLimited", diagnostic: "refused 429", until };
}

/** The rate words for a reading, `{when}` only for an instant still to come. */
export function rateWords(until: string | undefined): RefusalRead {
  return {
    key: RATE_FAMILY.words?.rateLimited ?? "failure.rateLimitedSoon",
    tail: until,
    field: null,
    silent: false,
    branch: "family",
    when: RATE_FAMILY.when?.rateLimited,
  };
}
