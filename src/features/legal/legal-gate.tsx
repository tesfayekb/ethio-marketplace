import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useLegalGate } from "./use-legal-gate";

/**
 * Bundle 22 turn 4 (INC-769, INC-770) — the acceptance gate as a component that renders nothing. The shell
 * mounts it only while a person is signed in, so its query is never observed while signed out; the pathname
 * and the search string are both selected from the router's one `state.location`.
 */
export function LegalGate({ userId }: { userId: string }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const search = useRouterState({ select: (state) => state.location.searchStr });
  useLegalGate({ userId, pathname, search, navigate });
  return null;
}
