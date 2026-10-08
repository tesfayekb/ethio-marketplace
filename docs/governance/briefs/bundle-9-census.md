# Bundle 9 census — the house style (read-only, 2026-10-08, base 858b2137)

Every row is file:line from ripgrep on the tree at this commit. Searches are given above each block. Nothing in the code was changed.

## A. Tokens

Count: 108 token declarations in src/styles.css (search: `rg -n -- '^\s*--…:' src/styles.css`).

Meanings present / absent:
- primary: 7
- secondary: 6
- destructive: 6
- muted: 9
- accent: 7
- success: 0
- warning: 0
- info: 0

```text
53:  --radius-sm: calc(var(--radius) - 4px);
54:  --radius-md: calc(var(--radius) - 2px);
55:  --radius-lg: var(--radius);
56:  --radius-xl: calc(var(--radius) + 4px);
57:  --radius-2xl: calc(var(--radius) + 8px);
58:  --radius-3xl: calc(var(--radius) + 12px);
59:  --radius-4xl: calc(var(--radius) + 16px);
65:  --font-sans: "Inter", "Noto Sans Ethiopic", system-ui, sans-serif;
66:  --font-display: "Bricolage Grotesque", "Noto Sans Ethiopic", system-ui, sans-serif;
67:  --color-background: var(--background);
68:  --color-foreground: var(--foreground);
69:  --color-card: var(--card);
70:  --color-card-foreground: var(--card-foreground);
71:  --color-popover: var(--popover);
72:  --color-popover-foreground: var(--popover-foreground);
73:  --color-primary: var(--primary);
74:  --color-primary-foreground: var(--primary-foreground);
75:  --color-secondary: var(--secondary);
76:  --color-secondary-foreground: var(--secondary-foreground);
77:  --color-muted: var(--muted);
78:  --color-muted-foreground: var(--muted-foreground);
79:  --color-accent: var(--accent);
80:  --color-accent-foreground: var(--accent-foreground);
82:  --color-gold: var(--gold);
83:  --color-gold-foreground: var(--gold-foreground);
84:  --color-destructive: var(--destructive);
85:  --color-destructive-foreground: var(--destructive-foreground);
86:  --color-border: var(--border);
87:  --color-input: var(--input);
88:  --color-ring: var(--ring);
89:  --color-ring-offset-background: var(--background);
90:  --color-chart-1: var(--chart-1);
91:  --color-chart-2: var(--chart-2);
92:  --color-chart-3: var(--chart-3);
93:  --color-chart-4: var(--chart-4);
94:  --color-chart-5: var(--chart-5);
95:  --color-sidebar: var(--sidebar);
96:  --color-sidebar-foreground: var(--sidebar-foreground);
97:  --color-sidebar-primary: var(--sidebar-primary);
98:  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
99:  --color-sidebar-accent: var(--sidebar-accent);
100:  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
101:  --color-sidebar-border: var(--sidebar-border);
102:  --color-sidebar-ring: var(--sidebar-ring);
106:  --radius: 0.625rem;
108:  --background: oklch(0.976 0.003 264.5);
109:  --foreground: oklch(0.254 0.014 253.1); /* #1E2329 */
110:  --card: oklch(1 0 89.9); /* #FFFFFF */
111:  --card-foreground: oklch(0.254 0.014 253.1);
112:  --popover: oklch(1 0 89.9);
113:  --popover-foreground: oklch(0.254 0.014 253.1);
114:  --primary: oklch(0.422 0.073 164.4); /* #1E5A43 deep coffee-leaf green */
115:  --primary-foreground: oklch(1 0 89.9); /* #FFFFFF */
116:  --secondary: oklch(0.945 0.006 255.5); /* #EAEDF1 */
117:  --secondary-foreground: oklch(0.254 0.014 253.1);
118:  --muted: oklch(0.96 0.005 258.3); /* #F0F2F5 */
120:  --muted-foreground: oklch(0.539 0.016 254.7);
122:  --accent: oklch(0.96 0.005 258.3); /* #F0F2F5 */
123:  --accent-foreground: oklch(0.254 0.014 253.1); /* #1E2329 */
124:  --gold: oklch(0.681 0.13 72.5); /* #C98A2B honey-gold — logo dot + Featured only */
125:  --gold-foreground: oklch(0.301 0.055 77.9); /* #3D2A08 */
126:  --destructive: oklch(0.577 0.245 27.325);
127:  --destructive-foreground: oklch(1 0 89.9);
128:  --border: oklch(0.939 0.006 255.5); /* #E8EBEF */
129:  --input: oklch(0.939 0.006 255.5);
130:  --ring: oklch(0.422 0.073 164.4); /* primary green */
131:  --chart-1: oklch(0.422 0.073 164.4);
132:  --chart-2: oklch(0.681 0.13 72.5);
133:  --chart-3: oklch(0.539 0.016 254.7);
134:  --chart-4: oklch(0.777 0.09 162.9);
135:  --chart-5: oklch(0.769 0.128 78.3);
136:  --sidebar: oklch(1 0 89.9); /* #FFFFFF */
137:  --sidebar-foreground: oklch(0.254 0.014 253.1);
138:  --sidebar-primary: oklch(0.422 0.073 164.4);
139:  --sidebar-primary-foreground: oklch(1 0 89.9);
140:  --sidebar-accent: oklch(0.958 0.008 157.1); /* #EDF3EF rail active bg */
141:  --sidebar-accent-foreground: oklch(0.422 0.073 164.4);
142:  --sidebar-border: oklch(0.939 0.006 255.5);
143:  --sidebar-ring: oklch(0.422 0.073 164.4);
147:  --background: oklch(0.207 0.01 248.3); /* #14181C */
148:  --foreground: oklch(0.93 0.005 258.3); /* #E6E8EB */
149:  --card: oklch(0.236 0.012 248.3); /* #1A1F24 */
150:  --card-foreground: oklch(0.93 0.005 258.3);
151:  --popover: oklch(0.236 0.012 248.3);
152:  --popover-foreground: oklch(0.93 0.005 258.3);
153:  --primary: oklch(0.777 0.09 162.9); /* #7FC9A6 */
154:  --primary-foreground: oklch(0.202 0.025 162.8); /* #0B1A13 */
155:  --secondary: oklch(0.277 0.016 248.4); /* #222930 */
156:  --secondary-foreground: oklch(0.93 0.005 258.3);
157:  --muted: oklch(0.277 0.016 248.4);
158:  --muted-foreground: oklch(0.656 0.014 244.4); /* #8A9299 */
160:  --accent: oklch(0.277 0.016 248.4); /* #222930 */
161:  --accent-foreground: oklch(0.93 0.005 258.3); /* #E6E8EB */
162:  --gold: oklch(0.769 0.128 78.3); /* #E0A94A — logo dot + Featured only */
163:  --gold-foreground: oklch(0.214 0.037 79.9); /* #221704 */
164:  --destructive: oklch(0.704 0.191 22.216);
165:  --destructive-foreground: oklch(0.93 0.005 258.3);
166:  --border: oklch(0.29 0.014 248.3); /* #262C32 */
167:  --input: oklch(0.29 0.014 248.3);
168:  --ring: oklch(0.777 0.09 162.9);
169:  --chart-1: oklch(0.777 0.09 162.9);
170:  --chart-2: oklch(0.769 0.128 78.3);
171:  --chart-3: oklch(0.656 0.014 244.4);
172:  --chart-4: oklch(0.422 0.073 164.4);
173:  --chart-5: oklch(0.681 0.13 72.5);
174:  --sidebar: oklch(0.236 0.012 248.3); /* #1A1F24 */
175:  --sidebar-foreground: oklch(0.93 0.005 258.3);
176:  --sidebar-primary: oklch(0.777 0.09 162.9);
177:  --sidebar-primary-foreground: oklch(0.202 0.025 162.8);
178:  --sidebar-accent: oklch(0.294 0.022 166.7); /* #22302A rail active bg */
179:  --sidebar-accent-foreground: oklch(0.777 0.09 162.9);
180:  --sidebar-border: oklch(0.29 0.014 248.3);
181:  --sidebar-ring: oklch(0.777 0.09 162.9);
```

Non-token colours in src/ (search: `rg -n '\b(text|bg|border|ring|fill|stroke|from|to|via)-(red|green|blue|yellow|amber|emerald|orange|gray|slate|zinc|neutral|stone|sky|indigo|purple|pink|rose|lime|teal|cyan|violet|fuchsia|white|black)(-[0-9]{2,3})?\b|#[0-9a-fA-F]{3,8}\b' src --glob '!*.test.*' --glob '!src/styles.css' --glob '!routeTree.gen.ts'`):
Count: 48
```text
src/components/ui/alert-dialog.tsx:19:      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
src/components/ui/sheet.tsx:25:      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
src/lib/error-page.ts:54:      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
src/lib/error-page.ts:57:      p { color: #4b5563; margin: 0 0 1.5rem; }
src/lib/error-page.ts:60:      .primary { background: #111; color: #fff; }
src/lib/error-page.ts:61:      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
src/lib/error-page.ts:62:      .cause { margin: 1rem 0 0; padding: 0.5rem; background: #fff; border: 1px solid #d1d5db; border-radius: 0.375rem; text-align: start; white-space: pre-wrap; overflow-wrap: anywhere; font: 12
src/components/ui/drawer.tsx:26:    className={cn("fixed inset-0 z-50 bg-black/80", className)}
src/components/ui/dialog.tsx:25:      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
src/server/category-images/prompt.ts:6: * Palette lines are the ethio.com house style: #1E5A43 primary, #C98A2B accent.
src/server/category-images/prompt.ts:14:  "Palette: primary #1E5A43 (deep green), accent #C98A2B (warm gold); use only these",
src/server/category-images/prompt.ts:15:  "two colours plus their tints, on a pure white background (#FFFFFF).",
src/server/category-images/prompt.ts:17:  "Colour roles: the deep green #1E5A43 is the dominant colour of the main subject;",
src/server/category-images/prompt.ts:18:  "the warm gold #C98A2B appears as ONE small accent element only (at most ~15% of",
src/server/imports/gate.ts:192: * swatch ("#000000|#8B5A2B") and any label carrying a pipe put the separator
src/components/shell/use-footer-inset.ts:118:     * React reports as "Maximum update depth exceeded" (#185). The observed
src/components/shell/stat-card.tsx:32:  up: "text-emerald-600 dark:text-emerald-400",
src/server/category-images/fixture.ts:7: * fixture (white background, a #1E5A43 rounded square with a #C98A2B disc,
src/features/permissions/usePermissions.ts:54:   * -> effect … an unbounded update loop that React aborts with #185, which the
src/components/ui/chart.tsx:51:          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.rechar
src/lib/brand-mark.ts:7:export const WATERMARK_COLOR = "#1E5A43";
src/components/shell/app-rail.tsx:73: * `setRef` again. Mapped rows multiply the churn until React aborts with #185.
src/components/shell/app-rail.tsx:191:              state-setting ref writing null on every render — the #185 loop,
src/features/admin-categories/category-image-variants.ts:29:const BRAND_BACKGROUND = "#FFFFFF";
src/features/admin-attributes/attributes-page.tsx:311:              incomplete ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"
src/features/posting/colour-swatches.ts:29:  black: "#111111",
src/features/posting/colour-swatches.ts:30:  white: "#ffffff",
src/features/posting/colour-swatches.ts:31:  silver: "#c7ccd1",
src/features/posting/colour-swatches.ts:32:  gray: "#808a91",
src/features/posting/colour-swatches.ts:33:  grey: "#808a91",
src/features/posting/colour-swatches.ts:34:  red: "#d13438",
src/features/posting/colour-swatches.ts:35:  blue: "#1565c0",
src/features/posting/colour-swatches.ts:36:  green: "#2e7d32",
src/features/posting/colour-swatches.ts:37:  brown_beige: "#a1795a",
src/features/posting/colour-swatches.ts:38:  beige: "#c8ad8d",
src/features/posting/colour-swatches.ts:39:  brown: "#7a4f35",
src/features/posting/colour-swatches.ts:40:  tan: "#b68b5f",
src/features/posting/colour-swatches.ts:41:  gold: "#c9a227",
src/features/posting/colour-swatches.ts:42:  orange: "#ef6c00",
src/features/posting/colour-swatches.ts:43:  yellow: "#f2cb1d",
src/features/posting/colour-swatches.ts:44:  purple: "#6a1b9a",
src/features/posting/colour-swatches.ts:45:  burgundy_wine: "#6d1f2f",
src/features/posting/colour-swatches.ts:46:  burgundy: "#6d1f2f",
src/features/posting/colour-swatches.ts:47:  wine: "#6d1f2f",
src/features/admin-categories/categories-page.tsx:547:                "border-amber-500 text-amber-600 dark:text-amber-400",
src/features/admin-categories/categories-page.tsx:562:                "border-amber-500 text-amber-600 dark:text-amber-400",
src/features/admin-attributes/attribute-dialogs.tsx:587:          className="text-sm text-amber-600 dark:text-amber-400"
src/features/admin-attributes/category-attributes-dialog.tsx:216:          className="text-sm text-amber-600 dark:text-amber-400"
```

## B. Building blocks

Uses = files importing the module (search: `rg -l 'components/<dir>/<name>["\x27]' src`). Variants are the cva variant keys found in the file.

