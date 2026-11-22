import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  Columns3,
  History,
  ImageIcon,
  Link2,
  Pencil,
  Send,
  Share2,
  SlidersHorizontal,
  Trash2,
  Upload,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Field } from "@/components/forms/field";
import { LIST_CHOICE_ON, LIST_ROW, LIST_ROW_WRAP } from "@/components/shell/menu-row";
import { cn } from "@/lib/utils";

import { PageShell } from "@/components/layout/page-shell";
import { InviteCard, type Invite } from "@/components/marketplace/invite-card";
import { ListingCard } from "@/components/marketplace/listing-card";
import { CARD_LOOKS } from "@/components/marketplace/card-tier";
import { PLAIN_LOOK } from "@/features/levels/level-fields";
import { Section } from "@/components/layout/section";
import { DataTablePagination } from "@/components/shell/data-table";
import { ColumnsList } from "@/components/shell/columns-button";
import { FilterChips, FiltersButton } from "@/components/shell/filter-chips";
import { FilterChoices } from "@/components/shell/filter-choices";
import { FilterDates } from "@/components/shell/filter-dates";
import { FilterRow } from "@/components/shell/filter-row";
import { FilterSelect } from "@/components/shell/filter-select";
import { FilterText } from "@/components/shell/filter-text";
import { RowActions } from "@/components/shell/row-actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  BANDS_PANEL,
  DIALOG_FIT,
  DIALOG_SIZE,
  DIALOG_TEXT,
  DIALOG_TITLE,
  type DialogSize,
} from "@/components/ui/dialog-look";
import { BANDS_STILL, DIALOG_CARD } from "@/components/ui/dialog-parts-look";
import {
  ActionRow,
  ClosedPrimary,
  PanelBody,
  PanelFooter,
  PanelHeader,
  PanelSubject,
  StepTrack,
} from "@/components/ui/dialog-parts-facade";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconButton, type IconButtonTone } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import type { FeedListing } from "@/features/feed/feed-page";
import { useI18n } from "@/i18n";
import { loadOnce } from "@/lib/load-once";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";
import type { ThemeName } from "@/lib/theme-resolver";
import type { THEMES } from "@/lib/themes";

const SPECIMEN_REASONS = ["spam", "scam", "copyright"] as const;

/**
 * BUNDLE 9 A3 — THE HOUSE-STYLE FIXTURE.
 *
 * Shows every colour meaning, badge, button, shadow and corner of the house
 * style once, so e2e/house-style.spec.ts can judge overflow and contrast here.
 * Production-safe like /dev/primitives: no data access, no writes, noindex.
 * The strings below are FIXTURE DATA, never user-facing product copy.
 */

