import { CARD_SURFACE } from "@/components/layout/surface";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useRouter, useRouterState } from "@tanstack/react-router";

import { Logo } from "@/components/brand/logo";
import { AppFooter } from "@/components/shell/app-footer";
import { AppHeader, SearchRow } from "@/components/shell/app-header";
import { AppRail } from "@/components/shell/app-rail";
import { BottomBar } from "@/components/shell/bottom-bar";
import { OnDemandNotice } from "@/components/shell/on-demand-notice";
import { Breadcrumbs } from "@/components/shell/breadcrumbs";
import { useShownPathname } from "@/components/shell/use-shown-pathname";
import {
  anchorOf,
  asLocationNode,
  autoExtendPath,
  deriveInitialArea,
  initialCountries,
  parseEverywhere,
  readEverywhere,
  writeEverywhereCookie,
  type GuessFacts,
  parseAreaCookie,
  pathToNode,
  readAreaCookie,
  resolveGuess,
  useCountryTree,
  useOpenMarkets,
  writeAreaCookie,
} from "@/components/shell/location-data";
import { LocationSelector, PlaceNotice } from "@/components/shell/location-selector";
import { chooseCarry } from "@/components/shell/place-carry";
import { readAccountPlace, saveAccountPlace } from "@/components/shell/place-carry-service";
import { PanelTabs } from "@/components/shell/panel-tabs";
import { Menu } from "lucide-react";
import { MENU_INSET, MENU_WIDTH } from "@/components/shell/menu-width";
import { cn } from "@/lib/utils";
import type { PanelAuthContext, PanelId } from "@/config/panels.types";
import { ImpersonationBanner } from "@/features/admin/impersonation/impersonation-banner";
import { takeDeactivatedSignOut } from "@/features/auth/deactivated";
import { useAuth } from "@/features/auth/use-auth";
import { feedRouteOf, useCategoryTree } from "@/features/categories/category-tree";
import type { AuthUser } from "@/features/auth/types";
import { ADMIN_PANEL_PERMISSION } from "@/features/permissions/service";
import { usePermissions } from "@/features/permissions/usePermissions";
import {
  clearSessionClocks,
  startSessionClocks,
  useSessionPolicy,
  type SessionExpiryReason,
} from "@/features/session/session-policy";
import { LegalGate } from "@/features/legal/legal-gate";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";
import { isE2E } from "@/lib/env-flags";
import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";
import { errorText } from "@/lib/error-text";
import { getSupabase } from "@/lib/supabase-door";
import { sendsToSignIn } from "@/lib/signed-in-pages";
import { createHomeAhead, SIGN_OUT_LANDING } from "@/lib/sign-out-landing";
import { useRailCollapsed, RAIL_INIT_SCRIPT } from "@/providers/rail-state";

import { ShellContext, type LocationNode, type ShellValue } from "./shell-context";

/** Body shown for panels whose real pages are later features. */
function PanelPlaceholder() {
  const { t } = useI18n();
  return (
    <div className={cn(CARD_SURFACE, "p-6")}>
      <h1 className="text-lg font-semibold text-foreground">{t("shell.placeholderTitle")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("shell.placeholderBody")}</p>
    </div>
  );
}

/**
 * U1g-3 (B) — the permission read, MOUNTED ONLY FOR A SESSION. Rendering this
 * (instead of calling the hook with `enabled: false`) is what keeps the query
 * cache free of an "auth-derived" entry after the hard reset: an unmounted
 * observer cannot re-register a purged key.
 */
function PermissionsLoader({
  onChange,
}: {
  onChange: (state: { permissions: string[]; loading: boolean }) => void;
}) {
  const { permissions, loading } = usePermissions();
  useEffect(() => {
    onChange({ permissions, loading });
  }, [permissions, loading, onChange]);
  return null;
}