| file | exported | variants/sizes (cva keys) | files using |
|---|---|---|---|
| src/components/ui/accordion.tsx |  | 0 | 0 |
| src/components/ui/alert-dialog.tsx |  | 1 | 5 |
| src/components/ui/alert.tsx |  | 2 | 0 |
| src/components/ui/aspect-ratio.tsx |  | 0 | 0 |
| src/components/ui/avatar.tsx |  | 0 | 1 |
| src/components/ui/badge.tsx |  | 2 | 14 |
| src/components/ui/breadcrumb.tsx |  | 0 | 1 |
| src/components/ui/button.tsx |  | 4 | 54 |
| src/components/ui/calendar.tsx |  | 3 | 0 |
| src/components/ui/card.tsx |  | 0 | 0 |
| src/components/ui/carousel.tsx |  | 0 | 0 |
| src/components/ui/chart.tsx |  | 0 | 0 |
| src/components/ui/checkbox.tsx |  | 0 | 9 |
| src/components/ui/collapsible.tsx |  | 0 | 1 |
| src/components/ui/command.tsx |  | 0 | 0 |
| src/components/ui/context-menu.tsx |  | 0 | 0 |
| src/components/ui/dialog.tsx |  | 0 | 3 |
| src/components/ui/drawer.tsx |  | 0 | 0 |
| src/components/ui/dropdown-menu.tsx |  | 0 | 6 |
| src/components/ui/form.tsx |  | 0 | 0 |
| src/components/ui/hover-card.tsx |  | 0 | 0 |
| src/components/ui/input-otp.tsx |  | 0 | 0 |
| src/components/ui/input.tsx |  | 0 | 34 |
| src/components/ui/label.tsx |  | 0 | 2 |
| src/components/ui/menubar.tsx |  | 0 | 0 |
| src/components/ui/navigation-menu.tsx |  | 0 | 0 |
| src/components/ui/pagination.tsx |  | 1 | 0 |
| src/components/ui/popover.tsx |  | 0 | 0 |
| src/components/ui/progress.tsx |  | 0 | 0 |
| src/components/ui/radio-group.tsx |  | 0 | 0 |
| src/components/ui/resizable.tsx |  | 0 | 0 |
| src/components/ui/scroll-area.tsx |  | 0 | 0 |
| src/components/ui/select.tsx |  | 0 | 0 |
| src/components/ui/separator.tsx |  | 0 | 1 |
| src/components/ui/sheet.tsx |  | 0 | 3 |
| src/components/ui/sidebar.tsx |  | 4 | 0 |
| src/components/ui/skeleton.tsx |  | 0 | 4 |
| src/components/ui/slider.tsx |  | 0 | 0 |
| src/components/ui/sonner.tsx |  | 0 | 0 |
| src/components/ui/switch.tsx |  | 0 | 2 |
| src/components/ui/table.tsx |  | 0 | 0 |
| src/components/ui/tabs.tsx |  | 0 | 0 |
| src/components/ui/textarea.tsx |  | 0 | 3 |
| src/components/ui/toggle-group.tsx |  | 4 | 0 |
| src/components/ui/toggle.tsx |  | 4 | 1 |
| src/components/ui/tooltip.tsx |  | 0 | 2 |
| src/components/shell/app-footer.tsx | AppFooter  | 0 | 1 |
| src/components/shell/app-header.tsx | AppHeader  | 0 | 1 |
| src/components/shell/app-rail.tsx | AppRail  | 0 | 1 |
| src/components/shell/breadcrumbs.tsx | Breadcrumbs  | 0 | 1 |
| src/components/shell/chart-frame.tsx | ChartFrame  | 1 | 2 |
| src/components/shell/data-table.test.tsx |  | 0 | 0 |
| src/components/shell/data-table.tsx | DataTablePagination DataTable  | 0 | 13 |
| src/components/shell/detail-panel.tsx | DetailPanel  | 0 | 3 |
| src/components/shell/form-section.tsx | FormField FormSection  | 0 | 18 |
| src/components/shell/location-selector-order.test.tsx |  | 0 | 0 |
| src/components/shell/location-selector.tsx | LocationSelector  | 0 | 1 |
| src/components/shell/page-card.tsx | PAGE PageCard  | 0 | 17 |
| src/components/shell/panel-header.tsx | PanelHeader  | 0 | 1 |
| src/components/shell/panel-tabs.tsx | PanelTabs  | 0 | 1 |
| src/components/shell/stat-card.tsx | StatCard StatGrid  | 0 | 3 |
| src/components/shell/theme-toggle.tsx | ThemeToggle  | 0 | 1 |
| src/components/shell/tip-badge.tsx | TipBadge  | 1 | 6 |
| src/components/layout/content-grid.tsx | ContentGrid  | 0 | 3 |
| src/components/layout/form-layout.tsx | FormLayout  | 0 | 1 |
| src/components/layout/page-header.tsx | PageHeader  | 0 | 2 |
| src/components/layout/page-shell.tsx | PageShell  | 0 | 6 |
| src/components/layout/section.tsx | Section  | 0 | 3 |
| src/components/layout/split-layout.tsx | SplitLayout  | 0 | 1 |
| src/components/layout/toolbar.tsx | Toolbar  | 0 | 1 |

Used nowhere:
- src/components/ui/accordion.tsx
- src/components/ui/alert.tsx
- src/components/ui/aspect-ratio.tsx
- src/components/ui/calendar.tsx
- src/components/ui/card.tsx
- src/components/ui/carousel.tsx
- src/components/ui/chart.tsx
- src/components/ui/command.tsx
- src/components/ui/context-menu.tsx
- src/components/ui/drawer.tsx
- src/components/ui/form.tsx
- src/components/ui/hover-card.tsx
- src/components/ui/input-otp.tsx
- src/components/ui/menubar.tsx
- src/components/ui/navigation-menu.tsx
- src/components/ui/pagination.tsx
- src/components/ui/popover.tsx
- src/components/ui/progress.tsx
- src/components/ui/radio-group.tsx
- src/components/ui/resizable.tsx
- src/components/ui/scroll-area.tsx
- src/components/ui/select.tsx
- src/components/ui/sidebar.tsx
- src/components/ui/slider.tsx
- src/components/ui/sonner.tsx
- src/components/ui/table.tsx
- src/components/ui/tabs.tsx
- src/components/ui/toggle-group.tsx
- src/components/shell/data-table.test.tsx
- src/components/shell/location-selector-order.test.tsx

## C. Buttons

Shared Button variants (src/components/ui/button.tsx):
```text
8:  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
10:    variants: {
11:      variant: {
12:        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
13:        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
14:        outline:
16:        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
17:        ghost: "hover:bg-accent hover:text-accent-foreground",
18:        link: "text-primary underline-offset-4 hover:underline",
20:      size: {
21:        default: "h-9 px-4 py-2",
22:        sm: "h-8 rounded-md px-3 text-xs",
23:        lg: "h-10 rounded-md px-8",
24:        icon: "h-9 w-9",
25:        // C2 law (L6): the 44px touch target is a PRIMITIVE size, never a
31:      variant: "default",
32:      size: "default",
43:  ({ className, variant, size, asChild = false, ...props }, ref) => {
46:      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
```
- variant="default": 0
- variant="destructive": 6
- variant="outline": 101
- variant="secondary": 7
- variant="ghost": 6
- variant="link": 0
- size="sm": 0
- size="lg": 0
- size="icon": 4
- size="default": 2

Plain `<button` outside components/ui (search: `rg -n '<button\b' src --glob '!src/components/ui/**' --glob '!*.test.*'`):
Count: 112
```text
src/routes/__root.tsx:189:          <button
src/routes/settings.tsx:388:                  <button
src/routes/settings.tsx:431:                <button
src/routes/settings.tsx:454:              <button
src/routes/settings.tsx:462:              <button
src/routes/settings.tsx:478:            <button
src/routes/settings.tsx:540:              <button
src/routes/settings.tsx:573:              <button
src/routes/settings.tsx:589:              <button
src/routes/settings.tsx:601:            <button
src/routes/settings.tsx:649:              <button
src/routes/settings.tsx:662:              <button
src/routes/settings.tsx:728:            <button type="submit" disabled={busy} className={primaryButtonClass}>
src/routes/settings.tsx:751:            <button type="submit" disabled={busy} className={secondaryButtonClass}>
src/routes/settings.tsx:760:                <button
src/routes/settings.tsx:768:                <button
src/routes/settings.tsx:778:              <button
src/lib/error-page.ts:70:        <button class="primary" onclick="location.reload()">Try again</button>
src/features/posting/wizard.tsx:735:                          <button
src/features/posting/wizard.tsx:857:                    <button
src/features/posting/wizard.tsx:880:                    <button
src/features/posting/wizard.tsx:918:                          <button
src/features/posting/wizard.tsx:934:                          <button
src/features/posting/wizard.tsx:985:                        <button
src/features/posting/wizard.tsx:1025:                          <button
src/features/posting/wizard.tsx:1038:                          <button
src/routes/auth_.reset.tsx:114:        <button
src/routes/auth_.reset.tsx:130:        <button
src/routes/auth_.reset.tsx:164:            <button
src/routes/auth_.reset.tsx:181:        <button type="submit" disabled={busy} className={primaryButtonClass}>
src/routes/auth_.callback.tsx:82:        <button
src/routes/auth_.callback.tsx:98:        <button
src/routes/auth_.callback.tsx:114:      <button
src/routes/auth.tsx:366:            <button
src/routes/auth.tsx:379:          <button
src/routes/auth.tsx:397:          <button
src/routes/auth.tsx:448:            <button
src/routes/auth.tsx:463:              <button
src/routes/auth.tsx:474:            <button
src/routes/auth.tsx:530:              <button
src/routes/auth.tsx:552:            <button
src/routes/auth.tsx:564:          <button type="submit" disabled={busy} className={primaryButtonClass}>
src/routes/auth.tsx:571:          <button
src/routes/auth.tsx:588:          <button
src/routes/auth.tsx:610:            <button
src/routes/auth.tsx:618:            <button
src/features/posting/step-who.tsx:646:          <button
src/features/posting/step-who.tsx:882:                  <button
src/features/posting/step-who.tsx:929:            <button
src/features/posting/step-who.tsx:954:              <button
src/features/posting/step-who.tsx:1042:                  <button type="button" className={smallButtonClass} onClick={loadLib}>
src/features/posting/step-who.tsx:1096:          <button
src/features/posting/step-who.tsx:1109:          <button
src/features/posting/step-who.tsx:1127:              <button
src/features/posting/step-who.tsx:1135:              <button
src/features/posting/step-where.tsx:287:    <button
src/features/posting/step-where.tsx:318:        <button
src/features/posting/step-where.tsx:409:                <button
src/features/posting/step-where.tsx:575:                            <button
src/features/posting/step-where.tsx:595:                  <button
src/features/posting/step-where.tsx:1448:            <button
src/features/posting/step-where.tsx:1508:            <button
src/features/posting/step-where.tsx:1593:              <button
src/features/posting/step-where.tsx:1606:                <button
src/features/posting/step-specifications.tsx:1533:                    <button
src/features/posting/step-specifications.tsx:1610:              <button
src/features/posting/step-specifications.tsx:1728:                <button
src/features/posting/step-specifications.tsx:1766:                    <button
src/features/posting/step-specifications.tsx:1872:          <button
src/features/posting/step-review.tsx:439:              <button
src/features/posting/step-review.tsx:480:      <button
src/features/posting/step-review.tsx:616:              <button
src/features/posting/step-review.tsx:635:      <button
src/features/posting/step-pricing.tsx:407:            <button
src/features/posting/step-pricing.tsx:530:                      <button
src/features/posting/step-photos.tsx:353:                <button
src/features/posting/step-photos.tsx:366:                <button
src/features/posting/step-photos.tsx:375:              <button
src/features/posting/step-photos.tsx:433:        <button
src/features/posting/catalog-words.tsx:22:          <button
src/components/shell/theme-toggle.tsx:16:    <button
src/features/posting/step-details.tsx:355:              <button
src/features/posting/step-details.tsx:375:        <button
src/features/posting/step-category.tsx:93:    <button
src/features/posting/step-category.tsx:227:              <button
src/features/posting/step-category.tsx:292:          <button
src/features/posting/step-category.tsx:371:              <button
src/features/posting/step-category.tsx:386:                  <button
src/features/posting/step-category.tsx:407:                    <button
src/components/shell/panel-tabs.tsx:43:          <button
src/components/shell/panel-header.tsx:56:          <button
src/components/shell/location-selector.tsx:69:        <button
src/features/posting/preview/preview-sheet.tsx:56:          <button
src/features/admin-locations/location-form-fields.tsx:178:              <button
src/components/shell/data-table.tsx:447:                      <button
src/features/posting/phone-number-field.tsx:197:        <button
src/features/posting/map/map-pin-dropper.tsx:367:                    <button
src/components/language-switcher.tsx:47:        <button
src/components/language-switcher.tsx:103:                <button
src/features/posting/field.tsx:344:              <button
src/components/app-shell.tsx:625:          <button
src/components/app-shell.tsx:644:          <button
src/components/shell/app-header.tsx:74:        <button
src/components/shell/app-header.tsx:112:        <button
src/components/shell/app-header.tsx:135:        <button
src/components/shell/app-header.tsx:204:          <button
src/components/shell/app-header.tsx:219:                <button
src/components/searchable-picker.tsx:117:    <button
src/features/admin/impersonation/impersonation-banner.tsx:44:        <button
src/components/shell/app-rail.tsx:195:              <button
src/components/shell/app-rail.tsx:254:          <button
src/components/shell/app-rail.tsx:468:        <button
```

Icon-only controls (search: `rg -n 'size="icon"' src`):
Count: 4
```text
src/components/ui/calendar.tsx:156:      size="icon"
src/components/ui/sidebar.tsx:271:      size="icon"
src/features/admin/translations/languages-page.tsx:264:          size="icon"
src/features/admin/translations/languages-page.tsx:276:          size="icon"
```

## D. Row actions

Search: `rg -n '\b(Pencil|Trash2?|MoreHorizontal|MoreVertical|EllipsisVertical|Ellipsis)\b' src --glob '!*.test.*'`
Count: 24
```text
src/features/admin-locations/locations-page.tsx:270:          <Pencil aria-hidden="true" className="size-4" />
src/lib/category-icon-names.ts:9: * Pets & Animals' `PawPrint`, `MoreHorizontal` on all fourteen catch-alls, and
src/lib/category-icon-names.ts:97:  "MoreHorizontal",
src/lib/category-icon-names.ts:165:export const CATCHALL_ICON_NAME = "MoreHorizontal";
src/features/admin-locations/location-verb-bar.tsx:130:            <Trash2 aria-hidden="true" className="size-4" />,
src/features/admin-coverage/coverage-page.tsx:165:          <Pencil aria-hidden="true" className="size-4" />
src/features/admin-categories/categories-page.tsx:8:  Pencil,
src/features/admin-categories/categories-page.tsx:11:  Trash,
src/features/admin-categories/categories-page.tsx:12:  Trash2,
src/features/admin-categories/categories-page.tsx:620:          <Pencil aria-hidden="true" className="size-4" />
src/features/admin-categories/categories-page.tsx:774:                    <Trash2 aria-hidden="true" className="size-4" />,
src/features/admin-categories/categories-page.tsx:798:                    <Trash aria-hidden="true" className="size-4" />,
src/features/admin-attributes/attributes-page.tsx:7:  MoreHorizontal,
src/features/admin-attributes/attributes-page.tsx:8:  Pencil,
src/features/admin-attributes/attributes-page.tsx:9:  Trash,
src/features/admin-attributes/attributes-page.tsx:400:              <MoreHorizontal aria-hidden="true" className="size-4" />
src/features/admin-attributes/attributes-page.tsx:427:            <MoreHorizontal aria-hidden="true" className="size-4" />
src/features/admin-attributes/attributes-page.tsx:437:              <Pencil aria-hidden="true" className="size-4" />
src/features/admin-attributes/attributes-page.tsx:467:              <Trash aria-hidden="true" className="size-4" />
src/features/admin-countries/countries-page.tsx:223:          <Pencil aria-hidden="true" className="size-4" />
src/components/ui/pagination.tsx:84:    <MoreHorizontal className="h-4 w-4" />
src/components/ui/breadcrumb.tsx:87:    <MoreHorizontal className="h-4 w-4" />
src/components/shell/category-glyphs.ts:81:  MoreHorizontal,
src/components/shell/category-glyphs.ts:236:  MoreHorizontal,
```

## E. Tables and lists

