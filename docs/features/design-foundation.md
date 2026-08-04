# Feature: design foundation — the ethio.com house style

The first substantial frontend build. Every later page inherits from it.

## Palette — "coffee on cool slate"

Tokens live in `src/styles.css` in the existing `@theme inline` / `:root` /
`.dark` structure. All values are `oklch`.

| Token                        | Light (hex → oklch)                          | Dark (hex → oklch)                           |
| ---------------------------- | -------------------------------------------- | -------------------------------------------- |
| `--background`               | `#F6F7F9` → `oklch(0.976 0.003 264.5)`        | `#14181C` → `oklch(0.207 0.010 248.3)`        |
| `--card` / `--popover`       | `#FFFFFF` → `oklch(1 0 89.9)`                 | `#1A1F24` → `oklch(0.236 0.012 248.3)`        |
| `--foreground`               | `#1E2329` → `oklch(0.254 0.014 253.1)`        | `#E6E8EB` → `oklch(0.930 0.005 258.3)`        |
| `--muted-foreground`         | `#686F78` → `oklch(0.539 0.016 254.7)`        | `#8A9299` → `oklch(0.656 0.014 244.4)`        |
| `--primary`                  | `#1E5A43` → `oklch(0.422 0.073 164.4)`        | `#7FC9A6` → `oklch(0.777 0.090 162.9)`        |
| `--primary-foreground`       | `#FFFFFF` → `oklch(1 0 89.9)`                 | `#0B1A13` → `oklch(0.202 0.025 162.8)`        |
| `--accent`                   | `#C98A2B` → `oklch(0.681 0.130 72.5)`         | `#E0A94A` → `oklch(0.769 0.128 78.3)`         |
| `--accent-foreground`        | `#3D2A08` → `oklch(0.301 0.055 77.9)`         | `#221704` → `oklch(0.214 0.037 79.9)`         |
| `--secondary`                | `#EAEDF1` → `oklch(0.945 0.006 255.5)`        | `#222930` → `oklch(0.277 0.016 248.4)`        |
| `--muted`                    | `#F0F2F5` → `oklch(0.960 0.005 258.3)`        | `#222930` → `oklch(0.277 0.016 248.4)`        |
| `--border` / `--input`       | `#E8EBEF` → `oklch(0.939 0.006 255.5)`        | `#262C32` → `oklch(0.290 0.014 248.3)`        |
| `--ring`                     | primary green                                  | lighter green                                  |
| `--sidebar`                  | `#FFFFFF`                                      | `#1A1F24`                                      |
| `--sidebar-accent` (rail on) | `#EDF3EF` → `oklch(0.958 0.008 157.1)`        | `#22302A` → `oklch(0.294 0.022 166.7)`        |

### WCAG contrast (measured)

| Pair                              | Light   | Dark    |
| --------------------------------- | ------- | ------- |
| foreground / background           | 14.76:1 | 14.53:1 |
| muted-foreground / background     | 4.74:1  | 5.65:1  |
| primary-foreground / primary      | 8.08:1  | 9.23:1  |
| accent-foreground / accent        | 4.67:1  | 8.34:1  |
| primary text on rail-active       | 7.18:1  | 7.09:1  |

**Deviation:** the brief's light `--muted-foreground` `#7A828C` measures 3.63:1
on `#F6F7F9` — below AA for normal text. Darkened to `#686F78` (4.74:1).

**Dark primary decision:** `#1E5A43` with white text scores 8.08:1 *on itself*
but only ~1.5:1 against the `#14181C` page, so a filled button would vanish.
Dark mode therefore uses the lighter leaf `#7FC9A6` with near-black text
(9.23:1 on itself, clearly separated from the page).

## Typography

- `--font-sans`: `Inter, "Noto Sans Ethiopic", system-ui, sans-serif`
- `--font-display`: `Bricolage Grotesque, "Noto Sans Ethiopic", system-ui, sans-serif`
  (headings + logo wordmark)

**Ge'ez fallback rule:** Inter carries no Ethiopic glyphs. Browsers resolve font
stacks *per glyph*, so Latin renders in Inter and every Ge'ez codepoint falls
through to Noto Sans Ethiopic automatically — no locale-conditional class is
needed, and mixed Amharic/Latin strings render correctly. The shell smoke spec
asserts a rendered `U+1200–U+137F` heading after the language toggle.

Fonts load as `<link rel="stylesheet">` in `src/routes/__root.tsx`'s `head()`
with `display=swap` (Lightning CSS cannot resolve a remote `@import` from
`src/styles.css`); Noto is requested with `subset=ethiopic`.

## Performance stance

- **Flat surfaces only.** No background images, no gradients anywhere.
- Listing photos will be `loading="lazy"` with explicit dimensions when the
  EXIF-strip pass surfaces them; today every card renders a placeholder.
- The brand mark and the spinner are inline SVG + CSS — zero image requests.
- `prefers-reduced-motion` turns the spinner's rotation into a gentle pulse.

## Dark mode

Class-based (`@custom-variant dark (&:is(.dark *))`). Every token has a dark
value; components use semantic tokens only, never raw colours.

## The AppShell slot model

`src/components/app-shell.tsx` is the ONE shell:

```text
+--------------------------------------------------+
| header  (logo | search | panels | lang | account) |
+---------+----------------------------------------+
| rail    | body (route outlet / panel placeholder) |
+---------+----------------------------------------+
| footer  (link columns, language, copyright)       |
+--------------------------------------------------+
```

Same skeleton at every breakpoint. Below `lg` the rail is hidden and opens as a
drawer (`ui/sheet`, the same primitive `ui/sidebar` uses for its own mobile
mode) from the header hamburger. Mobile-first at 360px; all controls ≥ 44px;
logical properties only (`ps-*`, `pe-*`, `me-*`, `text-start`).

## Motif rule

See `docs/features/panels.md`. In short: religiously neutral tibeb geometry
only, and it appears in exactly three places — logo, spinner, feed empty state.
