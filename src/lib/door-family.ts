import type { MessageKey } from "@/i18n";
import type { DoorCodeMap } from "@/lib/door-codes.generated";
import type { RefusalFamily } from "@/lib/refusal";

/**
 * cursor-bundle-7c (INC-1280; ruling 1, decision 1) — A FAMILY'S WORDS, TYPED OVER ITS DOORS.
 * Types only: a family is written `{ … } as const satisfies DoorFamily<{ doors: … }>`, so the
 * check costs no byte in any chunk. Over the doors the family names (the generated
 * `DoorCodeMap`, from the door manifest):
 * - every code a listed door answers, the shared gate codes aside, has words — or is declared
 *   `generic` (the family's generic by design, class c), `unreachable` (read elsewhere by name,
 *   or never produced from the calling screen, classes a and b) or `owed` (a person can meet and
 *   mend it and its words are owed, class d, INC-1307), each with its reason; a missing word is a
 *   type error (a missing property);
 * - any other word is a gate code or a code the family declares under `also` with its source;
 *   anything else is a type error (an unknown property);
 * - an `also` code a listed door already answers, and an excused code no listed door answers,
 *   are type errors too (`alsoAnsweredByADoor`, `excusedCodeNoDoorAnswers`).
 * `scripts/conformance/door-words.test.ts` reads the declarations: every door called under src/
 * is listed by a family or allowlisted, and every owed code has its allowlist line.
 */

export type DoorName = keyof DoorCodeMap;

/** The codes door_context answers for every door (DOOR_CODES' gate codes): the shared words carry them. */
export type GateCode =
  | "notSignedIn"
  | "accountDeactivated"
  | "permissionDenied"
  | "stepUpRequired"
  | "rateLimited";

/**
 * Where a word's code comes from when no listed door's `door_refuse` answers it: a plain
 * `RAISE EXCEPTION '<code>'`, a returned refusal (`{ ok: false, refusals: [{ reason }] }`), a
 * trigger's raise, a route's `clientError`, the form gate (`src/components/forms/use-form-gate.ts`),
 * the parser (a field's own check before any call).
 */
export type WordSource = "raise" | "returned" | "trigger" | "route" | "formGate" | "parser";

export type FamilyDeclaration = {
  readonly doors: DoorName;
  readonly also?: Readonly<Record<string, WordSource>>;
  readonly generic?: Readonly<Record<string, string>>;
  readonly unreachable?: Readonly<Record<string, string>>;
  readonly owed?: Readonly<Record<string, "INC-1307">>;
};

type Part<F, K extends string> = F extends { readonly [P in K]: infer V }
  ? keyof V & string
  : never;

/** The codes the family's doors answer, the gate codes aside. */
export type CodesOf<F extends FamilyDeclaration> = Exclude<DoorCodeMap[F["doors"]], GateCode>;

type Excused<F extends FamilyDeclaration> =
  | Part<F, "generic">
  | Part<F, "unreachable">
  | Part<F, "owed">;

/** The codes that must have words. */
export type NeededWords<F extends FamilyDeclaration> = Exclude<CodesOf<F>, Excused<F>>;

type Words<F extends FamilyDeclaration> = {
  readonly [C in NeededWords<F>]: MessageKey;
} & { readonly [C in GateCode | Part<F, "also">]?: MessageKey };

type AlsoAnswered<F extends FamilyDeclaration> = Extract<Part<F, "also">, CodesOf<F>>;
type ExcusedUnanswered<F extends FamilyDeclaration> = Exclude<Excused<F>, CodesOf<F>>;

type Checks<F extends FamilyDeclaration> = ([AlsoAnswered<F>] extends [never]
  ? unknown
  : { readonly alsoAnsweredByADoor: AlsoAnswered<F> }) &
  ([ExcusedUnanswered<F>] extends [never]
    ? unknown
    : { readonly excusedCodeNoDoorAnswers: ExcusedUnanswered<F> });

export type DoorFamily<F extends FamilyDeclaration> = Omit<RefusalFamily, "words"> &
  ([NeededWords<F>] extends [never]
    ? { readonly words?: Words<F> }
    : { readonly words: Words<F> }) &
  Checks<F>;