Search: `rg -n '<DataTable\b' src` and `rg -n '<table\b|<Table\b' src`
DataTable uses: 13
```text
src/routes/dev.primitives.tsx:400:        <DataTable
src/features/admin-locations/locations-page.tsx:294:          <DataTable<LocationNode>
src/features/admin-countries/countries-page.tsx:232:          <DataTable<CountryRow>
src/features/admin-attributes/attributes-page.tsx:511:          <DataTable<AttributeRow>
src/features/admin-categories/categories-page.tsx:837:          <DataTable<CategoryNode>
src/features/admin-coverage/coverage-page.tsx:188:          <DataTable<CoveragePlanRow>
src/features/admin/users/users-list.tsx:220:      <DataTable
src/features/admin/roles/roles-list.tsx:85:      <DataTable<RoleSummary>
src/features/admin/translations/data-scope.tsx:202:      <DataTable
src/features/admin/translations/languages-page.tsx:469:      <DataTable
src/features/admin/translations/strings-page.tsx:345:              <DataTable
src/features/admin/impersonation/impersonation-view.tsx:178:      <DataTable
src/features/admin/audit/audit-page.tsx:247:      <DataTable
```
Hand-built tables: 1
```text
src/components/shell/data-table.tsx:407:          <table
```
DataTable props surface:
```text
61:  key: string;
62:  header: ReactNode;
63:  cell: (row: T) => ReactNode;
64:  priority: ColumnPriority;
65:  align?: "start" | "end";
67:  width?: string;
75:  minWidth?: string;
77:  sortable?: boolean;
81:  selectedKeys: string[];
82:  onToggleRow: (row: T, selected: boolean) => void;
83:  onToggleAll: (selected: boolean) => void;
87:  columns: DataTableColumn<T>[];
88:  rows: T[];
89:  rowKey: (row: T) => string;
90:  rowTestId: (row: T) => string;
97:  rowHref?: (row: T) => LinkProps;
100:  caption: string;
101:  emptyState: ReactNode;
102:  loading?: boolean;
103:  loadingState?: ReactNode;
104:  error?: unknown;
105:  errorState?: ReactNode;
107:  toolbar?: ReactNode;
109:  rowActions?: (row: T) => ReactNode;
118:  expandedRow?: (row: T) => ReactNode;
120:  selection?: DataTableSelection<T>;
122:  pagination?: ReactNode;
129:  page?: number;
130:  pageSize?: number;
131:  sortKey?: string;
132:  sortDirection?: "asc" | "desc";
133:  onSort?: (key: string) => void;
139:  cardUntil?: CardUntil;
145:  stickyFirstColumn?: boolean;
146:  className?: string;
150:  column: DataTableColumn<unknown>,
151:  sticky: false | "start-0" | "start-10" = false,
180:  offset: number;
181:  pageSize: number;
182:  total: number;
187:  totalLabel?: string;
188:  onPrevious: () => void;
189:  onNext: () => void;
190:  testid?: string;
229:  rows: allRows,
488:                            role: "link",
489:                            tabIndex: 0,
490:                            onClick: go,
491:                            onKeyDown: (event: KeyboardEvent<HTMLTableRowElement>) => {
```

## F. Status marks

Search: `rg -n '<Badge\b' src`
Count: 27
```text
src/routes/dev.primitives.tsx:116:  { label: "Account status", value: <Badge variant="secondary">{"active"}</Badge> },
src/routes/dev.primitives.tsx:122:          <Badge key={chip} variant="outline">
src/routes/dev.primitives.tsx:201:            <Badge key={chip} variant="outline">
src/routes/dev.primitives.tsx:221:        <Badge variant={row.status === "deactivated" ? "destructive" : "secondary"}>
src/routes/dev.primitives.tsx:235:            <Badge key={role} variant="outline">
src/features/admin/users/users-list.tsx:19:    <Badge variant={status === "deactivated" ? "destructive" : "secondary"}>
src/features/admin/users/users-list.tsx:31:        <Badge key={role} variant="outline">
src/features/admin/users/user-detail.tsx:176:              <Badge data-testid="user-status" variant={deactivated ? "destructive" : "secondary"}>
src/features/admin/users/user-detail.tsx:276:                      <Badge variant="outline" data-testid={`role-chip-${role}`}>
src/components/shell/tip-badge.tsx:32:    <Badge
src/features/admin/translations/strings-page.tsx:544:          <Badge variant="outline" data-testid={`string-status-${slug(row.key)}`}>
src/features/admin/translations/strings-page.tsx:548:            <Badge variant="destructive" data-testid={`string-flagged-${slug(row.key)}`}>
src/features/admin/translations/strings-page.tsx:762:        <Badge
src/features/admin/translations/languages-page.tsx:302:            <Badge variant="outline" className="shrink-0" data-testid={`lang-base-${row.code}`}>
src/features/admin/translations/languages-page.tsx:307:            <Badge variant="outline" className="shrink-0" data-testid={`lang-rtl-${row.code}`}>
src/features/admin-categories/category-dialogs.tsx:886:                  <Badge
src/features/admin-locations/location-form-fields.tsx:176:            <Badge key={entry} variant="outline" data-testid={`location-alias-chip-${index}`}>
src/features/admin-categories/categories-page.tsx:444:              <Badge variant="outline" data-testid={`category-parent-primary-${row.slug}`}>
src/features/admin/translations/data-scope.tsx:339:        <Badge variant="outline" data-testid={`entity-status-${entityRowSlug(row)}`}>
src/features/admin/roles/role-detail.tsx:110:        <Badge variant={role.isSystem ? "secondary" : "outline"}>
src/features/admin/roles/roles-list.tsx:56:        <Badge variant={role.isSystem ? "secondary" : "outline"}>
src/features/admin/roles/permission-matrix.tsx:140:                            <Badge variant="outline">{t("admin.roles.perm.stepUp")}</Badge>
src/features/admin/roles/permission-matrix.tsx:143:                            <Badge variant="secondary">{t("admin.roles.perm.granted")}</Badge>
src/features/admin/roles/permission-matrix.tsx:146:                            <Badge
src/features/admin/translations/history-drawer.tsx:160:                    <Badge variant="outline" data-testid={`history-action-${testId}-${index}`}>
src/features/admin/translations/history-drawer.tsx:166:                    <Badge variant="secondary" data-testid={`history-prev-${testId}-${index}`}>
src/features/admin/translations/history-drawer.tsx:172:                    <Badge variant="outline">
```

## G. Switches, tick-boxes and fields

### <Switch\b — 4
```text
src/features/posting/step-review.tsx:557:          <Switch
src/features/admin/translations/languages-page.tsx:408:          <Switch
src/features/admin/translations/languages-page.tsx:446:            <Switch
src/features/admin/translations/languages-page.tsx:786:            <Switch
```
### <Checkbox\b — 17
```text
src/components/shell/data-table.tsx:360:                    <Checkbox
src/components/shell/data-table.tsx:421:                    <Checkbox
src/components/shell/data-table.tsx:509:                          <Checkbox
src/features/admin/translations/translator-card.tsx:129:                <Checkbox
src/features/admin-attributes/attribute-dialogs.tsx:706:                <Checkbox
src/features/admin-attributes/category-attributes-dialog.tsx:248:                  <Checkbox
src/features/admin-attributes/category-attributes-dialog.tsx:275:                  <Checkbox
src/features/admin-attributes/category-attributes-dialog.tsx:300:                  <Checkbox
src/features/admin-attributes/components/attribute-allowed-values.tsx:113:                      <Checkbox
src/features/admin-attributes/components/attribute-link-cells.tsx:175:            <Checkbox
src/features/admin-attributes/components/attribute-link-cells.tsx:290:            <Checkbox
src/features/admin-attributes/components/attribute-link-cells.tsx:333:                <Checkbox
src/features/admin-categories/category-form-fields.tsx:250:        <Checkbox
src/features/admin-categories/category-form-fields.tsx:258:        <Checkbox
src/features/admin-categories/category-form-fields.tsx:311:                    <Checkbox
src/features/admin-categories/category-dialogs.tsx:608:            <Checkbox
src/features/admin-attributes/components/attribute-option-row.tsx:146:          <Checkbox
```
### <FormField\b — 77
```text
src/components/ui/form.tsx:46:    throw new Error("useFormField should be used within <FormField>");
src/routes/dev.primitives.tsx:368:            <FormField
src/features/admin-locations/location-verb-dialogs.tsx:152:        <FormField
src/features/admin-locations/location-verb-dialogs.tsx:336:      <FormField label={t("admin.locations.delete.confirmLabel")} htmlFor="location-delete-confirm">
src/features/admin-locations/location-form-fields.tsx:78:      <FormField label={t("admin.locations.field.name")} htmlFor={`${p}-name`}>
src/features/admin-locations/location-form-fields.tsx:98:      <FormField
src/features/admin-locations/location-form-fields.tsx:114:        <FormField label={t("admin.locations.field.iso")} htmlFor={`${p}-iso`}>
src/features/admin-locations/location-form-fields.tsx:124:      <FormField
src/features/admin-locations/location-form-fields.tsx:141:      <FormField label={t("admin.locations.field.centerLng")} htmlFor={`${p}-lng`}>
src/features/admin-locations/location-form-fields.tsx:151:      <FormField
src/features/admin-locations/location-form-fields.tsx:200:        <FormField label={t("admin.locations.field.order")} htmlFor={`${p}-order`}>
src/features/admin-locations/location-dialogs.tsx:200:      <FormField label={t("admin.locations.create.parent")} htmlFor="location-create-parent">
src/features/admin-coverage/coverage-dialogs.tsx:119:    <FormField label={t(label)} htmlFor={`${idPrefix}-${suffix}`} help={t(help)}>
src/features/admin/users/user-detail.tsx:495:      <FormField label={t("admin.users.edit.displayName")} htmlFor="edit-display-name">
src/features/admin/users/user-detail.tsx:507:      <FormField
src/features/admin/users/user-detail.tsx:526:        <FormField
src/features/admin/users/user-detail.tsx:540:      <FormField label={t("admin.users.edit.country")} htmlFor="edit-country">
src/features/admin-attributes/components/attribute-v2-fields.tsx:52:      <FormField
src/features/admin-attributes/components/attribute-v2-fields.tsx:65:      <FormField
src/features/admin-attributes/components/attribute-v2-fields.tsx:79:      <FormField
src/features/admin-attributes/components/attribute-v2-fields.tsx:91:      <FormField
src/features/admin-attributes/components/attribute-v2-fields.tsx:103:      <FormField
src/features/admin-attributes/components/attribute-v2-fields.tsx:126:      <FormField
src/features/admin-attributes/components/attribute-v2-fields.tsx:190:      <FormField
src/features/admin-attributes/components/attribute-v2-fields.tsx:213:        <FormField label={t("admin.attributes.field.presetN")} htmlFor="attribute-preset-n">
src/features/admin-attributes/components/attribute-v2-fields.tsx:225:          <FormField label={t("admin.attributes.field.presetA")} htmlFor="attribute-preset-a">
src/features/admin-attributes/components/attribute-v2-fields.tsx:234:          <FormField label={t("admin.attributes.field.presetB")} htmlFor="attribute-preset-b">
src/features/admin-attributes/components/attribute-v2-fields.tsx:245:      <FormField
src/features/admin-attributes/components/attribute-option-rows.tsx:114:        <FormField label={t("admin.attributes.options.search")} htmlFor="option-search">
src/features/admin-attributes/components/attribute-option-rows.tsx:124:          <FormField
src/features/admin-coverage/coverage-create-dialog.tsx:81:      <FormField
src/features/admin-attributes/components/attribute-option-row.tsx:96:          <FormField label={t("admin.attributes.options.value")} htmlFor={`option-value-${index}`}>
src/features/admin-attributes/components/attribute-option-row.tsx:119:          <FormField label={t("admin.attributes.options.labelEn")} htmlFor={`option-en-${index}`}>
src/features/admin-attributes/components/attribute-option-row.tsx:131:          <FormField label={t("admin.attributes.options.labelAm")} htmlFor={`option-am-${index}`}>
src/features/admin-categories/category-form-fields.tsx:132:      <FormField label={t("admin.categories.field.name")} htmlFor={`${p}-name`}>
src/features/admin-categories/category-form-fields.tsx:154:      <FormField label={t("admin.categories.field.icon")} htmlFor={`${p}-icon`}>
src/features/admin-categories/category-form-fields.tsx:190:        <FormField label={t("admin.categories.create.parent")} htmlFor="category-create-parent">
src/features/admin-categories/category-form-fields.tsx:212:        <FormField label={t("admin.categories.create.position")} htmlFor="category-create-position">
src/features/admin-categories/category-form-fields.tsx:238:      <FormField label={t("admin.categories.field.lifetimeDays")} htmlFor={`${p}-expiry`}>
src/features/admin-categories/category-form-fields.tsx:269:          <FormField
src/features/admin-categories/category-form-fields.tsx:281:          <FormField
src/features/admin-categories/category-form-fields.tsx:296:            <FormField
src/features/admin-categories/category-dialogs.tsx:397:              <FormField
src/features/admin-categories/category-dialogs.tsx:527:      <FormField label={t("admin.categories.window.from")} htmlFor="category-window-from">
src/features/admin-categories/category-dialogs.tsx:536:      <FormField label={t("admin.categories.window.until")} htmlFor="category-window-until">
src/features/admin-categories/category-dialogs.tsx:686:        <FormField
src/features/admin-categories/category-dialogs.tsx:771:      <FormField label={t("admin.categories.pointer.parent")} htmlFor="category-pointer-parent">
src/features/admin-categories/category-dialogs.tsx:945:      <FormField label={t("admin.categories.paths.add")} htmlFor="category-paths-add">
src/features/admin-categories/category-dialogs.tsx:1031:      <FormField label={t("admin.categories.delete.confirmLabel")} htmlFor="category-delete-slug">
src/features/admin-attributes/attribute-dialogs.tsx:338:      <FormField
src/features/admin-attributes/attribute-dialogs.tsx:350:      <FormField
src/features/admin-attributes/attribute-dialogs.tsx:362:      <FormField label={t("admin.attributes.field.type")} htmlFor="attribute-type">
src/features/admin-attributes/attribute-dialogs.tsx:386:        <FormField
src/features/admin-attributes/attribute-dialogs.tsx:437:              <FormField
src/features/admin-attributes/attribute-dialogs.tsx:478:      <FormField
src/features/admin-attributes/attribute-dialogs.tsx:491:      <FormField
src/features/admin-attributes/attribute-dialogs.tsx:592:      <FormField
src/features/admin-attributes/attribute-dialogs.tsx:680:      <FormField label={t("admin.attributes.merge.target")} htmlFor="attribute-merge-target">
src/features/admin-attributes/attribute-dialogs.tsx:824:      <FormField label={t("admin.attributes.assign.category")} htmlFor="attribute-assign-picker">
src/features/admin-attributes/attribute-dialogs.tsx:914:          <FormField
src/features/admin/translations/languages-page.tsx:745:        <FormField label={t("admin.translations.add.pick")} full>
src/features/admin/translations/languages-page.tsx:757:          <FormField label={t("admin.translations.add.code")} htmlFor="add-language-code">
src/features/admin/translations/languages-page.tsx:766:          <FormField label={t("admin.translations.add.nameEn")} htmlFor="add-language-name-en">
src/features/admin/translations/languages-page.tsx:774:          <FormField
src/features/admin/translations/languages-page.tsx:785:          <FormField label={t("admin.translations.add.rtl")} htmlFor="add-language-rtl">
src/features/admin/translations/languages-page.tsx:794:          <FormField
src/features/admin/impersonation/impersonation-starter.tsx:81:      <FormField label={t("impersonation.reasonLabel")} htmlFor="impersonation-reason">
src/features/admin/roles/roles-list.tsx:198:          <FormField
src/features/admin/roles/roles-list.tsx:210:          <FormField label={t("admin.roles.create.displayName")} htmlFor="role-display">
src/features/admin/roles/roles-list.tsx:218:          <FormField
src/features/admin/roles/role-detail.tsx:158:          <FormField label={t("admin.roles.col.name")} htmlFor="role-key">
src/features/admin/roles/role-detail.tsx:161:          <FormField label={t("admin.roles.create.displayName")} htmlFor="role-display-edit">
src/features/admin/roles/role-detail.tsx:169:          <FormField
src/features/admin-countries/country-dialogs.tsx:122:      <FormField label={t("admin.countries.field.name")} htmlFor={`${idPrefix}-name`}>
src/features/admin-countries/country-dialogs.tsx:130:      <FormField label={t("admin.countries.field.unit")} htmlFor={`${idPrefix}-unit`}>
src/features/admin-countries/country-dialogs.tsx:145:      <FormField
src/features/admin-countries/country-dialogs.tsx:157:      <FormField label={t("admin.countries.field.order")} htmlFor={`${idPrefix}-order`}>
```
### <Field\b — 14
```text
src/features/posting/step-review.tsx:568:          <Field
src/features/posting/step-pricing.tsx:447:          <Field
src/features/posting/step-pricing.tsx:550:          <Field
src/features/posting/step-pricing.tsx:616:        <Field
src/features/posting/step-pricing.tsx:659:        <Field
src/features/posting/step-photos.tsx:450:      <Field
src/features/posting/step-details.tsx:250:      <Field
src/features/posting/step-details.tsx:289:      <Field
src/features/admin/users/user-detail.tsx:135:              <Field label={t("admin.users.col.email")} value={user.email} testid="user-email" />
src/features/admin/users/user-detail.tsx:136:              <Field label={t("admin.users.detail.alias")} value={user.sellerAlias ?? "—"} />
src/features/admin/users/user-detail.tsx:137:              <Field label={t("admin.users.col.country")} value={user.homeCountryCode ?? "—"} />
src/features/admin/users/user-detail.tsx:138:              <Field label={t("admin.users.detail.joined")} value={when(user.createdAt)} />
src/features/admin/users/user-detail.tsx:139:              <Field
src/features/posting/step-specifications.tsx:1345:          <Field
```
### <FormSection\b — 7
```text
src/features/admin/roles/roles-list.tsx:158:        <FormSection
src/features/admin/roles/role-detail.tsx:125:        <FormSection
src/features/admin/translations/languages-page.tsx:543:    <FormSection
src/features/admin/translations/languages-page.tsx:659:    <FormSection
src/features/admin/users/user-detail.tsx:443:    <FormSection
src/routes/dev.primitives.tsx:352:        <FormSection
src/features/admin/impersonation/impersonation-starter.tsx:32:    <FormSection
```
### <Label\b — 3
```text
src/features/posting/map/map-pin-dropper.tsx:349:            <Label htmlFor="post-pin-search">{t("post.pin.searchLabel")}</Label>
src/features/posting/map/map-pin-dropper.tsx:473:            <Label htmlFor="post-pin-street">{t("post.where.detailsLabel")}</Label>
src/components/ui/form.tsx:93:    <Label
```