export const Route = createFileRoute("/dev/style")({
  head: () => ({
    meta: [
      { title: "House style check — ethio.com" },
      { name: "description", content: "Internal house-style reference page." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "House style check — ethio.com" },
      { property: "og:description", content: "Internal house-style reference page." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
  staticData: { strings: ["member"] },
  component: StyleFixture,
});

/* Static class strings so the build sees every utility. */
const MEANINGS = [
  {
    name: "primary",
    soft: "border-border bg-muted text-primary",
    solid: "bg-primary text-primary-foreground",
    text: "text-primary",
  },
  {
    name: "success",
    soft: "border-success-line bg-success-soft text-success",
    solid: "bg-success text-primary-foreground",
    text: "text-success",
  },
  {
    name: "warning",
    soft: "border-warning-line bg-warning-soft text-warning",
    solid: "bg-warning text-card",
    text: "text-warning",
  },
  {
    name: "info",
    soft: "border-info-line bg-info-soft text-info",
    solid: "bg-info text-card",
    text: "text-info",
  },
  {
    name: "destructive",
    soft: "border-destructive-line bg-destructive-soft text-destructive",
    solid: "bg-destructive text-destructive-foreground",
    text: "text-destructive",
  },
  {
    name: "neutral",
    soft: "border-border bg-neutral-soft text-neutral",
    solid: "bg-neutral text-card",
    text: "text-neutral",
  },
] as const;

const NEW_BADGES = ["success", "warning", "info", "danger", "neutral"] as const;
const OLD_BADGES = ["default", "secondary", "destructive", "outline"] as const;
const BUTTONS = ["default", "destructive", "outline", "secondary", "ghost", "link"] as const;
const RADII = [
  { size: "sm", cls: "rounded-sm" },
  { size: "md", cls: "rounded-md" },
  { size: "lg", cls: "rounded-lg" },
  { size: "xl", cls: "rounded-xl" },
] as const;

/*
 * Turn SAGE-S0 (ruling 1) — the Sage grid: theme × mode × card type, fixture data only. Each
 * panel scopes its theme's tokens from THEMES (validated data, D250) on its own container, so
 * both modes show at once whatever the page's mode. Turn SAGE-S4 — the cards are the real
 * ListingCard (its tier's look from card-tier.ts, a ribbon on each) and the real InviteCard,
 * so the operator walks the tiers here without a seeded row (S4 operator decision 1).
 * P-2 (c) c2a — one card per look a level can take (CARD_LOOKS: each frame, without and with
 * the badge), each its own fixture level row, so no level is named here.
 */
/** Fixture card words (a dev page, English only). */
const FIXTURE_TITLE = "Sample listing";
const FIXTURE_PLACE = "Bole, Addis Ababa";
const FIXTURE_LEVEL = "Sample level";
const FIXTURE_CARD: FeedListing = {
  id: "style-fixture",
  publicId: null,
  title: FIXTURE_TITLE,
  tier: "style-fixture",
  look: PLAIN_LOOK,
  levelRow: null,
  priceAmount: null,
  priceCurrency: null,
  priceMode: "contact",
  priceBp: null,
  priceNegotiable: false,
  pricePeriod: "once",
  priceUnit: null,
  priceUnitText: null,
  photosSoon: false,
  coverPhotoId: null,
  soldWord: null,
  reserved: false,
  priceWas: null,
  publishedAt: "2026-10-10T08:00:00Z",
  categoryId: "style-fixture",
  locationId: null,
  locationNameEn: FIXTURE_PLACE,
  locationNameAm: null,
  step: 1,
};
/** Each look's card, with a ribbon in turn (Sold, Reserved, Rented). */
const RIBBONS: Partial<FeedListing>[] = [
  { soldWord: "sold" },
  { reserved: true },
  { soldWord: "rented" },
];
const FIXTURE_CARDS: FeedListing[] = CARD_LOOKS.map(({ id, look }, index) => ({
  ...FIXTURE_CARD,
  ...RIBBONS[index % RIBBONS.length],
  id: `style-${id}`,
  tier: id,
  look,
  levelRow: {
    key: id,
    sort: index,
    nameEn: FIXTURE_LEVEL,
    nameAm: null,
    isBaseline: index === 0,
    look,
  },
}));
const FIXTURE_INVITE: Invite = {
  placeId: null,
  placeName: FIXTURE_PLACE,
  categoryId: null,
  categoryName: null,
  placeCount: 0,
};

/** The theme data arrives on demand: no page's first download carries it (DEC-296). */
const themesModule = loadOnce(() => import("@/lib/themes").then((module) => module.THEMES));

function themeScope(
  themes: typeof THEMES,
  name: ThemeName,
  mode: "light" | "dark",
): Record<string, string> {
  const set = { ...themes[name].light, ...(mode === "dark" ? themes[name].dark : {}) };
  return Object.fromEntries(Object.entries(set).map(([token, value]) => [`--${token}`, value]));
}

function SageGrid() {
  const [themes, setThemes] = useState(themesModule.ready);
  useEffect(() => {
    if (themes) return;
    themesModule.load().then(setThemes, (error: unknown) => {
      reportOnDemandFailure("the theme data", error);
    });
  }, [themes]);
  if (!themes) return null;
  const names = Object.keys(themes) as ThemeName[];
  return (
    <div data-testid="style-sage-grid" className="mt-4 flex flex-col gap-4">
      {names.flatMap((name) =>
        (["light", "dark"] as const).map((mode) => (
          <div
            key={`${name}-${mode}`}
            data-testid={`style-sage-${name}-${mode}`}
            data-theme={name}
            data-mode={mode}
            className={`${mode === "dark" ? "dark " : ""}rounded-card bg-background p-4 text-foreground`}
            style={themeScope(themes, name, mode)}
          >
            <div className="grid auto-rows-fr grid-cols-2 gap-3 md:grid-cols-4">
              {FIXTURE_CARDS.map((listing) => (
                <div
                  key={listing.id}
                  data-testid={`style-card-${listing.tier}-${mode}`}
                  className="min-w-0"
                >
                  <ListingCard listing={listing} />
                </div>
              ))}
              <div data-testid={`style-card-invite-${mode}`} className="min-w-0">
                <InviteCard invite={FIXTURE_INVITE} at="end" />
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.keys(themes[name].dark)
                .filter((token) => !token.startsWith("lift-"))
                .map((token) => (
                  <div key={token} className="flex flex-col items-center gap-1 text-[11px]">
                    <span
                      className="block h-8 w-12 rounded-md shadow-tile"
                      style={{ background: `var(--${token})` }}
                    />
                    {token}
                  </div>
                ))}
            </div>
          </div>
        )),
      )}
    </div>
  );
}

/**
 * D262 (turn B1, DEC-314) — THE DARK-CARD CHOICE. Three candidate card sets (styles.css,
 * `.dark [data-card-candidate]`) on a dark page, each with a plain card (a photo stand-in), a
 * gold-framed and a green-framed badged card (P-2 (c) c2a: named by their look) and a no-photo card. The operator picks one; e2e/dark-cards.spec.ts measures
 * each against its targets. Fixture data, English only; never on a public page.
 */
const CANDIDATES = ["a", "b", "c"] as const;
const CHOICE_CARDS = [
  ["standard", "bg-card shadow-card", "bg-secondary", "text-primary", ""],
  [
    "top-badge",
    "bg-tier-premium shadow-premium",
    "bg-photo-empty",
    "text-tier-premium-ink",
    "★★ PREMIUM",
  ],
  [
    "boost-badge",
    "bg-tier-featured shadow-featured",
    "bg-photo-empty",
    "text-tier-featured-ink",
    "★ FEATURED",
  ],
  ["no-photo", "bg-card shadow-card", "bg-photo-empty", "text-primary", ""],
] as const;

function DarkCardChoice() {
  return (
    <div
      data-testid="style-dark-cards"
      className="dark mt-4 flex flex-col gap-4 rounded-card bg-background p-4 text-foreground"
    >
      {CANDIDATES.map((candidate) => (
        <div
          key={candidate}
          data-card-candidate={candidate}
          data-testid={`style-candidate-${candidate}`}
        >
          <p className="mb-2 text-sm font-semibold">{`Candidate ${candidate.toUpperCase()}`}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CHOICE_CARDS.map(([kind, surface, well, ink, word]) => (
              <div
                key={kind}
                data-testid={`style-candidate-${candidate}-${kind}`}
                className={`min-w-0 overflow-hidden rounded-card text-card-foreground ${surface}`}
              >
                <div className={`aspect-[4/3] ${well}`} />
                <p className="truncate px-3 pt-3 text-sm font-semibold">{FIXTURE_TITLE}</p>
                <p className={`px-3 text-sm font-bold ${ink}`}>{word || "ETB 12,500"}</p>
                <p className="truncate px-3 pb-3 text-xs text-muted-foreground">{FIXTURE_PLACE}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const SAMPLE_ROWS = ["Alpha", "Beta", "Gamma"] as const;
const TONES: IconButtonTone[] = ["neutral", "danger", "success", "warning", "info"];
const PAGER_TOTAL = 300;
const COLOURS = ["Red", "Blue"] as const;
const SIZES = ["Small", "Large"] as const;
/** Fixture words (a dev page, English only). */
const COLOUR_LABEL = "Colour";
const SIZE_LABEL = "Size";
const ANY = "Any";

/** Turn S6-1 (ruling 13) — a dialog, an alert dialog and two sheets in the one look, drawn
 *  from existing keys; e2e/dialogs.spec.ts measures them. */
function DialogSpecimens() {
  const { t } = useI18n();
  const [selectedReason, setSelectedReason] = useState("spam");
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" data-testid="style-dialog-open">
            {t("adPage.report.open")}
          </Button>
        </DialogTrigger>
        <DialogContent data-testid="style-dialog" closeTestId="style-dialog-close">
          <DialogHeader>
            <DialogTitle>{t("adPage.report.open")}</DialogTitle>
            <DialogDescription>{t("adPage.report.question")}</DialogDescription>
          </DialogHeader>
          <RadioGroup value={selectedReason} onValueChange={setSelectedReason} className="gap-1">
            {SPECIMEN_REASONS.map((reason) => (
              <div
                key={reason}
                data-testid={`style-dialog-choice-${reason}`}
                className={cn(LIST_ROW, LIST_ROW_WRAP, LIST_CHOICE_ON, "cursor-pointer gap-3")}
                role="presentation"
                onClick={() => setSelectedReason(reason)}
              >
                <Field
                  id={`style-dialog-reason-${reason}`}
                  field="reason"
                  label={t(`adPage.report.reason.${reason}`)}
                  required
                  marked={false}
                  refusal={null}
                  layout="choice"
                >
                  {(control) => <RadioGroupItem {...control} value={reason} />}
                </Field>
              </div>
            ))}
          </RadioGroup>
          <Field
            id="style-dialog-field"
            field="note"
            label={t("adPage.report.note")}
            required={false}
            refusal={null}
          >
            {(control) => (
              <Textarea
                {...control}
                data-testid="style-dialog-field"
                aria-label={t("adPage.report.note")}
              />
            )}
          </Field>
          <DialogFooter data-testid="style-dialog-footer">
            <DialogClose asChild>
              <Button variant="outline" size="touch">
                {t("common.cancel")}
              </Button>
            </DialogClose>
            <Button size="touch">{t("adPage.report.send")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" data-testid="style-alert-open">
            {t("myListings.action.delete")}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent data-testid="style-alert">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("myListings.confirm.deleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>{t("myListings.confirm.deleteBody")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter data-testid="style-alert-footer">
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction data-testid="style-alert-action" tone="destructive">
              {t("myListings.action.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {(["end", "bottom"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline" data-testid={`style-sheet-${side}-open`}>
              {t(side === "end" ? "adPage.share.open" : "adPage.share.qr")}
            </Button>
          </SheetTrigger>
          <SheetContent
            side={side}
            data-testid={`style-sheet-${side}`}
            closeTestId={`style-sheet-${side}-close`}
          >
            <SheetHeader>
              <SheetTitle>{t("adPage.share.title")}</SheetTitle>
              <SheetDescription>{t("adPage.share.qrHint")}</SheetDescription>
            </SheetHeader>
            <Field
              id={`style-sheet-${side}-field`}
              label={t("adPage.share.title")}
              required={false}
              refusal={null}
            >
              {(control) => (
                <Input
                  {...control}
                  data-testid={`style-sheet-${side}-field`}
                  aria-label={t("adPage.share.title")}
                />
              )}
            </Field>
          </SheetContent>
        </Sheet>
      ))}
    </>
  );
}

/*
 * Bundle 2 (INC-1146, DEC-418/419/420) — THE PANEL ANATOMY BOARD, look B: every archetype on
 * the parts (dialog-parts.tsx), drawn twice as a still frame — light and dark through the theme
 * tokens — and once as a real dialog in the page's own theme. Fixture words (a dev page,
 * English only, as the board's other fixtures).
 */
const BOARD = {
  open: "Open",
  cancel: "Cancel",
  approve: "Approve",
  approveTitle: "Approve this ad?",
  approveText: "It goes on the site now. The seller sees it as live.",
  adTitle: "Toyota Corolla 2012, one owner",
  adLines: ["420,000 ETB", "Bole, Addis Ababa"],
  deleteTitle: "Delete this category?",
  deleteText: "It is removed for good. Ads in it move to its parent.",
  delete: "Delete",
  formTitle: "Edit category",
  formText: "Change its names and its place in the tree. Save keeps them.",
  save: "Save",
  missing: "Give the category an English name to save.",
  nameEn: "Name in English",
  shareTitle: "Share this ad",
  shareText: "Send its link in an app, or copy it.",
  shareRows: ["Telegram", "WhatsApp", "Email", "Copy link"],
  stepsTitle: "Import places",
  stepsText: "Choose a file and check it. Nothing changes until you confirm.",
  steps: ["File", "Check", "Import"],
  stepsLabel: "Steps",
  next: "Next",
  back: "Back",
  sheetTitle: "History",
  sheetText: "Every change to this text, newest first.",
  filtersTitle: "Filters",
  filtersText: "Narrow the list. It changes as you choose.",
  columnsTitle: "Columns",
  columnsText: "Choose the columns this table shows.",
  status: "Status",
  place: "Place",
  title: "Title",
  dates: "Updated",
  from: "From",
  to: "To",
  all: "All",
  search: "Search",
  none: "Nothing matches",
  clear: "Clear all",
  done: "Done",
  columns: ["Title", "Category", "Place", "Price", "Updated"],
} as const;
const BOARD_FIELDS = [
  "Name in Amharic",
  "Name in Afaan Oromo",
  "Name in Tigrinya",
  "Slug",
  "Parent",
  "Order",
];
const BOARD_STATUS = [
  { value: "live", label: "Live" },
  { value: "held", label: "Held" },
  { value: "ended", label: "Ended" },
];
const BOARD_PLACES = [
  "Addis Ababa",
  "Adama",
  "Bahir Dar",
  "Dire Dawa",
  "Gondar",
  "Hawassa",
  "Jimma",
  "Mekelle",
  "Asmara",
  "Keren",
  "Massawa",
  "Dessie",
].map((label) => ({ value: label.toLowerCase().replace(/\s+/g, "-"), label }));

type BoardTitle = (props: { children: ReactNode }) => ReactNode;
type BoardText = (props: { children: ReactNode }) => ReactNode;
interface BoardParts {
  Title: BoardTitle;
  Text: BoardText;
}
interface Archetype {
  key: string;
  size: DialogSize;
  draw: (parts: BoardParts) => ReactNode;
}

function FormArchetype({ Title, Text }: BoardParts) {
  const [name, setName] = useState("");
  const [marked, setMarked] = useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <PanelHeader icon={<Pencil />}>
        <Title>{BOARD.formTitle}</Title>
        <Text>{BOARD.formText}</Text>
      </PanelHeader>
      <PanelBody className="max-h-64">
        <div className={cn(DIALOG_CARD, "flex flex-col gap-3")}>
          {BOARD_FIELDS.map((label) => (
            <Field key={label} id={`board-${label}`} label={label} required={false} refusal={null}>
              {(control) => <Input {...control} />}
            </Field>
          ))}
          <Field id="board-name-en" label={BOARD.nameEn} required refusal={null}>
            {(control) => (
              <Input
                {...control}
                ref={nameRef}
                value={name}
                aria-invalid={marked && name === "" ? true : undefined}
                className={
                  marked && name === "" ? "border-destructive ring-1 ring-destructive" : undefined
                }
                onChange={(event) => setName(event.target.value)}
              />
            )}
          </Field>
        </div>
      </PanelBody>
      <PanelFooter>
        <Button variant="outline" size="touch">
          {BOARD.cancel}
        </Button>
        <ClosedPrimary
          closed={name === ""}
          onClosedPress={() => {
            setMarked(true);
            nameRef.current?.scrollIntoView({ block: "center" });
            nameRef.current?.focus({ preventScroll: true });
          }}
          missing={BOARD.missing}
        >
          {BOARD.save}
        </ClosedPrimary>
      </PanelFooter>
    </>
  );
}

function FiltersArchetype({ Title, Text, open }: BoardParts & { open: boolean }) {
  const [status, setStatus] = useState<string[]>(["live"]);
  const [places, setPlaces] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [dates, setDates] = useState({ from: "", to: "" });
  return (
    <>
      <PanelHeader icon={<SlidersHorizontal />}>
        <Title>{BOARD.filtersTitle}</Title>
        <Text>{BOARD.filtersText}</Text>
      </PanelHeader>
      <PanelBody>
        <div className={cn(DIALOG_CARD, "flex flex-col gap-3")}>
          <FilterRow label={BOARD.status} htmlFor={`${open}-status`}>
            <FilterSelect
              id={`${open}-status`}
              testId={`style-anatomy-status-${open ? "open" : "shut"}`}
              options={BOARD_STATUS}
              value={status}
              onChange={setStatus}
              placeholder={BOARD.all}
              searchLabel={BOARD.search}
              noneLabel={BOARD.none}
            />
          </FilterRow>
          <FilterRow label={BOARD.title} htmlFor={`${open}-title`}>
            <FilterText id={`${open}-title`} value={text} onChange={setText} />
          </FilterRow>
          <FilterRow dates label={BOARD.dates} htmlFor={`${open}-dates`}>
            <FilterDates
              id={`${open}-dates`}
              from={dates.from}
              to={dates.to}
              onChange={setDates}
              fromLabel={BOARD.from}
              toLabel={BOARD.to}
            />
          </FilterRow>
          <FilterRow label={BOARD.place} htmlFor={`${open}-place`}>
            <FilterSelect
              id={`${open}-place`}
              testId={`style-anatomy-place-${open ? "open" : "shut"}`}
              multiple
              defaultOpen={open}
              options={BOARD_PLACES}
              value={places}
              onChange={setPlaces}
              placeholder={BOARD.all}
              searchLabel={BOARD.search}
              noneLabel={BOARD.none}
            />
          </FilterRow>
        </div>
        {/* Still-only room beneath the last row: the open list hides no other row's name. */}
        {open ? <div aria-hidden="true" className="h-80 shrink-0" /> : null}
      </PanelBody>
      <PanelFooter>
        <Button variant="outline" size="touch">
          {BOARD.clear}
        </Button>
        <Button size="touch">{BOARD.done}</Button>
      </PanelFooter>
    </>
  );
}

function ColumnsArchetype() {
  const [hidden, setHidden] = useState<string[]>(["Updated"]);
  return (
    <div className={cn(DIALOG_CARD, "p-2")}>
      <ColumnsList
        testid="style-anatomy-columns-list"
        columns={BOARD.columns.map((label, index) => ({ key: label, label, locked: index === 0 }))}
        hidden={hidden}
        onToggle={(key, visible) =>
          setHidden((current) =>
            visible
              ? current.filter((item) => item !== key)
              : current.includes(key)
                ? current
                : [...current, key],
          )
        }
      />
    </div>
  );
}

const ARCHETYPES: readonly Archetype[] = [
  {
    key: "question",
    size: "narrow",
    draw: ({ Title, Text }) => (
      <>
        <PanelHeader icon={<Check />} tone="confirm">
          <Title>{BOARD.approveTitle}</Title>
          <Text>{BOARD.approveText}</Text>
        </PanelHeader>
        <PanelBody>
          <PanelSubject
            picture={
              <ImageIcon aria-hidden="true" className="m-auto mt-4 size-6 text-muted-foreground" />
            }
            title={BOARD.adTitle}
            lines={BOARD.adLines}
          />
        </PanelBody>
        <PanelFooter>
          {Title === AlertDialogTitle ? (
            <>
              <AlertDialogCancel>{BOARD.cancel}</AlertDialogCancel>
              <AlertDialogAction>{BOARD.approve}</AlertDialogAction>
            </>
          ) : (
            <>
              <Button variant="outline" size="touch">
                {BOARD.cancel}
              </Button>
              <Button size="touch">{BOARD.approve}</Button>
            </>
          )}
        </PanelFooter>
      </>
    ),
  },
  {
    key: "warning",
    size: "narrow",
    draw: ({ Title, Text }) => (
      <>
        <PanelHeader icon={<Trash2 />} tone="danger">
          <Title>{BOARD.deleteTitle}</Title>
          <Text>{BOARD.deleteText}</Text>
        </PanelHeader>
        <PanelBody>
          <PanelSubject title={"Cars"} lines={["Vehicles › Cars"]} />
        </PanelBody>
        <PanelFooter>
          {Title === AlertDialogTitle ? (
            <>
              <AlertDialogCancel>{BOARD.cancel}</AlertDialogCancel>
              <AlertDialogAction tone="destructive">{BOARD.delete}</AlertDialogAction>
            </>
          ) : (
            <>
              <Button variant="outline" size="touch">
                {BOARD.cancel}
              </Button>
              <Button variant="destructive" size="touch">
                {BOARD.delete}
              </Button>
            </>
          )}
        </PanelFooter>
      </>
    ),
  },
  { key: "form", size: "default", draw: (parts) => <FormArchetype {...parts} /> },
  {
    key: "actions",
    size: "default",
    draw: ({ Title, Text }) => (
      <>
        <PanelHeader icon={<Share2 />}>
          <Title>{BOARD.shareTitle}</Title>
          <Text>{BOARD.shareText}</Text>
        </PanelHeader>
        <PanelBody end>
          <PanelSubject
            picture={
              <ImageIcon aria-hidden="true" className="m-auto mt-4 size-6 text-muted-foreground" />
            }
            title={BOARD.adTitle}
            lines={[BOARD.adLines[0]]}
          />
          <div className={cn(DIALOG_CARD, "flex flex-col gap-1 p-2")}>
            {BOARD.shareRows.map((row) => (
              <ActionRow key={row} icon={row === "Copy link" ? <Link2 /> : <Send />}>
                {row}
              </ActionRow>
            ))}
          </div>
        </PanelBody>
      </>
    ),
  },
  {
    key: "steps",
    size: "wide",
    draw: ({ Title, Text }) => (
      <>
        <PanelHeader icon={<Upload />}>
          <Title>{BOARD.stepsTitle}</Title>
          <Text>{BOARD.stepsText}</Text>
          <StepTrack label={BOARD.stepsLabel} steps={BOARD.steps} current={1} />
        </PanelHeader>
        <PanelBody>
          <div className={cn(DIALOG_CARD, "text-sm")}>{"places.csv · 214 rows · 3 to fix"}</div>
        </PanelBody>
        <PanelFooter>
          <Button variant="outline" size="touch">
            {BOARD.back}
          </Button>
          <Button size="touch">{BOARD.next}</Button>
        </PanelFooter>
      </>
    ),
  },
  {
    key: "columns",
    size: "narrow",
    draw: ({ Title, Text }) => (
      <>
        <PanelHeader icon={<Columns3 />}>
          <Title>{BOARD.columnsTitle}</Title>
          <Text>{BOARD.columnsText}</Text>
        </PanelHeader>
        <PanelBody end>
          <ColumnsArchetype />
        </PanelBody>
      </>
    ),
  },
];

const StillTitle: BoardTitle = ({ children }) => <h3 className={DIALOG_TITLE}>{children}</h3>;
const StillText: BoardText = ({ children }) => <p className={DIALOG_TEXT}>{children}</p>;
const LiveTitle: BoardTitle = ({ children }) => <DialogTitle>{children}</DialogTitle>;
const LiveText: BoardText = ({ children }) => <DialogDescription>{children}</DialogDescription>;
const STILL = { Title: StillTitle, Text: StillText };
const LIVE = { Title: LiveTitle, Text: LiveText };

/** A still frame: the panel's own classes, placed in the page instead of over it. */
function StillPanel({
  size,
  testId,
  children,
}: {
  size: DialogSize;
  testId: string;
  children: ReactNode;
}) {
  return (
    <div
      data-testid={testId}
      data-dialog-panel=""
      data-bands=""
      className={cn(DIALOG_SIZE[size], BANDS_PANEL, BANDS_STILL, DIALOG_FIT.bounded, "w-full")}
    >
      {children}
    </div>
  );
}

function AnatomyBoard() {
  const [themes, setThemes] = useState(themesModule.ready);
  useEffect(() => {
    if (themes) return;
    themesModule.load().then(setThemes, (error: unknown) => {
      reportOnDemandFailure("the theme data", error);
    });
  }, [themes]);
  const name = themes ? (Object.keys(themes)[0] as ThemeName | undefined) : undefined;
  return (
    <div className="mt-4 flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {ARCHETYPES.map((archetype) =>
          archetype.key === "question" || archetype.key === "warning" ? (
            <AlertDialog key={archetype.key}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  data-testid={`style-anatomy-${archetype.key}-open`}
                >{`${BOARD.open}: ${archetype.key}`}</Button>
              </AlertDialogTrigger>
              <AlertDialogContent
                bands
                size={archetype.size}
                data-testid={`style-anatomy-${archetype.key}`}
              >
                {archetype.draw({ Title: AlertDialogTitle, Text: AlertDialogDescription })}
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Dialog key={archetype.key}>
              <DialogTrigger asChild>
                <Button variant="outline" data-testid={`style-anatomy-${archetype.key}-open`}>
                  {`${BOARD.open}: ${archetype.key}`}
                </Button>
              </DialogTrigger>
              <DialogContent
                bands
                size={archetype.size}
                phone={archetype.key === "actions" ? "sheet" : "float"}
                data-testid={`style-anatomy-${archetype.key}`}
              >
                {archetype.draw(LIVE)}
              </DialogContent>
            </Dialog>
          ),
        )}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              data-testid="style-anatomy-filters-open"
            >{`${BOARD.open}: filters`}</Button>
          </DialogTrigger>
          <DialogContent bands data-testid="style-anatomy-filters">
            <FiltersArchetype {...LIVE} open={false} />
          </DialogContent>
        </Dialog>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              data-testid="style-anatomy-sheet-open"
            >{`${BOARD.open}: sheet`}</Button>
          </SheetTrigger>
          <SheetContent side="end" bands data-testid="style-anatomy-sheet">
            <PanelHeader icon={<History />}>
              <SheetTitle>{BOARD.sheetTitle}</SheetTitle>
              <SheetDescription>{BOARD.sheetText}</SheetDescription>
            </PanelHeader>
            <PanelBody end>
              {Array.from({ length: 14 }, (_, index) => (
                <div
                  key={index}
                  className={cn(DIALOG_CARD, "text-sm")}
                >{`Version ${14 - index}`}</div>
              ))}
            </PanelBody>
          </SheetContent>
        </Sheet>
      </div>
      {themes && name !== undefined
        ? (["light", "dark"] as const).map((mode) => (
            <div
              key={mode}
              data-testid={`style-anatomy-${mode}`}
              className={`${mode === "dark" ? "dark " : ""}grid grid-cols-1 items-start gap-4 rounded-card bg-muted p-4 text-foreground lg:grid-cols-2`}
              style={themeScope(themes, name, mode)}
            >
              {ARCHETYPES.map((archetype) => (
                <StillPanel
                  key={archetype.key}
                  size={archetype.size}
                  testId={`style-anatomy-${archetype.key}-${mode}`}
                >
                  {archetype.draw(STILL)}
                </StillPanel>
              ))}
              <StillPanel size="default" testId={`style-anatomy-filters-${mode}`}>
                <FiltersArchetype {...STILL} open={mode === "light"} />
              </StillPanel>
            </div>
          ))
        : null}
    </div>
  );
}

function StyleFixture() {
  const [last, setLast] = useState("");
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [colour, setColour] = useState("");
  const [size, setSize] = useState("");
  const chips = [
    ...(colour ? [{ key: "colour", label: colour, onRemove: () => setColour("") }] : []),
    ...(size ? [{ key: "size", label: size, onRemove: () => setSize("") }] : []),
  ];
  return (
    <PageShell as="main" data-testid="dev-style">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold">{"House style"}</h1>
        <p className="text-sm text-muted-foreground">{"Secondary text on the page."}</p>

        <Section title={"Sage cards and tokens"} testid="style-sage">
          <SageGrid />
        </Section>

        <Section title={"Dark cards: pick one"} testid="style-dark-choice">
          <DarkCardChoice />
        </Section>

        <Section title={"Meanings"} testid="style-meanings">
          <div className="mt-4 flex flex-col gap-3">
            {MEANINGS.map((m) => (
              <div
                key={m.name}
                data-testid={`style-meaning-${m.name}`}
                className="grid grid-cols-1 gap-2 sm:grid-cols-3"
              >
                <div className={`rounded-md border px-3 py-2 text-sm font-medium ${m.soft}`}>
                  {m.name}
                </div>
                <div className={`rounded-md px-3 py-2 text-sm font-medium ${m.solid}`}>
                  {m.name}
                </div>
                <div className={`rounded-md px-3 py-2 text-sm font-medium ${m.text}`}>{m.name}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title={"Badges"} testid="style-badges">
          <div className="mt-4 flex flex-wrap gap-2">
            {[...NEW_BADGES, ...OLD_BADGES].map((v) => (
              <Badge key={v} variant={v} data-testid={`style-badge-${v}`}>
                {v}
              </Badge>
            ))}
          </div>
        </Section>

        <Section title={"Buttons"} testid="style-buttons">
          <div className="mt-4 flex flex-col gap-3">
            {(["default", "touch"] as const).map((size) => (
              <div key={size} className="flex flex-wrap gap-2">
                {BUTTONS.map((v) => (
                  <Button key={v} variant={v} size={size}>
                    {v}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </Section>

        <Section title={"Shadows"} testid="style-shadows">
          <p className="mt-1 text-sm text-muted-foreground">{"Secondary text on a card."}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{"Menu"}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>{"First item"}</DropdownMenuItem>
                <DropdownMenuItem>{"Second item"}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogSpecimens />
          </div>
        </Section>

        <Section title={"Corners"} testid="style-radii">
          <div className="mt-4 flex flex-wrap gap-3">
            {RADII.map((r) => (
              <div
                key={r.size}
                data-testid={`style-radius-${r.size}`}
                className={`flex h-16 w-24 items-center justify-center border border-border bg-muted text-sm ${r.cls}`}
              >
                {r.size}
              </div>
            ))}
          </div>
        </Section>

        <Section title={"Row actions"} testid="style-row-actions">
          <ul className="mt-4 divide-y divide-border">
            {SAMPLE_ROWS.map((row, index) => (
              <li key={row} className="flex items-center justify-between gap-2 py-2 text-sm">
                <span>{row}</span>
                <RowActions
                  testid={`style-row-${index + 1}`}
                  name={row}
                  edit={{ label: "Edit", onSelect: () => setLast(`edit ${row}`) }}
                  remove={{ label: "Delete", onSelect: () => setLast(`delete ${row}`) }}
                  more={[
                    { key: "copy", label: "Copy", onSelect: () => setLast(`copy ${row}`) },
                    {
                      key: "erase",
                      label: "Erase",
                      tone: "danger",
                      onSelect: () => setLast(`erase ${row}`),
                    },
                  ]}
                />
              </li>
            ))}
          </ul>
          <p data-testid="style-row-last" className="mt-2 text-sm text-muted-foreground">
            {last}
          </p>
        </Section>

        <Section title={"Icon buttons"} testid="style-icon-buttons">
          <div className="mt-4 flex flex-wrap gap-2">
            {TONES.map((tone) => (
              <IconButton
                key={tone}
                data-testid={`style-icon-${tone}`}
                label={tone}
                tone={tone}
                icon={<Pencil />}
              />
            ))}
          </div>
        </Section>

        <Section title={"Pager"} testid="style-pager-section">
          <div className="mt-4">
            <DataTablePagination
              testid="style-pager"
              offset={offset}
              pageSize={pageSize}
              total={PAGER_TOTAL}
              onPrevious={() => setOffset((o) => Math.max(0, o - pageSize))}
              onNext={() => setOffset((o) => o + pageSize)}
              onPage={(index) => setOffset(index * pageSize)}
              pageSizeOptions={[10, 25, 50]}
              onPageSize={(next) => {
                setPageSize(next);
                setOffset(0);
              }}
            />
          </div>
        </Section>

        <Section title={"Panels"} testid="style-anatomy-section">
          <AnatomyBoard />
        </Section>

        <Section title={"Filters"} testid="style-filters-section">
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {/* Bundle 11 V2 (INC-543) — each filter a row of pills, never a dropdown. */}
            <FiltersButton
              testid="style-filters"
              count={chips.length}
              state={`${colour}|${size}`}
              onClearAll={() => {
                setColour("");
                setSize("");
              }}
            >
              <FilterChoices
                testid="style-filters-colour"
                label={COLOUR_LABEL}
                value={colour}
                onChange={setColour}
                options={[
                  { value: "", label: ANY },
                  ...COLOURS.map((c) => ({ value: c, label: c })),
                ]}
              />
              <FilterChoices
                testid="style-filters-size"
                label={SIZE_LABEL}
                value={size}
                onChange={setSize}
                options={[{ value: "", label: ANY }, ...SIZES.map((c) => ({ value: c, label: c }))]}
              />
            </FiltersButton>
            <FilterChips
              testid="style-filters-chips"
              chips={chips}
              onClearAll={() => {
                setColour("");
                setSize("");
              }}
            />
          </div>
        </Section>
      </div>
    </PageShell>
  );
}
