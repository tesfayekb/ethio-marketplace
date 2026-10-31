import { useRouterState } from "@tanstack/react-router";
import { useMemo } from "react";

import { menuAtOf, parseMenuAt, type MenuAt } from "@/components/shell/menu-current";

/**
 * INC-581 — THE PAGE THE BODY IS SHOWING. The router sets its location the
 * moment a navigation starts, and commits the new page's matches only once that
 * page's code and `beforeLoad` have run (@tanstack/router-core, load-client:
 * `stores.location.set` at the start, `commitMatches` at the end). Chrome that
 * read the location therefore switched first: tapping Post on the home page
 * drew the posting form's frame — no location band, My Listings active — around
 * the home page until the form arrived. Chrome reads this instead: the deepest
 * committed match's path, so the frame and the body change in the same commit.
 * Before the first commit there is no match, and the location stands in.
 */
export function useShownPathname(): string {
  return useRouterState({
    select: (state) => {
      const leaf = state.matches[state.matches.length - 1];
      // A page no route matched commits the root alone, whose path is "/": the
      // location names that page, so it stands in (never the home feed's frame).
      return leaf !== undefined && leaf.routeId !== "__root__"
        ? leaf.pathname
        : state.location.pathname;
    },
  });
}

/**
 * D263/D271 (turn C2, DEC-317 item 1) — the place every menu's current mark reads (isCurrentAt's
 * `at`): the chosen page while a navigation is pending, else the shown page (menuAtOf). Beside
 * useShownPathname, its frame twin; only a menu item's look and aria-current read it.
 */
export function useMenuAt(): MenuAt {
  const key = useRouterState({ select: menuAtOf });
  return useMemo(() => parseMenuAt(key), [key]);
}