## H. The frame

### src/components/app-shell.tsx
```text
52:    <div className="rounded-lg border border-border bg-card p-6">
81: * width (16rem) and whose first row is the top-bar height (4rem):
110:  const { user, loading: authLoading, signOut } = useAuth();
121:   *   (a) the SAVED AREA cookie `ethio_area` ("<CC>:<node id>", so the country
128:   * The GUESS IS NEVER WRITTEN to the cookie; only a pick is.
155:  // I3 — one stable object per cookie VALUE, never a fresh one per render.
252:   * there is no anchor and — decisively — NO cookie write, so the saved area can
272:   * deepest resolved place. The cookie is untouched — only a pick writes it
312:  /** The hard reset drops the client-side selection; the cookie is untouched. */
412:   *   (a) supabase.auth.signOut() — the repo's existing default scope
445:        await signOut();
450:         * EVERY AUTH-DERIVED READ. Mechanism: every auth-context query key
466:    [signOut, queryClient, navigate, resetLocationState],
620:          className="fixed inset-x-2 bottom-2 z-50 mx-auto flex max-w-md flex-col gap-2 rounded-lg border border-border bg-card p-3 shadow-lg sm:flex-row sm:items-center sm:justify-between"
629:            className="min-h-11 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
641:          className="fixed inset-x-2 bottom-2 z-50 mx-auto flex max-w-md items-center justify-between gap-2 rounded-lg border border-border bg-card p-3 shadow-lg"
648:            className="min-h-11 rounded-md px-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
655:          A sticky grid item's clamp rectangle is the GRID CONTAINER, so with
659:      <div className="flex min-h-screen flex-col bg-background">
661:            geometry (U0g-2): the band and the rail are position:fixed and the
668:        <div className="grid min-w-0 max-w-full flex-1 grid-cols-1 grid-rows-[auto_1fr] md:block">
671:            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
678:              wrapper becomes a fixed 4rem-tall strip spanning the viewport,
680:              x=0 (4rem when the rail is collapsed), top bar filling the rest.
681:              Painted geometry is identical to the old sticky band. */}
684:            className="contents md:fixed md:inset-x-0 md:top-0 md:z-30 md:flex md:h-16"
688:              className="hidden min-w-0 border-b border-e border-border bg-card px-4 md:flex md:h-16 md:w-64 md:shrink-0 md:items-center md:[html[data-rail=collapsed]_&]:w-16 md:[html[data-rail=co
697:                <span className="inline-flex md:[html[data-rail=collapsed]_&]:hidden">
700:                <span className="hidden md:[html[data-rail=collapsed]_&]:inline-flex">
709:            bar and the strip under it. min-w-0 is load-bearing — without it this
711:            overflows horizontally at 360px (INC-032).
715:              className="col-start-1 row-start-1 min-w-0 bg-card md:h-16 md:flex-1"
721:          {/* Rail: mobile drawer; md+ fixed beneath the band. */}
726:              overflow-y, no h-screen/max-h cap (the wrapper is min-h-screen),
727:              and the band and rail are position:fixed, so they impose no
728:              height bound on the flow. Adding overflow + a bounded height here
733:            className="col-start-1 row-start-2 flex min-w-0 flex-col md:ms-64 md:pt-16 md:[html[data-rail=collapsed]_&]:ms-16"
743:            <main id="main" className="min-w-0 flex-1 px-3 py-4 md:px-4">
754:        {/* U0h — the footer PAINTS OVER the fixed rail. Its BOX spans the whole
762:            stay in the readable content column. Mobile: unchanged (no fixed
766:          className="relative z-40 w-full bg-card md:[&>footer>*]:ps-64 md:[html[data-rail=collapsed]_&>footer>*]:ps-16"
```
### src/components/shell/app-header.tsx
```text
32:  "inline-flex min-h-11 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:
55:      className="w-full border-b border-border bg-card px-3 py-2 md:px-4"
62:          className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
72:          className="min-h-11 w-full rounded-md border border-input bg-background ps-9 pe-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-
78:          className="absolute end-1 top-1/2 inline-flex h-10 w-9 -translate-y-1/2 items-center justify-center rounded text-muted-foreground hover:text-foreground"
80:          <X className="h-4 w-4" aria-hidden="true" />
99: * Height: the bar fills grid row 1 (4rem) from md up (`md:h-full`), so its top
106:  const { collapsed, toggle } = useRailCollapsed();
110:    <div className="w-full min-w-0 md:h-full">
111:      <header className="flex h-14 w-full min-w-0 items-center gap-1 border-b border-border bg-card px-2 md:h-full md:gap-2 md:px-4">
115:          className={cn(ICON_BUTTON, "md:hidden")}
118:          <Menu className="h-5 w-5" aria-hidden="true" />
121:            reserved for the collapsed rail. md+ shows it in the corner cell. */}
125:          className="inline-flex min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
130:        {/* md+ ONLY: the rail collapse control, top-left of the bar and BEFORE
138:          aria-pressed={collapsed === true}
139:          aria-label={collapsed ? t("shell.expandRail") : t("shell.collapseRail")}
142:          // `${ICON_BUTTON} hidden md:inline-flex` left TWO base display
146:          className={cn(ICON_BUTTON, "hidden md:inline-flex")}
148:          {collapsed ? (
149:            <PanelLeftOpen className="h-4 w-4" aria-hidden="true" />
151:            <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
155:        {/* md+ AND collapsed rail ONLY (INC-045/INC-048): the corner cell shows
156:            the icon-only mark when the rail is collapsed, so the LOCKUP —
167:          className="hidden min-h-11 shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:[html[data-rail=collapsed]_&]:inline-flex"
178:          className="hidden min-w-0 flex-1 md:block md:max-w-[13rem] lg:max-w-xs xl:max-w-sm"
185:              className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
191:              className="min-h-11 w-full rounded-md border border-input bg-background ps-9 pe-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:r
198:            `md:ms-auto` pushes it flush right (Apex pattern). */}
201:          className="flex min-w-0 flex-1 items-center justify-end gap-0.5 md:ms-auto md:flex-none md:shrink-0 md:gap-2"
209:            className={cn(ICON_BUTTON, "md:hidden")}
212:            <Search className="h-4 w-4" aria-hidden="true" />
223:                  className="inline-flex min-h-11 min-w-0 shrink-0 items-center gap-2 rounded-md px-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-non
225:                  <Avatar className="h-7 w-7">
227:                      <User className="h-4 w-4" aria-hidden="true" />
230:                  <span className="hidden max-w-[10rem] truncate md:inline">
242:                    <User className="me-2 h-4 w-4" aria-hidden="true" />
248:                    <SettingsIcon className="me-2 h-4 w-4" aria-hidden="true" />
257:                  <LogOut className="me-2 h-4 w-4" aria-hidden="true" />
258:                  {t("auth.signOut")}
265:              className="inline-flex min-h-11 shrink-0 items-center rounded-md bg-primary px-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visi
```
### src/components/shell/app-rail.tsx
```text
31: * Layout keys off `html[data-rail="collapsed"]`, which the pre-paint script in
32: * AppShell has already written, so the collapsed rail is correct on the FIRST
37: * Every `md:[html[data-rail=collapsed]_&]:` below is therefore desktop-only by
40:const HIDE_WHEN_COLLAPSED = "md:[html[data-rail=collapsed]_&]:hidden";
43:  "flex min-h-11 w-full items-center gap-2 rounded-md pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
44:  "ps-[var(--rail-pad)] md:[html[data-rail=collapsed]_&]:justify-center md:[html[data-rail=collapsed]_&]:ps-0 md:[html[data-rail=collapsed]_&]:pe-0";
61:/** True only after hydration on a collapsed desktop rail. */
75: * So: the non-collapsed branch returns `children` UNWRAPPED (no Fragment), and
81:  const collapsed = useContext(CollapsedContext);
82:  if (!collapsed) return children as React.ReactElement;
122: * leaf row. Depth adds start-padding only, so the 44px tap target and the
137:      {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
188:              receive a ref-holding child, and WithTooltip's collapsed branch
207:                    "ms-auto h-4 w-4 shrink-0 transition-transform",
304:    // A row with NO stored name keeps the slug map: the collapsed rail is
315:    // tree uses. useCategories currently returns top-level nodes only, so this
324:          "px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
348:                <div className="flex min-h-11 items-center gap-2 px-3">
349:                  <span className="h-4 w-4 shrink-0 animate-pulse rounded bg-muted" />
351:                    className={cn("h-3 w-24 animate-pulse rounded bg-muted", HIDE_WHEN_COLLAPSED)}
358:          <li className={cn("px-3 text-sm text-muted-foreground", HIDE_WHEN_COLLAPSED)}>
421:                "px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
452: * works and stays the canonical path. Both call the same signOut().
466:    <div className="mt-auto flex flex-col gap-0.5 border-t border-border pt-2">
467:      <WithTooltip label={t("auth.signOut")}>
471:          aria-label={t("auth.signOut")}
479:          <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
480:          <span className={cn("truncate", HIDE_WHEN_COLLAPSED)}>{t("auth.signOut")}</span>
495:  const { collapsed } = useRailCollapsed();
500:      <CollapsedContext.Provider value={collapsed === true}>
503:          // U0g-2 — FIXED, never sticky: the rail must not move at any scroll
505:          // `--rail-bottom-inset`, how far the footer has scrolled into view,
507:          // fixed calc() height dropped (top-16 + bottom inset size it), the
510:          style={{ "--rail-bottom-inset": `${footerInset}px` } as React.CSSProperties}
511:          className="hidden min-h-0 min-w-0 flex-col border-e border-border bg-sidebar p-2 md:fixed md:start-0 md:top-16 md:bottom-[var(--rail-bottom-inset,0px)] md:z-20 md:flex md:h-auto md:w-64 
515:              collapsed rail, where there is no room for a name. */}
518:              the panel band above stay fixed; RailFoot below stays pinned. */}
521:            className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
531:        <SheetContent side="left" className="flex w-72 flex-col bg-sidebar p-4">
532:          <SheetHeader className="p-0">
534:                same h-14 height and the same `border-b border-border` divider
539:              className="-mx-4 -mt-4 flex h-14 items-center justify-center border-b border-border px-4"
548:          <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4">
552:              className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
```
### src/components/shell/panel-tabs.tsx
```text
10: * Replaces the old top-bar dropdown. Rendered ONLY when the user is signed in
33:      // INC-056: the row used to scroll horizontally (`overflow-x-auto`), which
35:      // each is `min-w-0 flex-1` and its label truncates, so the set always fits
36:      // and no axis ever overflows.
37:      className="flex w-full min-w-0 items-stretch gap-1 border-b border-border bg-card px-3 md:px-4"
51:              "inline-flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 border-b-2 px-2 text-sm transition-colors md:px-3",
58:            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
59:            <span className="min-w-0 truncate">{t(panel.labelKey)}</span>
```
### src/components/shell/breadcrumbs.tsx
```text
22: * The content top-line breadcrumb — band 4: Home › <panel> › <category path>.
30: * The path is currently one level deep because useCategories returns top-level
```
### src/components/shell/location-selector.tsx
```text
34: * SEAM (U7): choosing an area writes the scope and the saved-area cookie; the
74:            "inline-flex min-h-11 shrink-0 items-center gap-1 rounded-md px-2 text-sm",
83:          <span className="max-w-[9rem] truncate">{selectedName ?? t(labelKey)}</span>
84:          <ChevronDown className="h-4 w-4 shrink-0" aria-hidden="true" />
87:      <DropdownMenuContent align="start" className="max-h-72 overflow-y-auto">
200:      className="flex w-full flex-wrap items-center gap-x-1 gap-y-0 border-b border-border bg-card px-3 py-1 md:px-4"
202:      <span className="inline-flex min-h-11 shrink-0 items-center pe-1 text-muted-foreground">
203:        <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
208:        <span className="min-h-11 content-center text-sm text-muted-foreground">
214:          className="min-h-11 content-center text-sm text-muted-foreground"
219:        <span className="min-h-11 content-center text-sm text-muted-foreground">
252:              className="min-h-11 content-center ps-1 text-xs text-muted-foreground"
```
### src/components/shell/app-footer.tsx
```text
27:  "inline-flex min-h-11 items-center justify-center text-sm leading-tight text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded
34:    <footer className="w-full border-t border-border bg-card">
41:        className="mx-auto grid w-full max-w-3xl grid-cols-3 gap-4 px-4 py-2"
47:            className="min-w-0 text-center"
69:      <div className="border-t border-border px-4 py-2 text-center">
```
### src/components/layout/page-shell.tsx
```text
6:  narrow: "max-w-md",
7:  reading: "max-w-3xl",
8:  wide: "max-w-[96rem]",
9:  full: "max-w-none",
29:        "mx-auto w-full min-w-0 px-4 py-4 md:px-6 md:py-6 xl:px-8",
```
### src/config/panels.ts
```text
184: * top-level slugs, so a collapsed icon-only rail is readable WITHOUT hovering
```
Routes and PageShell width (search: `rg -n '<PageShell' src/routes`):
```text
src/routes/settings.tsx:278:<PageShell as="main" width="wide"
src/routes/settings.tsx:293:<PageShell as="main" width="wide" data-testid="settings-page-shell"
src/routes/auth.tsx:326:<PageShell as="main" width="narrow"
src/routes/auth.tsx:393:<PageShell as="main" width="narrow"
src/routes/auth.tsx:418:<PageShell as="main" width="narrow"
src/routes/auth.tsx:488:<PageShell as="main" width="narrow"
```
Route files without PageShell:
- src/routes/__root.tsx
- src/routes/account.tsx
- src/routes/admin.attributes.tsx
- src/routes/admin.audit.tsx
- src/routes/admin.categories.tsx
- src/routes/admin.countries.tsx
- src/routes/admin.coverage.tsx
- src/routes/admin.images.tsx
- src/routes/admin.impersonation_.$sessionId.tsx
- src/routes/admin.index.tsx
- src/routes/admin.locations.tsx
- src/routes/admin.places.tsx
- src/routes/admin.roles.tsx
- src/routes/admin.roles_.$roleId.tsx
- src/routes/admin.translations.tsx
- src/routes/admin.translations_.$lang.tsx
- src/routes/admin.tsx
- src/routes/admin.users.tsx
- src/routes/admin.users_.$userId.tsx
- src/routes/auth_.callback.tsx
- src/routes/auth_.reset.tsx
- src/routes/c.$slug.tsx
- src/routes/dev.primitives.tsx
- src/routes/dev.tall.tsx
- src/routes/index.tsx
- src/routes/post.tsx
- src/routes/post_.$listingId.tsx