/**
 * THE CORNER-BLOCK GRID + THE VERTICAL STACK.
 *
 * From md up the shell is a two-column CSS grid whose first column is the rail
 * width (16rem) and whose first row is the top-bar height (3.5rem):
 *
 *   ┌──────────┬─────────────────────────┐
 *   │ LOGO     │ top bar                 │  row 1 = 3.5rem
 *   ├──────────┼─────────────────────────┤
 *   │ rail     │ panel tabs              │  row 2 = 1fr
 *   │          │ location row            │
 *   │          │ breadcrumbs             │
 *   │          │ body                    │
 *   ├──────────┴─────────────────────────┤
 *   │ footer (spans both columns)        │  row 3 = auto
 *   └────────────────────────────────────┘
 *
 * Alignment is EXACT, not approximate, because the logo cell and the rail are
 * the SAME grid column (so identical width by construction) and the logo cell
 * and the top bar are the SAME grid row (so identical height by construction).
 * The rail is set apart by its side shadow, without a divider in the top band.
 *
 * THE STACK (bands 2-4) lives in the content column, right of the rail, and
 * stacks full-width below the bar on mobile. Their spacing is SYMMETRIC and
 * tight: each band is a flat full-width strip separated only by its own
 * hairline `border-b`, so the panel-tab row's gap above (to the bar) equals its
 * gap below (to the location row) by construction — there is no gap to tune.
 * Bands that render nothing (panel tabs when logged out) collapse completely.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const { collapsed, toggle } = useRailCollapsed();
  const { t } = useI18n();
  const { user, loading: authLoading, hadSession, signOut } = useAuth();
  const router = useRouter();
  /**
   * DEC-279 (INC-930; Foundations turn 34c-4) — the Home page's code is fetched ahead of time for a
   * signed-in visitor, so a sign-out made offline from a page opened directly lands on a working
   * Home page (src/lib/sign-out-landing.ts). The E2E build shows the fetch's state to SO-13.
   */
  const homeAhead = useMemo(
    () =>
      createHomeAhead(
        () => router.loadRouteChunk(router.routesById[SIGN_OUT_LANDING]),
        (state) => {
          if (isE2E) (window as unknown as { __ethioHomeAhead?: string }).__ethioHomeAhead = state;
        },
      ),
    [router],
  );
  useEffect(() => {
    const consider = () => homeAhead.consider(user !== null, navigator.onLine);
    consider();
    window.addEventListener("online", consider);
    return () => window.removeEventListener("online", consider);
  }, [user, homeAhead]);
  const [panelChoice, setPanelChoice] = useState<PanelId>("marketplace");
  const [locationPath, setPathState] = useState<LocationNode[]>([]);
  const [locationCountry, setCountryState] = useState<string | null>(null);
  const [guessInUse, setGuessInUse] = useState(false);
  /** L4b-2 — the node the guess resolved to, so the caption can NAME it. */
  const [guessNode, setGuessNode] = useState<LocationNode | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [noticeNode, setNoticeNode] = useState<LocationNode | null>(null);
  const [keptPlace, setKeptPlace] = useState<string | null>(null);

  /**
   * L4b-2 — THE INITIAL AREA, DERIVED ONCE, in this order (laws 10, 12, 13):
   *   (a) the SAVED AREA cookie `ethio_area` ("<CC>:<node id>", so the country
   *       is known before the tree loads) → the full path down to that node;
   *   (b) else the EDGE'S GUESS, resolved over that market's cached tree by
   *       `resolveGuess` — nearest curated metro within 60 km (a sub-city only
   *       within 8 km), else the region by ISO code, else a city by slug, else
   *       the market anchor — with the guess caption naming the chosen node;
   *   (c) else nothing at all — there is no default market.
   * The GUESS IS NEVER WRITTEN to the cookie; only a pick is.
   */
  const ssrGeo = useRouterState({
    select: (s) =>
      s.matches[0]?.loaderData as
        | { areaCookie?: string | null; geo?: GuessFacts | null }
        | undefined,
  });
  const areaCookieRaw = ssrGeo?.areaCookie ?? null;
  // I3 — one stable object per SSR answer, never a fresh literal per render.
  const geo = useMemo<GuessFacts>(
    () => ({
      country: ssrGeo?.geo?.country ?? null,
      regionCode: ssrGeo?.geo?.regionCode ?? null,
      city: ssrGeo?.geo?.city ?? null,
      lat: ssrGeo?.geo?.lat ?? null,
      lng: ssrGeo?.geo?.lng ?? null,
    }),
    [
      ssrGeo?.geo?.country,
      ssrGeo?.geo?.regionCode,
      ssrGeo?.geo?.city,
      ssrGeo?.geo?.lat,
      ssrGeo?.geo?.lng,
    ],
  );
  const geoCountry = geo.country;
  /**
   * INC-532 — bumped by the sign-out's hard reset: the place is derived again
   * from this browser's saved area, read live (the request's cookie may be older).
   */
  const [deriveTick, setDeriveTick] = useState(0);
  // I3 — one stable object per cookie VALUE, never a fresh one per render.
  const savedArea = useMemo(
    () =>
      deriveTick === 0 ? (parseAreaCookie(areaCookieRaw) ?? readAreaCookie()) : readAreaCookie(),
    [areaCookieRaw, deriveTick],
  );
  const everywhere = useMemo(
    () =>
      deriveTick === 0 ? (parseEverywhere(areaCookieRaw) ?? readEverywhere()) : readEverywhere(),
    [areaCookieRaw, deriveTick],
  );
  const { markets, isLoading: marketsLoading } = useOpenMarkets();
  // D234 S5 — the market the first place comes from: one function for the shell and the server.
  const { initialCountry, guessCountry } = initialCountries({
    savedArea,
    everywhere,
    geoCountry,
    markets,
  });
  /** The country whose tree the picker reads; the module cache shares the fetch. */
  const treeCountry = locationCountry ?? initialCountry;
  const {
    nodes: treeNodes,
    loadedCountry: treeLoadedCountry,
    failed: treeFailed,
  } = useCountryTree(treeCountry);
  const appliedRef = useRef(false);
  /**
   * INC-282 (product) — the ref above cannot re-render; this flag publishes the
   * same moment (the derivation LOCKED, markets answered) to the feed gate.
   */
  const [areaSettled, setAreaSettled] = useState(false);
  const pendingSaveRef = useRef(false);

  /**
   * D106 (the operator, 2026-10-10) — THE PLACE ON THE ACCOUNT. A pick is saved
   * in this browser (the cookie, with the pick's time) and, when signed in, on
   * the account too. The account's answer stamps this browser's copy with the
   * account's time, so the two agree at the next sign-in — but only while the
   * cookie still names the same place, so a later pick is never overwritten by
   * an earlier answer. A refusal or a failure logs one line and leaves this
   * browser's pick as it is (F4). The guess is never saved.
   */
  const signedInRef = useRef(false);
  useEffect(() => {
    signedInRef.current = user !== null;
  }, [user]);

  /**
   * The account's saves run one after another, in the order of the picks, so a
   * quick region-then-city never leaves the region on the account.
   */
  const accountSavesRef = useRef<Promise<void>>(Promise.resolve());
  const saveToAccount = useCallback((id: string | null) => {
    accountSavesRef.current = accountSavesRef.current
      .then(async () => {
        const result = await saveAccountPlace(id);
        if (!result.ok) {
          console.warn(`[location] the account place was not saved: ${result.reason}`);
          return;
        }
        const live = readAreaCookie();
        if (id !== null && live !== null && live.id === id && result.at !== null) {
          writeAreaCookie(live.country, id, result.at);
        }
      })
      // A thrown call must not stop the saves that follow it (F4: logged, never swallowed).
      .catch((error: unknown) => {
        console.warn(`[location] the account place was not saved: ${errorText(error)}`);
      });
    return accountSavesRef.current;
  }, []);

  const savePick = useCallback(
    (country: string, id: string) => {
      writeAreaCookie(country, id);
      setNoticeNode(null);
      setDeriveTick((tick) => tick + 1);
      if (signedInRef.current) void saveToAccount(id);
    },
    [saveToAccount],
  );

  const clearPick = useCallback(() => {
    writeEverywhereCookie();
    setNoticeNode(null);
    setDeriveTick((tick) => tick + 1);
    if (signedInRef.current) void saveToAccount(null);
  }, [saveToAccount]);

  useEffect(() => {
    if (appliedRef.current) return;
    // The open-market list decides whether a guessed country is browsable at
    // all, so the derivation must never LOCK before that read has answered.
    if (marketsLoading) return;
    // INC-282 (F4) — a failed tree settles the gate (the feed runs unscoped);
    // otherwise the market's own tree must be in before the place is derived.
    if (initialCountry !== null && !treeFailed && treeLoadedCountry !== initialCountry) return;
    appliedRef.current = true;
    setAreaSettled(true);
    // D234 S5 — one derivation for the shell and the server's first page
    // (deriveInitialArea, location-data.ts): the saved area, else the guess, else
    // the anchor, the auto-select law applied at once.
    const area = deriveInitialArea({
      initialCountry,
      savedArea,
      guessCountry,
      geo,
      tree: treeFailed ? null : treeNodes,
    });
    if (area.kind === "none") return;
    setCountryState(area.country);
    setPathState(area.path);
    if (area.guess) {
      setGuessNode(area.path[area.path.length - 1] ?? null);
      setGuessInUse(true);
      return;
    }
    setGuessInUse(false);
  }, [
    initialCountry,
    treeNodes,
    treeLoadedCountry,
    savedArea,
    guessCountry,
    marketsLoading,
    geo,
    treeFailed,
    deriveTick,
  ]);

  /** D214 — compare only the saved market's already loaded tree, after an own pick's day. */
  useEffect(() => {
    let kept: string | null = keptPlace;
    try {
      const stored = window.localStorage.getItem("ethio.place.keep");
      // Reuse the cookie parser's UUID pattern, not a second validation rule.
      const parsedKeep = stored === null ? null : parseAreaCookie(`XX:${stored}`);
      kept = parsedKeep?.at === null ? parsedKeep.id : keptPlace;
    } catch {
      console.warn("[location] device Keep storage is unavailable");
    }
    if (
      savedArea === null ||
      savedArea.at === null ||
      Date.now() - savedArea.at < 24 * 60 * 60 * 1000 ||
      geo.country !== savedArea.country ||
      treeLoadedCountry !== savedArea.country
    ) {
      setNoticeNode(null);
      return;
    }
    const guessed = resolveGuess(treeNodes, geo);
    const savedPath = pathToNode(treeNodes, savedArea.id);
    const guessedPath = guessed ? pathToNode(treeNodes, guessed.id) : [];
    if (
      !guessed ||
      savedPath.length === 0 ||
      guessedPath.length === 0 ||
      guessed.id === kept ||
      savedPath.some((node) => node.id === guessed.id) ||
      guessedPath.some((node) => node.id === savedArea.id)
    ) {
      setNoticeNode(null);
      return;
    }
    setNoticeNode(asLocationNode(guessed));
  }, [savedArea, treeNodes, treeLoadedCountry, geo, keptPlace]);

  /**
   * A market picked in the picker lands on its anchor as soon as ITS OWN tree is
   * in (INC-211). The tree route's rows carry no country field, so the hook
   * publishes the market its rows belong to (`loadedCountry`) together with the
   * rows: only when THAT equals the picked market is the anchor read. Until then
   * there is no anchor and — decisively — NO cookie write, so the saved area can
   * never name a place from the market the user just left.
   */
  useEffect(() => {
    if (locationCountry === null || locationPath.length > 0) return;
    if (treeLoadedCountry !== locationCountry || treeNodes.length === 0) return;
    const anchor = anchorOf(treeNodes);
    if (anchor === null) return;
    setPathState([asLocationNode(anchor)]);
    if (pendingSaveRef.current) {
      savePick(locationCountry, anchor.id);
      pendingSaveRef.current = false;
    }
  }, [locationCountry, locationPath.length, treeNodes, treeLoadedCountry, savePick]);

  /**
   * L4b-3 — THE AUTO-SELECT LAW, in ONE place: the shell's path derivation.
   * Whatever set the path (a pick, the saved area, the guess), a level with
   * exactly one option extends it, recursively. The walk is pure and adds no
   * fetch; when the shown area came from the GUESS its caption follows to the
   * deepest resolved place. The cookie is untouched — only a pick writes it
   * (law 10 / law 12), so the saved-area flow is unchanged.
   */
  useEffect(() => {
    if (locationPath.length === 0 || treeNodes.length === 0) return;
    // Only ever walk the tree the rows actually belong to (INC-211).
    if (treeLoadedCountry !== treeCountry) return;
    const extended = autoExtendPath(treeNodes, locationPath);
    if (extended.length === locationPath.length) return;
    setPathState(extended);
    if (guessInUse) setGuessNode(extended[extended.length - 1]!);
  }, [treeNodes, locationPath, treeCountry, treeLoadedCountry, guessInUse]);

  const selectLocationCountry = useCallback(
    (code: string | null) => {
      setNoticeNode(null);
      setGuessInUse(false);
      setGuessNode(null);
      appliedRef.current = true;
      if (code === null) {
        pendingSaveRef.current = false;
        setCountryState(null);
        setPathState([]);
        clearPick();
        return;
      }
      pendingSaveRef.current = true;
      setCountryState(code);
      setPathState([]);
    },
    [clearPick],
  );

  const persistLocationPath = useCallback(
    (path: LocationNode[]) => {
      setGuessInUse(false);
      setGuessNode(null);
      setPathState(path);
      const deepest = path[path.length - 1];
      if (deepest && locationCountry !== null) savePick(locationCountry, deepest.id);
    },
    [locationCountry, savePick],
  );

  const placeNotice = useMemo<ShellValue["placeNotice"]>(
    () =>
      noticeNode === null
        ? null
        : {
            node: noticeNode,
            switchTo: () => {
              const path = pathToNode(treeNodes, noticeNode.id);
              if (path.length > 0) persistLocationPath(path.map(asLocationNode));
            },
            keep: () => {
              try {
                window.localStorage.setItem("ethio.place.keep", noticeNode.id);
              } catch {
                console.warn("[location] device Keep choice was not saved");
              }
              setKeptPlace(noticeNode.id);
              setNoticeNode(null);
            },
          },
    [noticeNode, treeNodes, persistLocationPath],
  );

  /**
   * The hard reset drops the client-side selection and derives it again from
   * this browser's saved area — the cookie is untouched — so the same browser
   * shows the same place signed in and signed out (INC-532, the operator's walk
   * of 2026-10-10). With nothing saved, the guess applies as on a fresh load.
   */
  const resetLocationState = useCallback(() => {
    appliedRef.current = false;
    pendingSaveRef.current = false;
    setAreaSettled(false);
    setPathState([]);
    setCountryState(null);
    setGuessInUse(false);
    setGuessNode(null);
    setDeriveTick((tick) => tick + 1);
  }, []);

  /**
   * D106 — THE SIGN-IN CARRY, once per signed-in identity (the INC-121 latch:
   * keyed by the user id and released on sign-out, never once per mount). The
   * NEWEST pick wins (chooseCarry, place-carry.ts): the account's place is
   * written into this browser and shown — the place is derived again, as after
   * a sign-out (INC-532) — or this browser's pick is saved to the account. With
   * neither, nothing is saved: the guess never is. `accountPlace` says when the
   * carry has finished ("off" while signed out).
   */
  const carriedForRef = useRef<string | null>(null);
  const [accountPlace, setAccountPlace] = useState<ShellValue["accountPlace"]>("off");
  const userId = user?.id ?? null;
  useEffect(() => {
    if (authLoading) return;
    if (userId === null) {
      carriedForRef.current = null;
      setAccountPlace("off");
      return;
    }
    if (carriedForRef.current === userId) return;
    carriedForRef.current = userId;
    setAccountPlace("pending");
    void readAccountPlace()
      .then(async (read) => {
        if (carriedForRef.current !== userId) return;
        if (read.reason !== null) {
          console.warn(`[location] the account place was not read: ${read.reason}`);
          return;
        }
        const carry = chooseCarry(readAreaCookie() ?? readEverywhere(), read.place);
        if (carry.kind === "apply") {
          writeAreaCookie(carry.country, carry.id, carry.at);
          resetLocationState();
        } else if (carry.kind === "align") {
          writeAreaCookie(carry.country, carry.id, carry.at);
        } else if (carry.kind === "upload") {
          await saveToAccount(carry.id);
        }
      })
      .catch((error: unknown) => {
        console.warn(`[location] the account place was not read: ${errorText(error)}`);
      })
      .finally(() => {
        if (carriedForRef.current === userId) setAccountPlace("done");
      });
  }, [authLoading, userId, resetLocationState, saveToAccount]);

  // INC-581 — the frame follows the page the body shows, never the address ahead of it.
  const pathname = useShownPathname();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /**
   * INC-058 — PANEL/ROUTE DESYNC. `activePanel` used to be pure client state
   * defaulting to "marketplace", so a real route such as /settings rendered its
   * page beside the MARKETPLACE category rail. The panel is now DERIVED: a
   * route that belongs to a panel owns the panel while it is open.
   */
  const routePanel: PanelId | null =
    pathname.startsWith("/settings") || pathname.startsWith("/account")
      ? "account"
      : pathname.startsWith("/admin")
        ? "admin"
        : // INC-359 (restored from 6fea44fd) — posting pages belong to My
          // Listings: the panel and its menu stay visible while posting.
          // Bundle 16 turn 2 — and the panel's own page, /my-listings.
          pathname === "/post" ||
            pathname.startsWith("/post/") ||
            pathname === "/my-listings" ||
            pathname.startsWith("/my-listings/")
          ? "my-listings"
          : null;
  /** The marketplace feed is "/" and every category route /c/<slug>. */
  // D234 S5 — the address read once, as the server's first page reads it (feedRouteOf).
  const feedRoute = feedRouteOf(pathname);
  const isFeedRoute = feedRoute !== null;

  /**
   * U0l (INC-073) — the ONE source of truth for the selected category is the
   * URL. `/c/<slug>` selects; anything else (including "/") selects nothing.
   */
  const selectedCategorySlug = feedRoute?.slug ?? null;
  // INC-504 — the slug resolves through the WHOLE tree, subcategories included.
  const {
    tree: categoryTree,
    isLoading: categoriesLoading,
    error: categoryTreeError,
  } = useCategoryTree();
  const selectedCategoryNode = selectedCategorySlug
    ? (categoryTree.nodes.find((node) => node.slug === selectedCategorySlug) ?? null)
    : null;
  const selectedCategoryId = selectedCategoryNode?.id ?? null;
  const categoryLookup: ShellValue["categoryLookup"] =
    selectedCategorySlug === null
      ? "none"
      : selectedCategoryNode !== null
        ? "found"
        : categoriesLoading
          ? "pending"
          : categoryTreeError
            ? "failed"
            : "missing";
  /**
   * INC-282 (product) — THE FEED QUERIES ONCE ITS INPUTS EXIST: the category
   * id (only when the URL names a /c/ slug) and the area derivation.
   */
  const feedInputsReady =
    (selectedCategorySlug === null || !categoriesLoading) && !marketsLoading && areaSettled;
  const activePanel: PanelId = routePanel ?? panelChoice;

  /** Choosing a panel from a route-owned page returns to the feed shell. */
  const setActivePanel = useCallback(
    (panel: PanelId) => {
      setPanelChoice(panel);
      if (!isFeedRoute) void navigate({ to: "/" });
    },
    [isFeedRoute, navigate],
  );

  /**
   * RBAC seam (Phase R3), U1g-3 (B) — MOUNTED, NOT DISABLED. The hook used to
   * be called unconditionally with `enabled: user !== null`; a disabled query
   * still keeps an observer, so the hard reset's removeQueries() was followed
   * immediately by the shell RE-REGISTERING an "auth-derived" entry and SO-4's
   * purge assertion saw a survivor. Now the query only EXISTS while a session
   * does: <PermissionsLoader/> is rendered for authenticated sessions only, so
   * after sign-out there is no observer left to re-register anything. A
   * signed-out marketplace visitor still issues zero RBAC requests.
   *
   * Law F3: this only decides whether the Admin TAB renders. Every admin
   * action is enforced by RLS / has_permission on the server.
   */
  const [permissionsState, setPermissionsState] = useState<{
    permissions: string[];
    loading: boolean;
  }>({ permissions: [], loading: false });
  const permissions = permissionsState.permissions;
  const permissionsLoading = permissionsState.loading;

  /**
   * INC-090 — SECOND HALF OF THE LOOP GUARD. <PermissionsLoader/> reports on
   * every change of its own inputs; writing an unconditionally-new object here
   * re-renders the whole shell (and the loader) for a report that said nothing
   * new. Paired with the stable identity in usePermissions, an unchanged report
   * is now a genuine no-op for React.
   */
  const applyPermissions = useCallback((next: { permissions: string[]; loading: boolean }) => {
    setPermissionsState((prev) =>
      prev.loading === next.loading &&
      prev.permissions.length === next.permissions.length &&
      prev.permissions.every((slug, i) => slug === next.permissions[i])
        ? prev
        : next,
    );
  }, []);

  /**
   * U0j (INC-072) — SIGN-OUT IS A HARD RESET, in this exact order:
   *   (a) supabase.auth.signOut() — the repo's existing default scope
   *       ("global": every session for this user) is kept deliberately, and it
   *       is awaited;
   *   (b) the permission cache is REMOVED (not merely invalidated) so no
   *       stale admin grant can paint anything;
   *   (c) the session-policy clocks are cleared (U0k) so the next sign-in
   *       starts a fresh idle/absolute window;
   *   (d) auth-derived client state resets (panel, category, location, drawer);
   *   (e) replace-navigate to "/" so Back cannot re-enter a gated page.
   * DEC-268 (Foundations turn 34b-1): when (a) answers a failure, the session is already gone from
   * this device (auth-service's signOut removed it) and the page loads "/" afresh.
   *
   * U0k: no confirmation dialog — one click IS the contract.
   */
  const [signingOut, setSigningOut] = useState(false);
  const [sessionNotice, setSessionNotice] = useState<MessageKey | null>(null);

  const hardReset = useCallback(
    async (notice: MessageKey | null) => {
      /**
       * U1g-4 (A) — ORDER IS THE FIX. The purge must run when NO observer is
       * left, otherwise React Query keeps (or re-creates) the permissions entry
       * and SO-4 sees a survivor. Sequence:
       *   1. signingOut + user-derived state cleared -> <PermissionsLoader/>
       *      unmounts on the next commit;
       *   2. await a macrotask so React has actually COMMITTED that unmount;
       *   3. cancel-then-remove every auth-derived key;
       *   4. navigate.
       */
      setSigningOut(true);
      setPermissionsState({ permissions: [], loading: false });
      setPanelChoice("marketplace");
      resetLocationState();
      setNavOpen(false);
      let reloading = false;
      try {
        const answer = await signOut();
        if (!answer.ok) {
          reloading = true;
          // DEC-268 (Foundations turn 34b-1) — the server did not confirm, but the session is gone
          // from this device (auth-service's signOut removed it); a full load to "/" reads that
          // afresh, so no screen, cache or listener of the old session survives.
          clearSessionClocks();
          if (navigator.onLine) {
            window.location.replace(SIGN_OUT_LANDING);
            return;
          }
          // DEC-271 (Foundations turn 34w) — offline, that load would show the browser's own
          // "cannot open" page: the app stays on screen, signed out (signingOut stays set, so no
          // frame of the old account), its auth-derived reads purged below, and the fresh load
          // comes the moment the connection returns.
          window.addEventListener("online", () => window.location.replace(SIGN_OUT_LANDING), {
            once: true,
          });
        }
        // (2) macrotask boundary: React commits the unmount before the purge.
        await new Promise((resolve) => setTimeout(resolve, 0));
        /**
         * INC-078 LAW (U1f; made STRUCTURAL by U1g-2) — THE HARD RESET PURGES
         * EVERY AUTH-DERIVED READ. Mechanism: every auth-context query key
         * starts with AUTH_DERIVED_ROOT, so ONE cancel-then-remove pair covers
         * all of them — permissions, admin users, admin countries and anything
         * added later. CANCEL FIRST: an in-flight fetch must never resolve into
         * a signed-out shell. Legacy ["me"] prefix kept for any older reader.
         */
        await queryClient.cancelQueries({ queryKey: [AUTH_DERIVED_ROOT] });
        queryClient.removeQueries({ queryKey: [AUTH_DERIVED_ROOT] });
        queryClient.removeQueries({ queryKey: ["me"] });
        clearSessionClocks();
        setSessionNotice(notice);
        await navigate({ to: SIGN_OUT_LANDING, replace: true });
      } finally {
        // A reloading page stays signed-out until it goes — offline, until the connection returns
        // and it goes (DEC-271): no frame of the old account.
        if (!reloading) setSigningOut(false);
      }
    },
    [signOut, queryClient, navigate, resetLocationState],
  );

  const requestSignOut = useCallback(() => {
    if (signingOut) return;
    void hardReset(null);
  }, [hardReset, signingOut]);

  /**
   * U0k — SESSION POLICY. FAIL-SAFE tiering: until permissions resolve we
   * assume "staff", i.e. the STRICT limits, never the lenient ones.
   */
  const tier =
    permissionsLoading || permissions.includes(ADMIN_PANEL_PERMISSION)
      ? ("staff" as const)
      : ("regular" as const);

  const onExpire = useCallback(
    (reason: SessionExpiryReason) => {
      void hardReset(reason === "idle" ? "session.signedOutIdle" : "session.expired");
    },
    [hardReset],
  );

  /**
   * INC-223 — THE POLICY STARTS AFTER THIS SESSION'S CLOCKS EXIST. The clocks
   * used to be started in an effect declared AFTER the policy hook, so the
   * hook's first (synchronous) tick read the PREVIOUS session's marker and
   * signed a correct sign-in straight back out with "Signed out for
   * inactivity". The clocks are now established in the same effect that
   * activates the policy, and the policy is inert until then.
   */
  const [clocksReady, setClocksReady] = useState(false);
  useEffect(() => {
    if (user === null) {
      setClocksReady(false);
      return;
    }
    // Same session on a reload keeps its clocks; anything else starts fresh.
    startSessionClocks();
    setSessionNotice(null);
    setClocksReady(true);
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const { warningSecondsLeft, extend } = useSessionPolicy({
    active: user !== null && clocksReady,
    tier,
    onExpire,
  });

  /**
   * THE LIVE GUARD (the security fix). `user` comes from the shell's
   * onAuthStateChange subscription, so ANY signed-out transition — this tab,
   * another tab, or token expiry — lands here, not just a mount check. A gated
   * route standing open is replaced by the marketplace immediately, so no
   * gated UI survives a sign-out on any screen size. INC-926 (Foundations turn
   * 34w-2) — the gated pages are /admin and every page the door-step guards
   * (SIGNED_IN_PAGES): this guard kept its own four, and /post, /legal/accept and
   * /legal/publishing stood open, signed out, after a sign-out in another tab.
   */
  const gatedRoute = pathname.startsWith("/admin") || sendsToSignIn(pathname);
  /**
   * Bundle 16 turn 2b (INC-627) — A FRESH SIGNED-OUT VISIT IS NOT A SIGN-OUT.
   * A page whose door-step is requireSignedIn sends a signed-out visitor to sign
   * in and back (D20's rule). This guard used to win that race and drop the
   * visitor on the marketplace instead. It now evacuates those pages only once a
   * session this tab held has gone; /admin, which has no sign-in redirect of its
   * own, is evacuated as before. INC-925 (Foundations turn 34w) — which pages those
   * are is the door-step's own list (sendsToSignIn, src/lib/signed-in-pages.ts),
   * never a list kept here: /settings gained the door-step (INC-923) while this
   * guard still evacuated it, and the visitor landed on "/" a moment after /auth.
   *
   * INC-668 — "a session this tab held" is `hadSession` from useAuth, true from
   * the session event itself. It used to be "a user this shell has rendered",
   * which the INC-661 status read now delays: a sign-out arriving while that
   * read was pending found no user on record and left the tab standing on
   * /account (MLP-3, the second sign-out).
   */
  const ownSignIn = sendsToSignIn(pathname);
  useEffect(() => {
    if (authLoading || user !== null) return;
    void queryClient.cancelQueries({ queryKey: [AUTH_DERIVED_ROOT] });
    queryClient.removeQueries({ queryKey: [AUTH_DERIVED_ROOT] });
    setPermissionsState({ permissions: [], loading: false });
    setPanelChoice("marketplace");
    // INC-741 — a fresh signed-out visit is not a sign-out (INC-627's rule): closing the menu here
    // closed the D206 peek in the commit that opened it (a child's effects run first), so the peek
    // never showed to a signed-out visitor. Only a session this tab held, now gone, closes it;
    // the deliberate sign-out closes it itself (:655).
    if (hadSession) setNavOpen(false);
    // Bundle 16 turn S3 (D189) — a deactivated account's sign-out lands on the sign-in page with the reason.
    if (takeDeactivatedSignOut()) {
      void navigate({ to: "/auth", search: { reason: "deactivated" }, replace: true });
      return;
    }
    if (gatedRoute && (!ownSignIn || hadSession))
      void navigate({ to: SIGN_OUT_LANDING, replace: true });
  }, [authLoading, user, hadSession, gatedRoute, ownSignIn, navigate, queryClient]);

  /**
   * U0j-2 — TEST HOOK, dev-only. The E2E live-guard proof must fire a REAL
   * same-tab SIGNED_OUT through onAuthStateChange (synthetic storage events are
   * ignored by supabase-js in the tab that dispatches them). DEC-018: gated on
   * `isE2E`, which is false in every production build, so this never ships.
   */
  useEffect(() => {
    if (!isE2E || typeof window === "undefined") return;
    // DEC-261 — the client through its door, asked for at mount in an E2E build — except where a
    // test's init script set `__ethioClientOff` (SBE-1 proves the signed-out path there).
    if ((window as unknown as { __ethioClientOff?: boolean }).__ethioClientOff !== true)
      void getSupabase().then(
        (client) => {
          (window as unknown as { __ethioSupabase?: unknown }).__ethioSupabase = client;
        },
        (error: unknown) => console.warn(`[e2e] the client did not load: ${errorText(error)}`),
      );
    // U1g-2 — SO-4 proof reads the cache directly to assert the purge.
    (window as unknown as { __ethioQueryClient?: unknown }).__ethioQueryClient = queryClient;
  }, [queryClient]);

  const value = useMemo<ShellValue>(() => {
    const auth: PanelAuthContext = {
      // U0l PART 4 — SO-2 RACE: the moment a sign-out starts, the shell is
      // signed out for UI purposes, so no stale account menu can survive the
      // replace-navigate. Authorization is still server-side only (law F3).
      isAuthenticated: user !== null && !signingOut,
      isAdmin: permissions.includes(ADMIN_PANEL_PERMISSION),
      permissions,
    };
    return {
      auth,
      user,
      authLoading,
      requestSignOut,
      activePanel,
      setActivePanel,
      selectedCategorySlug,
      selectedCategoryId,
      categoryLookup,
      feedInputsReady,
      locationPath,
      setLocationPath: persistLocationPath,
      locationCountry: treeCountry,
      selectLocationCountry,
      guessInUse,
      guessNode,
      placeNotice,
      accountPlace,
      searchOpen,
      setSearchOpen,
      navOpen,
      setNavOpen,
      signingOut,
    };
  }, [
    user,
    authLoading,
    permissions,
    requestSignOut,
    activePanel,
    setActivePanel,
    selectedCategorySlug,
    selectedCategoryId,
    categoryLookup,
    feedInputsReady,
    locationPath,
    persistLocationPath,
    treeCountry,
    selectLocationCountry,
    guessInUse,
    guessNode,
    placeNotice,
    accountPlace,
    navOpen,
    searchOpen,
    signingOut,
  ]);

  return (
    <ShellContext.Provider value={value}>
      {user !== null && !signingOut ? <PermissionsLoader onChange={applyPermissions} /> : null}
      {/* U3 / DEC-016 — an active impersonation is ALWAYS visible, on every
          page, for as long as the 15-minute box is open.
          INC-085: the banner MOUNTS conditionally. A mounted useQuery with
          `enabled:false` re-registers its entry after the hard reset's
          removeQueries (INC-078 class), so `enabled` is never the mechanism —
          unmounting is. The prop stays, pinned to `true` while mounted. */}
      {user !== null && !signingOut ? <ImpersonationBanner enabled /> : null}
      {/* Bundle 22 turn 4 (INC-769) — the acceptance gate mounts only while signed in (SO-4). */}
      {user !== null && !signingOut ? <LegalGate userId={user.id} /> : null}

      {/* Pre-paint: the persisted rail choice lands on <html> before the first
          frame, so the rail never renders expanded and then snaps narrow. */}
      <script dangerouslySetInnerHTML={{ __html: RAIL_INIT_SCRIPT }} />
      {/* U0k — non-modal idle warning. It never traps focus and never blocks
          the page: any real interaction resets the idle clock anyway. */}
      {warningSecondsLeft !== null ? (
        <div
          data-testid="session-idle-warning"
          role="status"
          aria-live="polite"
          className="fixed inset-x-2 bottom-[calc(var(--bottom-bar)+0.5rem)] z-50 mx-auto flex max-w-md flex-col gap-2 rounded-card bg-card p-3 shadow-lg sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm text-foreground">
            {t("session.idleWarning").replace("{s}", String(warningSecondsLeft))}
          </p>
          <button
            type="button"
            data-testid="session-stay-signed-in"
            onClick={extend}
            className="min-h-11 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("session.staySignedIn")}
          </button>
        </div>
      ) : null}
      {/* U0k — the post-expiry notice, shown on the marketplace after the reset. */}
      {sessionNotice !== null ? (
        <div
          data-testid="session-notice"
          role="status"
          aria-live="polite"
          className="fixed inset-x-2 bottom-[calc(var(--bottom-bar)+0.5rem)] z-50 mx-auto flex max-w-md items-center justify-between gap-2 rounded-card bg-card p-3 shadow-lg"
        >
          <p className="text-sm text-foreground">{t(sessionNotice)}</p>
          <button
            type="button"
            data-testid="session-notice-dismiss"
            onClick={() => setSessionNotice(null)}
            className="min-h-11 rounded-md px-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("common.dismiss")}
          </button>
        </div>
      ) : null}
      {/* U0g/L3 — the footer is a SIBLING BELOW the grid, not a third grid row.
          A sticky grid item's clamp rectangle is the GRID CONTAINER, so with
          the footer inside the grid the rail could overhang it; ending the
          grid at the content row makes the rail's bottom stop exactly at the
          footer's top. Visually identical on mobile (stacked, full width). */}
      {/* INC-743 (turn 12) — the overflow guard on the shell's own outermost
          box: every engine honours clip on an ordinary element, whatever its
          root rule. clip, never hidden — this is no scroll container, so the
          sticky sub-band keeps working; the fixed bars are not clipped by it. */}
      <div className="flex min-h-screen flex-col overflow-x-clip bg-background pb-[var(--bottom-bar)]">
        {/* Mobile keeps the one-column grid. From md up the layout is FIXED
            geometry (U0g-2): the band and the rail are position:fixed and the
            content column offsets itself with padding/margin. */}
        {/* INC-134 — the SHARED content region is the last link of every
            page's scroller chain. This element was the first ancestor above a
            DataTable scroller still at `min-width:auto` (census, 1240×800), so
            a dense table could widen the chain instead of scrolling. The fix
            is here, once, for every page — never a per-page width hack (C7). */}
        <div className="grid min-w-0 max-w-full flex-1 grid-cols-1 grid-rows-[auto_1fr] md:block">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
          >
            {t("shell.skipToContent")}
          </a>

          {/* The top band is fixed at every width. On phones its content sets
              its height; the open search row is the first sticky sub-band row,
              pushing the breadcrumb and page down and covering nothing.
              From md up the logo cell and top bar share the 3.5rem band. */}
          <div
            data-testid="shell-band"
            className="fixed inset-x-0 top-0 z-30 bg-card shadow-bar md:flex md:h-14"
          >
            <div
              data-testid="shell-logo-cell"
              className={cn(
                "hidden min-w-0 bg-card ps-2 md:flex md:h-14 md:shrink-0 md:items-center rail-icons:justify-center rail-icons:px-0",
                MENU_WIDTH,
              )}
            >
              <button
                type="button"
                data-testid="rail-collapse-toggle"
                aria-pressed={collapsed === true}
                aria-label={collapsed ? t("shell.expandRail") : t("shell.collapseRail")}
                onClick={toggle}
                className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:inline-flex"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
              <Link
                to="/"
                aria-label={t("app.name")}
                className="-ms-1 inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rail-icons:hidden"
              >
                <Logo variant="full" />
              </Link>
            </div>

            {/*
            ONE uniform band: the cell itself carries bg-card and the row height,
            and the header fills it, so there is no two-tone split between the
            bar and the strip under it. min-w-0 is load-bearing — without it this
            item sizes to the search input's intrinsic minimum and the page
            overflows horizontally at 360px (INC-032).
          */}
            <div
              data-testid="shell-topbar"
              className="col-start-1 row-start-1 min-w-0 bg-card md:h-14 md:flex-1"
            >
              <AppHeader />
            </div>
          </div>

          {/* Rail: mobile drawer; md+ fixed beneath the band. */}
          <AppRail />

          {/* U0g-3 LAW — the DOCUMENT is the only page scroller at md+. This
              stack and every ancestor up to <html> stay unbounded: no
              overflow-y, no h-screen/max-h cap (the wrapper is min-h-screen),
              and the band and rail are position:fixed, so they impose no
              height bound on the flow. Adding overflow + a bounded height here
              would turn the content stack into an internal scroller and break
              L1/L2. */}
          <div
            data-testid="shell-stack"
            className={cn(
              "col-start-1 row-start-2 flex min-w-0 flex-col pt-13 ms-12 md:pt-14",
              MENU_INSET,
            )}
          >
            <div
              data-testid="shell-subband"
              className="sticky top-13 z-20 bg-card shadow-bar md:top-14"
            >
              {searchOpen ? <SearchRow onClose={() => setSearchOpen(false)} /> : null}
              <PanelTabs />
              <div className="flex min-h-8 min-w-0 items-center border-b border-neutral-soft px-2 md:px-4">
                <Breadcrumbs />
              </div>
            </div>
            {/* Band 3 — location scoping is a MARKETPLACE concept, so the row is
              gated by the SAME condition as the body: no location band on My
              Listings / Account / Admin (INC-052), and none on a route-owned
              page such as /settings (INC-058). */}
            {isFeedRoute && activePanel === "marketplace" ? (
              <>
                <LocationSelector />
                <PlaceNotice />
              </>
            ) : null}
            {/* Band 4 + 5 */}
            <main id="main" className="min-w-0 flex-1 p-2 md:p-4">
              {/* A route-owned page always renders itself. The placeholder is
                ONLY for a panel with no route at all (My Listings). U0e /
                INC-071 deleted the state-path Admin body: /admin is the one
                and only admin rendering. */}
              {!isFeedRoute || activePanel !== "my-listings" ? children : <PanelPlaceholder />}
            </main>
          </div>
        </div>

        {/* D252 (Foundations turn R1d-b) — from 768 px the footer is part of the
            middle column: it starts at the menu's inline-end edge (the same
            start margins as the page column, open or folded), is centred
            within that column and never runs behind the menu. Phones: the
            menu is a sheet, and the footer stays the page's own. */}
        {/* C2b — the phone bottom bar, on every page (C2e: no wizard exception). */}
        <BottomBar />
        {/* INC-911 — the one notice for a piece whose code did not download. */}
        <OnDemandNotice />
        <div
          data-testid="shell-footer-wrapper"
          className={cn("relative z-0 bg-card", MENU_INSET, "max-md:[&>footer>*]:ps-12")}
        >
          <AppFooter />
        </div>
      </div>
    </ShellContext.Provider>
  );
}

export default AppShell;
