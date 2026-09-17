# Posting wizard (U6-C1a, steps 1–2)

Spec: `docs/governance/u6-posting-spec.md` §4 B2/C1, §12 D11/D12/D18.
Decisions: DEC-068 (residency from the edge), DEC-069 (the strip law),
DEC-072 (the assist). Acceptance: `PW-1`..`PW-4`, `PW-7`, `PW-8`.

What landed: the wizard shell, the draft (autosave, offline retry, resume) and
steps 1–2. Steps 3–8 are declared in the rail and say so in words on screen
(`post.stepLater`); C1b lands the specification form, title and description.

## The screens

| Route        | Purpose                                                                              |
| ------------ | ------------------------------------------------------------------------------------ |
| `/post`      | Creates a draft. Public: a signed-out visitor sees a sign-in call, never a redirect. |
| `/post/<id>` | Resumes a draft. `noindex`. RLS decides ownership, never the URL.                    |

`src/routes/post_.$listingId.tsx` carries a TRAILING UNDERSCORE on the `post`
segment on purpose. Without it the flat-file convention makes `post.tsx` a
layout, and a wizard that renders no `<Outlet />` would silently show the create
screen at a draft's own address. The URL is unaffected.

## The draft (`src/features/posting/use-draft.ts`)

1. **Nothing is lost.** A save that cannot reach the server keeps the answers,
   says `post.save.unsaved` in words, and retries every 4 seconds; a `Try again`
   button is offered beside the caption. No field is cleared, no step rolls back,
   and success is never claimed (F4).
2. **One save at a time.** Typing debounces at 2 seconds, `Next` saves at once;
   both funnel through a single in-flight request carrying the LATEST answers, so
   the door can never apply an older payload after a newer one.
3. **The server owns `draft_step`.** The wizard proposes; the door's answer is
   what a resume trusts. A resume opens at the step AFTER the recorded one, never
   past what this landing can honestly render.
4. **A refusal is not a failure.** Refusals render beneath their named field and
   are not retried; only unreachability is.

## Step 1 — category (D11)

Search-to-leaf over the ONE shared tree reader
(`src/features/categories/category-tree.ts`, lifted out of the feed so both
consumers read the same rows). Search matches the active language's entity name
and the English name, and answers with POSTABLE LEAVES ONLY. Folders are
browsable and never selectable. Choosing a leaf creates the draft immediately —
that is what makes the seller's work recoverable — and reads
`get_posting_schema` to say how many details the next form will ask for.

## Step 2 — photos (B2)

The device encodes before anything is sent: `createImageBitmap` with
`imageOrientation: "from-image"` (so a portrait phone photo is not served
sideways), a resize that never upscales, and WebP where the browser can encode
it, else JPEG at 0.82 — three variants (cover 1600, card 480, thumb 160).

Uploads are SEQUENTIAL and report real progress (`XMLHttpRequest`, because
`fetch` cannot report upload progress and a stuck tile is indistinguishable from
one still sending). A refused photo stays on screen with its reason in words so
it can be replaced rather than hunted for. The cover is the first registered
photo until the seller says otherwise. Stripping, caps and the policy pass are
the server's, not the device's — see `media-pipeline.md`.

## Tests (`e2e/post-wizard.spec.ts`)

`PW-1` shell · `PW-2` search-to-leaf creates the draft · `PW-3` a folder is never
selectable · `PW-4` a photo is prepared, stored stripped and removable · `PW-7`
resume, and only for its owner · `PW-8` an unreachable save keeps the answers.

Two harness facts worth keeping:

- **The edge speaks residency.** DEC-068 takes the country from the edge header,
  never the body. There is no Cloudflare in front of a local or CI run, so the
  spec supplies `cf-ipcountry` on the posting routes only — a blanket header is
  rejected by the font CDN's CORS preflight.
- Cleanup runs in an `afterEach` (INC-218): objects, listings, then the scratch
  category branch, so a body timeout still reaps.