## I. Corners, borders, shadows

### `rounded(-[a-z0-9]+)?`
```text
    177 rounded-md
     27 rounded-full
     24 rounded-sm
     19 rounded-lg
     14 rounded
      4 rounded-none
      3 rounded-r
      3 rounded-l
      2 rounded-xl
      2 rounded-t
      1 rounded-tl
      1 rounded-s
      1 rounded-e
```
### `border-(?:[a-z]+(?:-[0-9]+)?)`
```text
     87 border-border
     59 border-input
     17 border-b
     15 border-t
     14 border-primary
     11 border-destructive
      6 border-transparent
      6 border-l
      6 border-dashed
      4 border-e
      3 border-r
      2 border-sidebar
      2 border-s-2
      2 border-ring
      2 border-amber-500
      1 border-y
      1 border-s-0
      1 border-gold
      1 border-collapse
      1 border-b-2
      1 border-b-0
```
### `shadow(-[a-z0-9]+)?`
```text
     13 shadow
     11 shadow-lg
     10 shadow-sm
      9 shadow-md
      3 shadow-none
      1 shadow-xs
      1 shadow-xl
```

## J. What pins today's look

### e2e/shell.spec.ts
```text
76:/** Law C2: every real touch target is at least 44px on its short axis. */
81:  expect(box!.height, `${name} height`).toBeGreaterThanOrEqual(44);
85: * U0i FOOTER-CLAMP LAW (md+). The aside's top is pinned under the 4rem band,
105:      height: aside.height,
111:  expect(Math.abs(measured.top - 64), "rail top is not pinned at 64").toBeLessThanOrEqual(1);
136:    .toBeLessThanOrEqual(2);
142:  test("mounts with header, rail slot and footer, logged out", async ({ page }, testInfo) => {
168:  test("feed renders its empty state", async ({ page }) => {
197:  test("language toggle renders Amharic (Ge'ez path)", async ({ page }) => {
199:    // ONE affordance at every width: the same trigger, whose menu shows the
204:    const narrow = (page.viewportSize()?.width ?? 0) < 768;
206:    const hidden = page.getByTestId(narrow ? "language-switcher-full" : "language-switcher-short");
208:    await expect(hidden).toBeHidden();
217:    expect(text.length).toBeGreaterThan(0);
225:  test("the vertical stack is ordered: top bar, location row, breadcrumbs, body", async ({
239:    expect(bar).toBeLessThan(location);
240:    expect(location).toBeLessThan(crumbs);
241:    expect(crumbs).toBeLessThan(heading);
244:  test("the location row cascades Country -> Region -> City, city selectable", async ({ page }) => {
316:  test("breadcrumb segments navigate the category path", async ({ page }) => {
341:  test("the marketplace breadcrumb is Home alone — no redundant panel segment", async ({
352:  test("the feed body is centred with equal left and right gutters", async ({ page }) => {
399:        if (!b) throw new Error(`INC-282: ${name} had no box (detached or hidden)`);
405:      const right = mainBox.x + mainBox.width - (box.x + box.width);
406:      expect(Math.abs(left - right), "feed container gutters are unequal").toBeLessThanOrEqual(1);
410:      const emptyRight = mainBox.x + mainBox.width - (empty.x + empty.width);
411:      expect(Math.abs(emptyLeft - emptyRight), "empty state is off-centre").toBeLessThanOrEqual(1);
417:  test("the feed still loads when the market tree cannot be fetched (INC-282)", async ({
445:  test("the self-drawing spinner renders while the feed loads", async ({ page }) => {
463:  test("footer columns are centred as a group and each is centred", async ({ page }) => {
467:    const page_width = page.viewportSize()!.width;
469:    expect(Math.abs(group.x - (page_width - (group.x + group.width)))).toBeLessThanOrEqual(2);
482:    expect(Math.max(...tracks) - Math.min(...tracks)).toBeLessThanOrEqual(1);
484:    // Tightened rows: every link still owns a 44px tap box.
485:    const heights = await columns
487:      .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));
488:    expect(Math.min(...heights)).toBeGreaterThanOrEqual(44);
491:  test("feed grid reflows without clipping and never overflows", async ({ page }) => {
508:      const width = page.viewportSize()?.width ?? 0;
509:      const expected = width < 640 ? 1 : width < 1024 ? 2 : width < 1280 ? 3 : 4;
527:  test.skip(({ viewport }) => (viewport?.width ?? 0) < 768, "md and up only");
529:  test("logo cell sits exactly above the rail and beside the top bar", async ({ page }) => {
541:    // Logo cell owns the corner: same start edge and width as the rail...
543:    expect(Math.round(logo.width)).toBe(Math.round(rail.width));
544:    // ...and the same height/top as the bar it sits next to.
546:    expect(Math.round(logo.height)).toBe(Math.round(bar.height));
548:    expect(Math.round(bar.x)).toBe(Math.round(logo.x + logo.width));
550:    expect(Math.round(rail.y)).toBe(Math.round(logo.y + logo.height));
553:  test("the lockup's second line spans the wordmark exactly", async ({ page }) => {
560:    // FIT rule: same start edge, same width (1px tolerance for subpixel layout).
561:    expect(Math.abs(word!.x - sub!.x)).toBeLessThanOrEqual(1);
562:    expect(Math.abs(word!.width - sub!.width)).toBeLessThanOrEqual(1);
565:  test("rail submenus expand and collapse", async ({ page }) => {
580:  test("every rail row carries a leading icon on one gutter", async ({ page }) => {
585:    expect(count).toBeGreaterThan(0);
600:  test("category rows carry DISTINCT icons, not one repeated glyph", async ({ page }) => {
615:    expect(paths.size, "every category icon is identical").toBeGreaterThan(1);
618:  test("the rail collapses to icons, shows a tooltip, and remembers the choice", async ({
634:    expect(toggleBox.x).toBeLessThan(searchBox.x);
636:    // Default is EXPANDED: labels visible, full rail width.
640:    const wide = (await rail.boundingBox())!.width;
647:    const narrow = (await rail.boundingBox())!.width;
648:    expect(narrow).toBeLessThan(wide);
664:    expect((await rail.boundingBox())!.width).toBe(narrow);
672:  test("exactly one collapse toggle, and the wordmark moves into the bar when collapsed", async ({
703:    expect(toggleBox.x).toBeLessThan(wordBox.x);
704:    expect(wordBox.x).toBeLessThan(searchBox.x);
707:    expect(searchBox.x + searchBox.width).toBeLessThanOrEqual(langBox.x);
710:  test("the rail sign-out is absent for a logged-out visitor", async ({ page }) => {
716:test.describe("tablet chrome (md = 768px)", () => {
719:  test.use({ viewport: { width: 768, height: 1024 } });
721:  test("tablets get the persistent rail and the FULL controls", async ({ page }, testInfo) => {
741:    // INC-049: at tablet width the search field must not run into the language
745:    expect(searchBox.x + searchBox.width).toBeLessThanOrEqual(langBox.x);
746:    expect(langBox.width).toBeGreaterThan(40);
751:  test("the top bar is ONE band: logo-cell height AND background, location row separate", async ({
759:    expect(Math.round(bar.height)).toBe(Math.round(logo.height));
779:    expect(loc.y).toBeGreaterThanOrEqual(bar.y + bar.height);
784:  test("the toggle flips the mode and the surfaces actually change", async ({ page }) => {
805:  test.skip(({ viewport }) => (viewport?.width ?? 0) > 400, "mobile-360 only");
```
### e2e/admin-shell.spec.ts
```text
74:/** True on the 360px project; the drawer owns nav there, the rail on md+. */
76:  return (page.viewportSize()?.width ?? 0) < 768;
84:  test("A-1 admin fixture: gated section nav, section page + breadcrumb, deep link", async ({
91:    expect(expected.length, "admin role grants no admin sections").toBeGreaterThan(0);
181:  test("A-2 moderator fixture: exactly one section (audit), other deep links refused, admin tab still visible", async ({
238:  test("A-4 admin TAB from marketplace navigates to /admin (INC-071)", async ({ page }) => {
257:  test("A-3 regular user: /admin still redirects home", async ({ page }) => {
278:  test("A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one", async ({
282:    expect(grouped.length, "the categories group census drifted").toBeGreaterThan(1);
288:    expect(visible.length, "admin holds no grouped section").toBeGreaterThan(0);
```
### e2e/layout.spec.ts
```text
15:    .evaluate((node) => node.getBoundingClientRect().width / innerWidth);
18:test("LY-1 wide pages use most of the desktop content width", async ({ page }, testInfo) => {
31:    ).toBeGreaterThanOrEqual(0.6);
35:test("LY-2 mobile pages do not overflow", async ({ page }, testInfo) => {
54:test("LY-3 wizard actions are sticky only below md", async ({ page }, testInfo) => {
63:test("LY-4 wizard aside is desktop-only", async ({ page }, testInfo) => {
71:test("LY-5 Account tab opens the overview and profile card", async ({ page }) => {
```
### e2e/primitives-law.spec.ts
```text
15:  { name: "360", width: 360, height: 800 },
16:  { name: "768", width: 768, height: 1024 },
17:  { name: "1280", width: 1280, height: 800 },
38:  ).toBeLessThanOrEqual(measured.innerWidth);
43:    test(`primitives fit and adapt at ${viewport.name}`, async ({ page }) => {
44:      await page.setViewportSize({ width: viewport.width, height: viewport.height });
58:        expect(measured.scrollWidth, `${testid} scrolls horizontally`).toBeLessThanOrEqual(
66:      expect(table.scrollWidth, "data-table last-resort scroller is active").toBeLessThanOrEqual(
71:      if (viewport.width < 768) {
78:      expect(joinedVisible, "detail columns must only show at 1280").toBe(viewport.width >= 1280);
86:      const expected = viewport.width >= 1280 ? 4 : viewport.width >= 768 ? 3 : 2;
89:      // L5 — FormSection actions bar: sticky at 360, static from md.
93:      expect(position).toBe(viewport.width < 768 ? "sticky" : "static");
110:  test("L8 rowHref navigates from the table row, the card and the keyboard", async ({ page }) => {
111:    await page.setViewportSize({ width: 1280, height: 800 });
126:    await page.setViewportSize({ width: 360, height: 800 });
134:    test(`primitives render their ${state} state`, async ({ page }) => {
135:      await page.setViewportSize({ width: 360, height: 800 });
161:   * declared column min-widths. L3's default-table case above is untouched.
164:    test(`L9 cardUntil=lg keeps cards at ${viewport.name} until lg`, async ({ page }) => {
165:      await page.setViewportSize({ width: viewport.width, height: viewport.height });
169:      if (viewport.width < 1024) {
175:        // The min-width contract lives on the primitive's own scroller.
189:   * twin is live and its declared min-widths exceed the column, so the
193:  test("L10 the primitive scroller engages and reaches the last cell", async ({ page }) => {
194:    await page.setViewportSize({ width: 1024, height: 800 });
204:      .toBeGreaterThan(0);
233:          width: Math.round(node.getBoundingClientRect().width),
256:  test("L11 wide columns hide below xl and the first column stays pinned", async ({ page }) => {
257:    await page.setViewportSize({ width: 1024, height: 800 });
268:    // column's own width), or the row drifts out from under its header on the
286:    expect(Math.abs((after?.x ?? 0) - (before?.x ?? 0))).toBeLessThan(2);
289:    await page.setViewportSize({ width: 1440, height: 800 });
```
### e2e/shell-table-law.spec.ts
```text
34:  test("admin tables never overflow horizontally", async ({ page }) => {
41:    const original = page.viewportSize() ?? { width: 1280, height: 800 };
44:    await page.setViewportSize({ width: 360, height: 740 });
51:    await page.setViewportSize({ width: 768, height: 1024 });
57:    await page.setViewportSize({ width: 1280, height: 800 });
65:    expect(inner.scrollWidth, "data-table has an inner horizontal scroll").toBeLessThanOrEqual(
76:    expect(rowBox.width, "row is wider than its container").toBeLessThanOrEqual(
77:      containerBox.width + 1,
93:  ).toBeLessThanOrEqual(measured.innerWidth);
```
### e2e/a11y.spec.ts
```text
58:  test("A11Y-1 marketplace home and sign-in @a11y", async ({ page }) => {
65:  test("A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y", async ({ page }) => {
```
### scripts/check-datatable-minwidth.sh
```text
5:# (`priority`) plus a proportional `width`, never as a `minWidth`. Min-widths
11:#     minWidth: "min-w-[12rem]", // C7-dense: fixed-width money ledger
16:# Usage: check-datatable-minwidth.sh [target-dir]   (default: src)
22:echo " ENFORCING: DataTable min-width guard — tiers, not min-widths"
35:grep -RnE "^[[:space:]]*minWidth[[:space:]]*:" \
50:  echo "FAIL: declare a column tier + proportional width, or justify the"
51:  echo "      min-width on the same line with '// C7-dense: <reason>'."
```
Component tests beside the blocks:
```text
src/components/language-switcher-compact.test.tsx
src/components/language-switcher-star.test.tsx
src/components/language-switcher.test.tsx
src/components/searchable-picker.test.tsx
src/components/shell/data-table.test.tsx
src/components/shell/location-selector-order.test.tsx
```
Written laws naming a size, colour, breakpoint or row action (search: `rg -n '44 ?px|360|768|1024|1280|\bmd\b|\blg\b|edit icon|verb bar|token' docs/features docs/governance/lovable-knowledge.md`):
Count: 227
```text
docs/governance/lovable-knowledge.md:6:ARCHITECTURE TanStack Start (SSR React) + Tailwind. Backend: the CONNECTED EXTERNAL Supabase; publishable key only in the browser; schema truth = /supabase/migrations (append-only). DEC-020: commits la
docs/governance/lovable-knowledge.md:11:C. MOBILE-FIRST UI C1 Design at 360px first; verify 360/768/1024/1280. C2 Touch targets ≥44px; primary actions near the bottom; nothing relies on hover. C3 Design-system tokens only. C4 Every screen
docs/governance/lovable-knowledge.md:17:F. SECURITY F1 Secrets never in code/comments/commits; service-role never client-side; server-route secrets read from server env inside the handler (never VITE_). F2 Validate input server-side; render
docs/governance/lovable-knowledge.md:21:H. DOCUMENTATION H1 Structural changes update /docs/features/<name>.md and append one _changelog.md line in the same change; never renumber or delete. H2 No known-error debt: every violation a check s
docs/features/auth-password-recovery.md:77:`e2e/auth-reset.spec.ts` (mobile-360 only, like the other auth logic specs):
docs/features/translations.md:635:The switcher renders one ★ toggle per gated language (≥44px, `aria-pressed`,
docs/features/translations.md:821:flex line per language (check · label · star). The star keeps a ≥44px touch
docs/features/translations.md:822:target below `md` and shrinks to 36px above it (C2).
docs/features/translations.md:912:menu width is unchanged and the star keeps its own >=44px target.
docs/features/locations-console.md:12:(`docs/features/countries-console.md`) and **Coverage**, whose roster and editor
docs/features/locations-console.md:74:The roster is one `DataTable<LocationRow>` with `cardUntil="lg"`, keyed by row
docs/features/locations-console.md:92:**single 44px pencil**, `location-edit-<key>`, and the row itself opens the same
docs/features/locations-console.md:94:the end column and pushed the page sideways at 1280.
docs/features/locations-console.md:97:the fields, `location-editor-save`, and then the **verb bar**
docs/features/locations-console.md:210:| LT-8  | Every verb and the save button sit inside the viewport at 360 and 1280, with no horizontal scroll (CT-8 mirror)                        |
docs/features/design-foundation.md:88:Same skeleton at every breakpoint. Below `md` the rail is hidden and opens as a
docs/features/design-foundation.md:90:mode) from the header hamburger. Mobile-first at 360px; all controls ≥ 44px;
docs/features/design-foundation.md:95:See `docs/features/panels.md`. In short: religiously neutral tibeb geometry
docs/features/design-foundation.md:100:Mobile (360 primary, 768, 1280): no horizontal overflow on `/` or the feed at any
docs/features/design-foundation.md:101:of the three widths; every visible button and link ≥ 44px; no text under 11px; the
docs/features/design-foundation.md:102:rail is a drawer below `md` and persistent above; the feed grid reflows 1→2→3→4
docs/features/design-foundation.md:143:Tablet and desktop (`md` and up) are one CSS grid, not nested flex rows:
docs/features/design-foundation.md:158:ends). Below `md` the grid collapses to one column, the logo moves into the top
docs/features/design-foundation.md:161:**Top-bar height rule:** the bar carries no height of its own from `md` up
docs/features/design-foundation.md:162:(`md:h-full`); it FILLS grid row 1 (4rem), so its top and bottom edges are the
docs/features/design-foundation.md:182:the content's top line, not in the bar. All controls keep the 44px floor.
docs/features/design-foundation.md:195:children is a leaf row. Depth adds start-padding only, so the 44px target and
docs/features/design-foundation.md:232:### The `md` rule (768px) — phones minimize, nothing else does
docs/features/design-foundation.md:235:`md` (768px). Tablets are NOT phones.
docs/features/design-foundation.md:237:- **`md` and up** (tablets ~768px, desktops): persistent sidebar + FULL top-bar
docs/features/design-foundation.md:242:- **Below `md`** (phones only): the rail becomes the drawer, the bar minimizes to
docs/features/design-foundation.md:246:- **Top bar** is minimal and evenly distributed at 360px, full at `md`+. On
docs/features/design-foundation.md:253:  phones, `English ▾` (the language NAME) from `md` up. Its menu lists every
docs/features/design-foundation.md:258:  twice in the row. Filtering itself stays stubbed (location-scoping.md).
docs/features/design-foundation.md:272:  while every link's own box stays a 44px tap target. © row centred below.
docs/features/design-foundation.md:274:  44px tap target is untouched.
docs/features/design-foundation.md:295:- Exactly ONE sidebar affordance per breakpoint: hamburger below `md`, collapse
docs/features/design-foundation.md:296:  toggle at `md`+ (INC-046).
docs/features/design-foundation.md:297:- Footer link rows are tighter; anchors keep their 44px tap boxes (INC-047).
docs/features/design-foundation.md:300:language/theme/account cluster (768/1024/1280 all lay out clean, nothing clipped). When the
docs/features/design-foundation.md:303:every rail state. Footer links keep a 44px touch box under a visually tight row rhythm.
docs/features/design-foundation.md:320:The right-hand cluster (language, theme, account/sign-in) carries `md:ms-auto` so it sits
docs/features/design-foundation.md:321:flush against the bar's right edge at md+; the search field stays left of centre with its
docs/features/ci-status-reporter.md:10:docs/tracking/ci-status.md: commit SHA, overall conclusion, per-job table, UTC
docs/features/ci-status-reporter.md:12:docs/tracking/guards-last-failure.md (below). Both files land in one `[skip ci]`
docs/features/ci-status-reporter.md:17:Evidence lives on branch `ci-evidence` at `docs/tracking/<file>` — ci-status.md,
docs/features/ci-status-reporter.md:18:guards-last-failure.md, e2e-last-failure.md, flake-ledger.md, nightly-status.md and
docs/features/ci-status-reporter.md:19:nightly-last-failure.md. Read it with
docs/features/ci-status-reporter.md:20:`git fetch origin ci-evidence && git show origin/ci-evidence:docs/tracking/ci-status.md`.
docs/features/ci-status-reporter.md:25:## guards-last-failure.md (DEC-066)
docs/features/ci-status-reporter.md:59:2. ci.yml's push trigger `paths-ignore` lists both docs/tracking/ci-status.md and
docs/features/ci-status-reporter.md:60:   docs/tracking/guards-last-failure.md, so the status commit does not start a CI run.
docs/features/ci-status-reporter.md:67:docs/tracking/ci-status.md is the PRIMARY CI check, read on every verification clone.
docs/features/ci-status-reporter.md:80:1. docs/tracking/ci-status.md — the conclusion, plus the two-step SHA check above.
docs/features/ci-status-reporter.md:81:2. docs/tracking/e2e-last-failure.md — for a failed Playwright job.
docs/features/ci-status-reporter.md:82:3. docs/tracking/guards-last-failure.md — for every other failed job (build,
docs/features/ci-status-reporter.md:87:- The reporter does not report its own health. If its job fails, ci-status.md keeps
docs/features/ci-status-reporter.md:98:- guards-last-failure.md carries an extract, not the whole log: the 400-line budget
docs/features/location-scoping.md:42:ethio.com cutover behind the operator's zone (see `geography.md`).
docs/features/location-scoping.md:164:the item present in the DOM but never visible means the 360-pixel menu clips it
docs/features/location-scoping.md:167:a run names one: R3b-2 STEP 1 reproduced nothing (mobile-360 alone, mobile-360 +
docs/features/location-scoping.md:168:desktop-1280 under a four-worker load with the posting suite, and three
docs/features/auth-google-door.md:51:version change — see `docs/governance/launch-gate.md`.
docs/features/auth-google-door.md:85:Both run per push on `mobile-360` only, consistent with the other logic specs. Google is never
docs/features/coverage-console.md:12:ONE `DataTable` (`cardUntil="lg"`, row testid `coverage-<plan>`) over
docs/features/coverage-console.md:32:44px pencil per row (`coverage-edit-<plan>`) opens the EDITOR
docs/features/coverage-console.md:70:- `docs/features/countries-console.md` — the markets register in the same rail group.
docs/features/coverage-console.md:71:- `docs/features/locations-console.md` — the Places roster in the same rail group.
docs/features/step-up-auth.md:82:All copy under the `mfa.*` keys, EN + AM, 360-first, ≥44px targets, logical
docs/features/e2e-harness.md:4:Approach frozen by `docs/decisions/e2e-testing-investigation.md`.
docs/features/e2e-harness.md:10:| `playwright.config.ts`        | Two viewport projects (360×740, 1280×800), `retries: 0`, `webServer` = Vite dev server  |
docs/features/e2e-harness.md:23:bun run e2e:local -- e2e/<spec>.spec.ts --project=desktop-1280
docs/features/e2e-harness.md:93:already deny-proved in P1-a (`scripts/deny-tests/phase1-identity.md`, D1–D7); the E2E test itself
docs/features/e2e-harness.md:127:raced the submit (mobile-360 runs first and lost the race; desktop won it). The gate uses
docs/features/e2e-harness.md:306:A flaky test's first failed attempt is quoted in the merged report, with its error context uploaded even from a green job; see `docs/features/ci-guards.md` (DEC-078).
docs/features/e2e-harness.md:320:DEC-084 — Accessibility pass (2026-09-28). The smoke tier runs axe-core on the marketplace home, /auth, and wizard steps 1, 3 and 5, at mobile-360 and desktop-1280, and the report carries serious and criti
docs/features/settings-surface.md:9:responsive `ContentGrid` of `Section` cards: one column on a phone, two at `lg`,
docs/features/settings-surface.md:134:Automated (mobile-360 only; desktop `testIgnore`):
docs/features/settings-surface.md:151:  two controls drop to a second line rather than shrink below their 44px targets.
docs/features/settings-surface.md:177:than the only one. See `docs/features/auth-password-recovery.md`.
docs/features/imports.md:381:- The `visible_when` cell may hold the two-pair condition and option `bounds` may hold `settled` (attributes.md). Tokens are stored byte for byte (AT-67); `/api/translate` masks and restores them (TR-35).
docs/features/listings.md:162:- `docs/features/categories.md` — `expiry_days`, `price_enabled`, attributes.
docs/features/listings.md:163:- `docs/features/geography.md` — `location_id` target.
docs/features/listings.md:164:- `docs/governance/migrations.md` — append-only + idempotent migration law.
docs/features/listings.md:491:documented in `docs/features/media-pipeline.md`. What belongs to a listing:
docs/features/security-scanning.md:7:GitHub-native, switched on by the operator on 2026-10-05 and free while the repository is public: Dependabot alerts (alerts only, no Dependabot pull requests), CodeQL default setup, secret scanning, priv
docs/features/categories.md:3:Status: Category Era in progress (spec: /docs/governance/category-era-spec.md, RATIFIED 2026-09-02).
docs/features/categories.md:7:Taxonomy of record: /docs/spec/category-era/c1-target-taxonomy.md (113 nodes = 14 roots + 85 leaves + 14 catch-alls), ratified 2026-09-02, produced from the live WordPress export (DEC-003 item, closed) diffed a
docs/features/categories.md:19:- **Roster** — one depth-ordered list of the whole tree from `admin_list_categories`, rendered through the DataTable primitive with `cardUntil="lg"` and per-column min-widths (law C7). Search narrows on name
docs/features/categories.md:38:- **Row actions** — ONE button set with two presentations: full text in the 360 card, a compact icon strip from lg with the label in `aria-label`/`title`. DELIBERATE DEVIATION from the requested overflow men
docs/features/categories.md:40:E2E: `e2e/admin-categories.spec.ts` (CT-1..CT-9) covers gating, roster + search, create/edit, visibility window, exclusions, retirement, step-up, pointer-move refusal without a proven factor (CT-7b), tablet-ba
docs/features/categories.md:65:  Name column is pinned, so the 1024–1240 band shows identity plus actions.
docs/features/categories.md:88:  wrapping 44px icon action strip. A retired row hides the Accepts-listings and
docs/features/categories.md:90:  1024/1240 with no horizontal scroll anywhere and the table at 1440.
docs/features/categories.md:107:  only, danger) — is a full-text ≥44px button in a wrapping verb bar at the top
docs/features/categories.md:114:  (J5). CT-8 is the reachability law: at 360/768/1024/1240 the editor exposes
docs/features/categories.md:115:  every verb, visible, clickable and ≥44px, with no horizontal scroll on the
docs/features/categories.md:363:the per-category link manager described in `docs/features/attributes.md`: linked
docs/features/categories.md:491:CT-28. The full description lives in `docs/features/attributes.md`.
docs/features/panels.md:103:STUBBED — see `docs/features/location-scoping.md`.
docs/features/panels.md:122:session (first read shared by all callers, failures never cached), with 44px skeleton rows
docs/features/panels.md:133:- The rail-collapse toggle is md+ only; below md the hamburger/drawer is the
docs/features/countries-console.md:12:ONE `DataTable` (`cardUntil="lg"`, row testid `country-<CODE>`) over
docs/features/countries-console.md:55:One 44px pencil per row (`country-edit-<CODE>`) opens the EDITOR
docs/features/countries-console.md:58:(`country-verb-anchor`), and the verb bar (`country-verb-bar`):
docs/features/countries-console.md:94:4. Open it from the editor's verb bar (step-up). `GET /api/locations/<CODE>`
docs/features/countries-console.md:129:- `docs/features/locations-console.md` — the Places roster in the same rail group.
docs/features/countries-console.md:130:- `docs/features/countries-reference.md` — the reference table behind it.
docs/features/countries-console.md:131:- `docs/features/imports.md` — the shared import shell and its laws.
docs/features/auth-email-door.md:49:`user_directory` + `profiles` (see `identity-schema.md`).
docs/features/identity-schema.md:15:Deny-proofs: `scripts/deny-tests/phase1-identity.md` (D1–D7, all PASS).
docs/features/posting.md:3:Spec: `docs/governance/u6-posting-spec.md` §4 B2/C1, §12 D11/D12/D18.
docs/features/posting.md:11:LAYOUT-1 keeps the compact phone header and adds a shared split layout at `lg`:
docs/features/posting.md:15:`md`; it is a normal footer on larger screens.
docs/features/posting.md:160:the server's, not the device's — see `media-pipeline.md`.
docs/features/posting.md:686:**THE MOBILE STEP STRIP** (`post-step-strip`, `lg:hidden`) is the desktop rail
docs/features/posting.md:688:horizontally scrollable at 360. Only steps already reached are buttons; a step
docs/features/posting.md:764:on mobile-360 under four workers, and `test.setTimeout` is twice that
docs/features/posting.md:889:pin and showing an approximate area. Controls are 44 px and the map fits the
docs/features/posting.md:890:card at 360.
docs/features/posting.md:994:The step-1 picker renders the category's stored lucide name (projected by the tree read as `icon`) before its label through `categoryGlyphOrNull`: absent → no glyph, no gap; unknown → no glyph, logged once p
docs/features/posting.md:1073:- **INC-325 — step strip focusable.** axe named `ol.-mx-1` (the mobile step strip) as `scrollable-region-focusable` on step 1 at mobile-360; the scroll container now takes `tabIndex={0}` with a focus ring.
docs/features/posting.md:1136:- Each finder hit carries its first fitting match as a line ("Size: M"), using the attribute's and option's own labels. Choosing a hit selects the leaf and carries its matches into the draft as prefills. Every 
docs/features/posting.md:1180:- **C5 — numbers (staging build, 360 px, Slow 4G, same script before/after).**
docs/features/posting.md:1229:- **Order and price page.** Steps keep the brief's numbers; the price page is its own step after the specifications and draws the copies of the form the step-9 census lists (`bundle-4-census.md`). Price, unit/p
docs/features/nightly-e2e.md:34:## Heartbeat: `docs/tracking/nightly-status.md`
docs/features/nightly-e2e.md:67:`git fetch origin ci-evidence && git show origin/ci-evidence:docs/tracking/nightly-status.md`.
docs/features/nightly-e2e.md:70:`.prettierignore`, same class as `docs/tracking/ci-status.md` (INC-011).
docs/features/nightly-e2e.md:77:runs `e2e/smoke-auth-i18n.spec.ts` on `mobile-360`. If it dies because workerd refuses
docs/features/nightly-e2e.md:87:One step after the suites, `if: always()`: `bun scripts/security-lints.ts`. It never stops the suites; its failure turns the run red like any failed step. See docs/features/security-scanning.md for the rule.
docs/features/nightly-e2e.md:91:- The nightly runs `scripts/security-lints.ts` against ethio-staging (counts only; see security-scanning.md).
docs/features/media-pipeline.md:3:Spec: `docs/governance/u6-posting-spec.md` §2 law 8, §4 B1, §12 D15.
docs/features/auth-e2e-tests.md:39:`docs/features/nightly-e2e.md`.
docs/features/auth-e2e-tests.md:55:`playwright.config.ts` keeps both projects. The `desktop-1280` project carries a
docs/features/auth-e2e-tests.md:59:- `auth-signup`, `auth-signin-errors`, `auth-callback` — `mobile-360` only.
docs/features/auth-e2e-tests.md:108:`docs/features/guard-proof.md`.
docs/features/geography.md:4:`docs/governance/locations-era-spec.md` §3–§4, ratified 2026-09-15) widened it to
docs/features/geography.md:259:(`docs/features/imports.md`): `POST /api/admin/locations/import`
docs/features/geography.md:298:[`locations-console.md`](./locations-console.md) (L2a).
docs/features/geography.md:411:- `docs/features/locations-console.md` — the Places roster over this tree.
docs/features/geography.md:412:- `docs/features/countries-console.md` — the markets register and the
docs/features/geography.md:414:- `docs/governance/locations-era-spec.md` — the ratified era spec (§3–§4 land here).
docs/features/geography.md:415:- `docs/features/countries-reference.md` — the root reference table this FKs.
docs/features/geography.md:416:- `docs/governance/migrations.md` — append-only migration law.
docs/features/display-primitives.md:5:Cross-cutting rules for every primitive: dark mode through design tokens only; logical CSS properties only (`ps/pe/ms/me`, `text-start`); interactive targets ≥ 44px; every primitive accepts a `testid`
docs/features/display-primitives.md:10:- Law suite: `e2e/primitives-law.spec.ts`, describe `display primitives law (test-once responsiveness)`, at 360×800, 768×1024 and 1280×800.
docs/features/display-primitives.md:16:| L3  | DataTable: cards at 360, table at 768+, `detail` columns only at 1280                                                                                       |
docs/features/display-primitives.md:18:| L5  | FormSection actions bar `position: sticky` at 360, `static` from md                                                                                         |
docs/features/display-primitives.md:24:One card primitive for every page block: `rounded-lg border border-border bg-card p-6`.
docs/features/display-primitives.md:29:Column priority does the responsive work: `primary` (cards + table), `secondary` (cards + md table), `detail` (table from lg only). `overflow-x-auto` on the table wrapper is a last resort our own table
docs/features/display-primitives.md:33:- `toolbar` — search/filter controls in their own card; stacked at 360, wrapping row from md.
docs/features/display-primitives.md:34:- `rowActions(row)` — inline buttons inside the 360 card, trailing end-aligned column at md.
docs/features/display-primitives.md:44:`StatGrid({ children, testid?, className? })` — 2-up at 360, 3-up at md, 4-up at lg.
docs/features/display-primitives.md:53:`FormSection({ title, description?, columns?: 1|2, actions?, children, testid?, className? })` — 1-col at 360, 2-col from md when `columns=2`; the actions bar is sticky-bottom at 360 (≥44px targets
docs/features/display-primitives.md:58:`DetailPanel({ title?, pairs, loading?, error?, testid?, className? })` with `pairs: { label, value, hint? }[]` — 1-col at 360, 2-col from md. Values wrap (`break-words`) and are never truncated sile
docs/features/display-primitives.md:62:`DataTable({ rowHref })` applies to BOTH responsive twins: the 360 card is a whole-card `Link`, and from md the table row is fully clickable — the first `primary` column renders as a `Link` (`<rowTes
docs/features/display-primitives.md:72:- `cardUntil?: "md" | "lg"` — where the card twin gives way to the table twin. `"md"` is the default, so every pre-existing consumer renders byte-identically with the prop absent. Dense tables declar
docs/features/display-primitives.md:76:Proof: `src/components/shell/data-table.test.tsx` (DEC-025 floor) covers the default split, the `lg` split, min-width layout, and the label substitution; law L9 in `e2e/primitives-law.spec.ts` proves t
docs/features/display-primitives.md:89:`/dev/primitives?variant=lg`: `scrollWidth > clientWidth` on the scroller, the
docs/features/display-primitives.md:102:  `?variant=lg` demo enable it.
docs/features/admin-shell.md:11:| `/admin`            | `src/routes/admin.tsx`            | Layout: gate, sidebar (md+), `<Outlet />` |
docs/features/admin-shell.md:70:  full-width tappable cards (`min-h-16`, ≥44px targets) as its index content;
docs/features/admin-shell.md:71:  inside a section, a `Back` affordance remains (`md:hidden`).
docs/features/admin-shell.md:72:- md+: the shell rail lists the sections with active styling on the current
docs/features/admin-shell.md:135:  panel-switcher dropdown (auth-filtered exactly like the top tabs, ≥44px
docs/features/admin-shell.md:149:  (`panelsForUser`, ≥44px targets, rail/drawer stays open, heading-only when a
docs/features/admin-shell.md:153:  md+ rail and the mobile drawer identically. The logo cell's geometry,
docs/features/admin-shell.md:183:`src/components/shell/app-rail.tsx` renders three regions in both the md+ rail
docs/features/admin-shell.md:198:Scroll containment only works if the rail itself cannot grow. The md+ `<aside>`
docs/features/admin-shell.md:199:therefore carries `md:sticky md:top-0 md:h-screen md:h-dvh md:max-h-dvh
docs/features/admin-shell.md:200:md:overflow-hidden` (`h-screen` first as the fallback where `dvh` is
docs/features/admin-shell.md:209:Four laws govern the md+ shell; mobile (< md) is unchanged (drawer + stacked
docs/features/admin-shell.md:217:  `md:fixed md:inset-x-0 md:top-0 md:z-30 md:flex md:h-16` from md up. Inside
docs/features/admin-shell.md:219:  `md:w-64 md:h-16 md:shrink-0` (`md:w-16` when `html[data-rail=collapsed]`)
docs/features/admin-shell.md:220:  and the top bar is `md:flex-1`. Measured at 1280: logo 0/256×64, bar
docs/features/admin-shell.md:221:  256/1024×64 — identical to the sticky band it replaced.
docs/features/admin-shell.md:223:  `md:fixed md:start-0 md:top-16 md:z-20 md:w-64 md:h-[calc(100dvh-4rem)]
docs/features/admin-shell.md:224:md:overflow-hidden` (with `100vh` first as the fallback, and `md:w-16` when
docs/features/admin-shell.md:228:  itself with `md:pt-16 md:ms-64` (`md:ms-16` collapsed) so it starts under the
docs/features/admin-shell.md:237:  `md:[&>footer>*]:ps-64` (`ps-16` collapsed) — the padding lands on the
docs/features/admin-shell.md:282:into view on scroll and the pinned Sign out — at 360×480 (drawer) and 1280×500
docs/features/admin-shell.md:283:(rail); the md+ case also asserts the aside's box height equals the viewport
docs/features/admin-shell.md:372:- `primary` — always rendered (360 cards and the md+ table);
docs/features/admin-shell.md:373:- `secondary` — rendered in the card body and the md table;
docs/features/admin-shell.md:374:- `detail` — hidden at 360 (reachable through the row link), shown in the
docs/features/admin-shell.md:375:  table only from `lg`.
docs/features/admin-shell.md:377:NO-HORIZONTAL-OVERFLOW LAW: no admin page may scroll horizontally at 360, 768
docs/features/admin-shell.md:378:or 1280, and the DataTable container may not carry an inner horizontal scroll
docs/features/admin-shell.md:379:at 1280 either. `e2e/shell-table-law.spec.ts` ("admin tables never overflow
docs/features/admin-users.md:68:  stacked cards at 360px, a table from `md`, pagination (25/page), i18n
docs/features/admin-users.md:110:UI: an "Edit profile" `FormSection` (2 columns from `md`) on the detail page —
docs/features/attributes.md:39:(cards below md): attribute · type · option count · used-by count, searchable
docs/features/attributes.md:74:The library renders ONLY through the C7 DataTable primitive at `cardUntil="lg"`
docs/features/attributes.md:75:(cards through the tablet band, table from 1024) — no per-page width hacks.
docs/features/attributes.md:83:last column off the scroller between 1024 and 1279.
docs/features/attributes.md:92:`wide` renders from `xl` only, so 1024–1279 shows Attribute · Type · Used by ·
docs/features/attributes.md:93:⋯ with nothing clipped and no sideways scroll, and 1280+ adds Options; the row
docs/features/attributes.md:117:Delete — so the column stays narrow and the card twin keeps a single 44px
docs/features/attributes.md:127:between 1024 and 1366.
docs/features/attributes.md:139:library · AT-9 twin rendering with no sideways scroll and no clipped last column at 1024/1194/1280/1366 ·
docs/features/attributes.md:219:docs/features/imports.md holds the cell rules).
docs/features/attributes.md:801:`docs/features/listings.md`. The attribute console keeps writing definitions; it
docs/features/attributes.md:896:`docs/features/imports.md`.
docs/features/attributes.md:955:exactly what the door will ignore (`docs/features/posting.md`).
docs/features/attributes.md:967:(`docs/features/imports.md`).
docs/features/attributes.md:1005:- **Tokens.** `{country}` is accepted anywhere; `{category:<slug>}` only in help text — `attr_cell_check` refuses an unknown slug with `unknownCategoryToken` (AT-68). Rendering: see posting.md.
docs/features/ci-guards.md:49:`docs/features/dependency-audit.md`.
docs/features/ci-guards.md:57:Details: `docs/features/security-scanning.md`.
docs/features/ci-guards.md:96:`docs/features/rbac-client-seam.md`). CI runs it in both directions: PASS on
docs/features/ci-guards.md:172:`docs/tracking/e2e-last-failure.md`:
docs/features/ci-guards.md:202:`docs/tracking/*.md` reporters need no exemption: they REGENERATE their files
docs/features/ci-guards.md:254:  `docs/tracking/e2e-last-failure.md` lists EVERY shard's failures — not the
docs/features/ci-guards.md:317:the only surviving run is the newest push's, so `docs/tracking/ci-status.md`
docs/features/ci-guards.md:318:and `e2e-last-failure.md` always describe HEAD.
docs/features/ci-guards.md:369:- `mobile-360` / `desktop-1280` `testIgnore` the file, and the smoke and shard
docs/features/ci-guards.md:370:  jobs pass explicit `--project=mobile-360 --project=desktop-1280`, so the
docs/features/ci-guards.md:397:  `test-results/**/error-context.md` as `e2e-context-<source>`, the merged report
docs/features/ci-guards.md:423:  `docs/tracking/e2e-last-failure.md` on EVERY completed E2E run — green, red, or
docs/features/ci-guards.md:457:  resolve its `error-context.md`.
docs/features/ci-guards.md:558:- DEC-098: the reporters' `[skip ci]` evidence commits (`ci-status.md`,
docs/features/ci-guards.md:559:  `guards-last-failure.md`, `e2e-last-failure.md`, `flake-ledger.md`, the two
docs/features/ci-guards.md:585:tracking commits (`ci-status.md`, `e2e-last-failure.md`, `[skip ci]`) and
docs/features/ci-guards.md:713:  `docs/tracking/nightly-last-failure.md` with its INC-117 label while
docs/features/ci-guards.md:714:  `docs/tracking/nightly-status.md` stays SUCCESS; a MISSING verdict file is
docs/features/ci-guards.md:734:- `docs/tracking/flake-ledger.md` — one appended line per flaky test
docs/features/ci-guards.md:750:Rule (pre-committed): for every FLAKY test the merged report carries the FIRST failed attempt's body in the same shape as a failure — the 40-line message and the matched error-context tail, or the "context f
docs/features/ci-guards.md:964:- Nightly database lints (DEC-148): see docs/features/nightly-e2e.md; the comparison is unit-tested in scripts/security-lints.test.ts.
```

## K. The public pages

### src/routes/index.tsx
```text
3:import { Feed } from "@/components/marketplace/feed";
```
### src/components/marketplace/feed.tsx
```text
1:import { useShell } from "@/components/shell-context";
2:import { WovenMark } from "@/components/brand/logo";
3:import { Spinner } from "@/components/brand/spinner";
4:import { ListingCard } from "@/components/marketplace/listing-card";
5:import { PageCard } from "@/components/shell/page-card";
6:import { Button } from "@/components/ui/button";
```
### src/components/marketplace/listing-card.tsx
```text
4:import { ListingPicture } from "@/components/marketplace/listing-picture";
```
### src/components/marketplace/listing-picture.tsx
```text
```
### src/routes/c.$slug.tsx
```text
3:import { Feed } from "@/components/marketplace/feed";
```
### src/routes/post.tsx
```text
```
### src/routes/post_.$listingId.tsx
```text
```

## L. Constraints

```text
src/routes/__root.tsx:65:   * L4b — THE SAVED AREA as the SSR request saw it: the `ethio_area` cookie,
src/routes/__root.tsx:78:/** The saved-area cookie: "<CC>:<uuid>" and nothing else. */
src/routes/__root.tsx:83: * Reads the star cookie and the anon publication gate on the server. The gate
src/routes/__root.tsx:97:    // saved area (shape-validated cookie) and the edge's country guess. The
src/routes/__root.tsx:295:  // the star cookie is the only channel SSR can read, and it is validated by
src/server/geo/guess.ts:25: * cookie).
src/i18n/provider.tsx:29: *  - `localStorage` — the durable client record (survives cookie clearing of
src/i18n/provider.tsx:30: *    session cookies, and is the one the client reads first);
src/i18n/provider.tsx:31: *  - a plain cookie — the only channel SSR can read. It carries a language
src/i18n/provider.tsx:54: * cookie second (a browser that lost `localStorage` still keeps its star).
src/i18n/provider.tsx:67:    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${LANGUAGE_STAR_COOKIE}=([^;]*)`));
src/i18n/provider.tsx:71:    /* no document/cookie access (SSR, or a locked-down embed) */
src/i18n/provider.tsx:82:    /* private mode: the cookie below still carries the star */
src/i18n/provider.tsx:87:    document.cookie = `${LANGUAGE_STAR_COOKIE}=${value}; Path=/; Max-Age=${age}; SameSite=Lax`;
src/i18n/provider.tsx:89:    /* no cookie access; the localStorage record still answers on this device */
src/i18n/provider.tsx:540:  // already emitted both from the star cookie; this is the reconciliation.
src/components/ui/sidebar.tsx:85:        // This sets the cookie to keep the sidebar state.
src/components/ui/sidebar.tsx:86:        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
src/components/ui/sidebar.tsx:138:              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
src/components/ui/sidebar.tsx:157:    variant?: "sidebar" | "floating" | "inset";
src/components/ui/sidebar.tsx:228:            variant === "floating" || variant === "inset"
src/components/ui/sidebar.tsx:235:            "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
src/components/ui/sidebar.tsx:239:            // Adjust the padding for floating and inset variants.
src/components/ui/sidebar.tsx:240:            variant === "floating" || variant === "inset"
src/components/ui/sidebar.tsx:299:          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-s
src/components/ui/sidebar.tsx:321:          "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inse
src/components/ui/sidebar.tsx:457:        "after:absolute after:-inset-2 after:md:hidden",
src/components/ui/sidebar.tsx:600:        "after:absolute after:-inset-2 after:md:hidden",
src/components/ui/alert-dialog.tsx:19:      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
src/components/ui/sheet.tsx:25:      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
src/components/ui/sheet.tsx:39:        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
src/components/ui/sheet.tsx:41:          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
src/components/ui/sheet.tsx:42:        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
src/components/ui/sheet.tsx:44:          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
src/components/ui/calendar.tsx:43:          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
src/components/ui/calendar.tsx:68:        dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
src/components/app-shell.tsx:44:import { RAIL_INIT_SCRIPT } from "@/providers/rail-state";
src/components/app-shell.tsx:121:   *   (a) the SAVED AREA cookie `ethio_area` ("<CC>:<node id>", so the country
src/components/app-shell.tsx:128:   * The GUESS IS NEVER WRITTEN to the cookie; only a pick is.
src/components/app-shell.tsx:155:  // I3 — one stable object per cookie VALUE, never a fresh one per render.
src/components/app-shell.tsx:252:   * there is no anchor and — decisively — NO cookie write, so the saved area can
src/components/app-shell.tsx:272:   * deepest resolved place. The cookie is untouched — only a pick writes it
src/components/app-shell.tsx:312:  /** The hard reset drops the client-side selection; the cookie is untouched. */
src/components/app-shell.tsx:620:          className="fixed inset-x-2 bottom-2 z-50 mx-auto flex max-w-md flex-col gap-2 rounded-lg border border-border bg-card p-3 shadow-lg sm:flex-row sm:items-cent
src/components/app-shell.tsx:641:          className="fixed inset-x-2 bottom-2 z-50 mx-auto flex max-w-md items-center justify-between gap-2 rounded-lg border border-border bg-card p-3 shadow-lg"
src/components/app-shell.tsx:684:            className="contents md:fixed md:inset-x-0 md:top-0 md:z-30 md:flex md:h-16"
src/components/app-shell.tsx:761:            inset equal to the rail width at md+, so the links and copyright
src/components/ui/resizable.tsx:24:      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-
src/components/ui/menubar.tsx:60:    inset?: boolean;
src/components/ui/menubar.tsx:62:>(({ className, inset, children, ...props }, ref) => (
src/components/ui/menubar.tsx:67:      inset && "pl-8",
src/components/ui/menubar.tsx:116:    inset?: boolean;
src/components/ui/menubar.tsx:118:>(({ className, inset, ...props }, ref) => (
src/components/ui/menubar.tsx:123:      inset && "pl-8",
src/components/ui/menubar.tsx:179:    inset?: boolean;
src/components/ui/menubar.tsx:181:>(({ className, inset, ...props }, ref) => (
src/components/ui/menubar.tsx:184:    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
src/features/posting/step-where.tsx:64: *   2 the SAVED AREA cookie — a place the seller actually picked;
src/features/posting/step-where.tsx:832:  /** The guess is read ONCE per visit; it never writes the saved-area cookie. */
src/features/posting/step-specifications.tsx:1394:                   end edge (a logical inset, so RTL keeps it beside the digits)
src/features/posting/step-specifications.tsx:1422:                    className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-sm text-muted-foreground"
src/components/shell/location-selector.tsx:34: * SEAM (U7): choosing an area writes the scope and the saved-area cookie; the
src/components/shell/location-data.ts:26: * THE SAVED AREA (law 12) is the cookie `ethio_area`, shaped `<CC>:<node id>`,
src/components/shell/location-data.ts:56:/* ------------------------------- the cookie ------------------------------- */
src/components/shell/location-data.ts:59:/** One year, the star cookie's own shape (§ i18n provider). */
src/components/shell/location-data.ts:82:    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${AREA_COOKIE}=([^;]*)`));
src/components/shell/location-data.ts:91:  document.cookie = `${AREA_COOKIE}=${country.toUpperCase()}:${id}; Path=/; Max-Age=${AREA_COOKIE_MAX_AGE}; SameSite=Lax`;
src/components/shell/location-data.ts:96:  document.cookie = `${AREA_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
src/components/shell/location-data.ts:349: * answer in, one node out, no React, no fetch, no cookie (law 10 — the guess is
src/components/ui/input-otp.tsx:50:        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
src/features/posting/catalog-scope.ts:37: * one; else the market the seller is browsing (the area cookie); else the
src/components/layout/split-layout.tsx:28:          "min-w-0 lg:sticky lg:[inset-block-start:6rem] lg:self-start",
src/components/ui/dropdown-menu.tsx:24:    inset?: boolean;
src/components/ui/dropdown-menu.tsx:26:>(({ className, inset, children, ...props }, ref) => (
src/components/ui/dropdown-menu.tsx:31:      inset && "pl-8",
src/components/ui/dropdown-menu.tsx:79:    inset?: boolean;
src/components/ui/dropdown-menu.tsx:81:>(({ className, inset, ...props }, ref) => (
src/components/ui/dropdown-menu.tsx:86:      inset && "pl-8",
src/components/ui/dropdown-menu.tsx:142:    inset?: boolean;
src/components/ui/dropdown-menu.tsx:144:>(({ className, inset, ...props }, ref) => (
src/components/ui/dropdown-menu.tsx:147:    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
src/components/shell/use-footer-inset.ts:11: * `inset = max(0, innerHeight - footerRect.top)`: zero while the footer is
src/components/shell/use-footer-inset.ts:23:  const [inset, setInset] = useState(0);
src/components/shell/use-footer-inset.ts:48:      // U0i-3: publish the applied inset for tests/settle polling.
src/components/shell/use-footer-inset.ts:50:      if (aside && aside.getAttribute("data-rail-inset") !== String(next)) {
src/components/shell/use-footer-inset.ts:51:        aside.setAttribute("data-rail-inset", String(next));
src/components/shell/use-footer-inset.ts:59:     * U0i-3 — SETTLE. rAF coalescing can leave the inset one frame behind the
src/components/shell/use-footer-inset.ts:85:     * before the footer's own box settles — the rail then keeps a stale inset
src/components/shell/use-footer-inset.ts:110:     * inset. Observing the main content region re-clamps immediately.
src/components/shell/use-footer-inset.ts:112:     * INC-085h — NEVER OBSERVE document.body HERE. The measured inset is
src/components/shell/use-footer-inset.ts:116:     * inset changes the body's height, which fires this very observer, which
src/components/shell/use-footer-inset.ts:117:     * measures a new inset. That is a self-feeding render loop and it is what
src/components/shell/use-footer-inset.ts:119:     * set must never contain an ancestor whose box the inset can move.
src/components/shell/use-footer-inset.ts:147:  return inset;
src/components/ui/drawer.tsx:26:    className={cn("fixed inset-0 z-50 bg-black/80", className)}
src/components/ui/drawer.tsx:41:        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
src/components/ui/dialog.tsx:25:      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
src/components/ui/context-menu.tsx:22:    inset?: boolean;
src/components/ui/context-menu.tsx:24:>(({ className, inset, children, ...props }, ref) => (
src/components/ui/context-menu.tsx:29:      inset && "pl-8",
src/components/ui/context-menu.tsx:75:    inset?: boolean;
src/components/ui/context-menu.tsx:77:>(({ className, inset, ...props }, ref) => (
src/components/ui/context-menu.tsx:82:      inset && "pl-8",
src/components/ui/context-menu.tsx:138:    inset?: boolean;
src/components/ui/context-menu.tsx:140:>(({ className, inset, ...props }, ref) => (
src/components/ui/context-menu.tsx:143:    className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)}
src/components/marketplace/listing-picture.tsx:103:            className="pointer-events-none absolute inset-0 overflow-hidden"
src/components/layout/page-header.tsx:33:          className={`sticky [inset-block-end:0] ${Z_ACTION_BAR} col-span-full flex min-h-11 items-center gap-2 border-t border-border bg-background py-2 pb-[m
src/features/posting/preview/preview-sheet.tsx:47:      className={`fixed inset-0 ${Z_SHEET} overflow-y-auto bg-background`}
src/features/auth/auth-service.ts:27: * in a cookie: `redirectTo` is the one value the provider hands back untouched,
src/features/auth/auth-service.ts:28: * it is validated against Supabase's allow-list as an origin, and a cookie would
src/components/shell/app-rail.tsx:9:import { useFooterInset } from "@/components/shell/use-footer-inset";
src/components/shell/app-rail.tsx:21:import { useRailCollapsed } from "@/providers/rail-state";
src/components/shell/app-rail.tsx:505:          // `--rail-bottom-inset`, how far the footer has scrolled into view,
src/components/shell/app-rail.tsx:507:          // fixed calc() height dropped (top-16 + bottom inset size it), the
src/components/shell/app-rail.tsx:510:          style={{ "--rail-bottom-inset": `${footerInset}px` } as React.CSSProperties}
src/components/shell/app-rail.tsx:511:          className="hidden min-h-0 min-w-0 flex-col border-e border-border bg-sidebar p-2 md:fixed md:start-0 md:top-16 md:bottom-[var(--rail-bottom-inset,0px)] 
src/components/shell/app-header.tsx:29:import { useRailCollapsed } from "@/providers/rail-state";
src/features/admin/impersonation/impersonation-banner.tsx:28:      className="fixed inset-x-0 top-0 z-[60] flex min-w-0 flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-destructive px-3 py-2 t
src/components/layout/form-layout.tsx:23:          className={`sticky [inset-block-end:0] ${Z_ACTION_BAR} -mx-4 mt-4 border-t border-border bg-background px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-b
src/features/posting/map/map-pin-dropper.tsx:333:      className={`fixed inset-0 ${Z_SHEET} flex items-stretch justify-center bg-background/80 sm:items-center sm:p-6`}
src/features/posting/map/map-pin-dropper.tsx:529:          className="flex gap-2 border-t border-border bg-background p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
src/components/shell-context.ts:40:  /** Writes the selection AND the saved-area cookie (L4b, law 12). */
```

## Not read

- A–L were collected by search, not by reading each file whole. Not done: what each colour literal paints (A); per-component variant names beyond the count of `variant:`/`size:` lines (B); accessible name, title, tooltip and touch size of each icon-only control (C); who may see each row action (D); per-table columns, filters, chooser, selection, pager placement, below-640 behaviour and loading/empty/error states (E); per-badge states and their colouring (F); each form that builds its own label and help (G); band heights and fixed/scroll behaviour per breakpoint and the stacked padding sums (H, raw class lines only are listed); plain-words statement of each pinned assertion (J, matching lines only); tokens used by the public pages (K, imports only). Reason: the turn's budget; these need a line-by-line read and are left for the census's next pass. No count above is given for something not searched.
- A "Link drawn as a button" (C) was not searched separately; `asChild` buttons are in the variant counts only.
