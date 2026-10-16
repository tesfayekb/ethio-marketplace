import { useCallback, useEffect, useState } from "react";

import { clearSessionClocks } from "@/features/session/session-policy";
import { supabase } from "@/integrations/supabase/client";

import * as authService from "./auth-service";
import { markDeactivatedSignOut } from "./deactivated";
import type { AuthUser } from "./types";

type AuthState = {
  /** null while unknown (SSR / first load), then the user or "signed out". */
  user: AuthUser | null;
  loading: boolean;
};

/**
 * Session + auth actions. Self-contained: it subscribes to Supabase's auth
 * state directly, so no extra React provider is needed in __root.tsx.
 */
export function useAuth() {
  const [state, setState] = useState<AuthState>({ user: null, loading: true });
  /**
   * INC-668 — THE TAB HAS HELD A SESSION. True from the first auth event that
   * carries a user, BEFORE the INC-661 status read below answers, and never
   * reset for the life of the document. `user` says who is signed in once the
   * status is known; this says that a session existed at all, so a sign-out
   * that lands while the read is still pending is still a sign-out (the shell's
   * live guard reads it, app-shell.tsx), not a fresh signed-out visit.
   */
  const [hadSession, setHadSession] = useState(false);

  useEffect(() => {
    let cancelled = false;
    /**
     * U1g-3 (C) — LAST WRITE WINS BY SEQUENCE, not by arrival. The display-name
     * read is awaited between two setState calls, so a fetch started while the
     * user was still signed in could resolve AFTER SIGNED_OUT and RESURRECT the
     * user object. That is exactly the SO-4 desktop symptom: the account menu
     * disappears, then comes back, and the "Sign in" link never renders. Each
     * auth event takes a ticket; a write from an older ticket is dropped.
     */
    let seq = 0;

    const applyUser = async (userId: string | undefined, email: string | null | undefined) => {
      const ticket = ++seq;
      const stale = () => cancelled || ticket !== seq;

      if (!userId) {
        if (!stale()) setState({ user: null, loading: false });
        return;
      }
      // INC-661 — THE SIGNED-IN SCREEN WAITS FOR THE STATUS READ on a signed-out →
      // signed-in transition: the user is set only once the profile below has
      // answered, so a deactivated account never sees the account menu, not even
      // for a moment ("it appears for a fraction of a second its logging in then
      // logged out"). A user already on screen stays while the read runs — a token
      // refresh never blanks the menu — and a read that fails still sets the user
      // (fail-open, the doors refuse a deactivated account regardless, F3).
      if (!stale()) {
        setHadSession(true);
        setState((current) => (current.user === null ? { user: null, loading: true } : current));
      }
      // The signup trigger owns profile rows; we only read the display name — and,
      // bundle 16 turn S3 (D189), the account's status: a deactivated account is
      // signed out at every auth event (the first load, a sign-in, a token
      // refresh), so a session deactivated while open ends on its own.
      const { data } = await supabase
        .from("profiles")
        .select("display_name, account_status")
        .eq("user_id", userId)
        .maybeSingle();
      if (stale()) return;
      if (data?.account_status === "deactivated") {
        // INC-650 — the sign-out goes FIRST: the shell navigates to /auth the
        // moment the user is cleared, and /auth sends anyone who still has a
        // session back home (routes/auth.tsx, INC-005). SIGNED_OUT clears the
        // user through this same hook once the session is gone; the fallback
        // below is for a sign-out that raised no event.
        markDeactivatedSignOut();
        await authService.signOut();
        // INC-656 — the policy clocks go with the session, as the manual
        // sign-out clears them (app-shell hardReset); left behind, the next
        // sign-in on this browser would read a previous session's marker.
        clearSessionClocks();
        if (!stale()) setState({ user: null, loading: false });
        return;
      }
      setState({
        user: {
          id: userId,
          email: email ?? null,
          displayName: data?.display_name ?? null,
        },
        loading: false,
      });
    };

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      void applyUser(session?.user?.id, session?.user?.email);
    });

    void supabase.auth.getSession().then(({ data }) => {
      void applyUser(data.session?.user?.id, data.session?.user?.email);
    });

    return () => {
      cancelled = true;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signOut = useCallback(() => authService.signOut(), []);

  return {
    user: state.user,
    loading: state.loading,
    hadSession,
    signUp: authService.signUp,
    signIn: authService.signInWithPassword,
    resendConfirmation: authService.resendConfirmation,
    signOut,
  };
}
