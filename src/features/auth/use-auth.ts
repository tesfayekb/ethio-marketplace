import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";

import * as authService from "./auth-service";
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
      if (!stale()) {
        setState({ user: { id: userId, email: email ?? null, displayName: null }, loading: false });
      }
      // The signup trigger owns profile rows; we only read the display name.
      const { data } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", userId)
        .maybeSingle();
      if (stale()) return;
      setState({
        user: {
          id: userId,
          email: email ?? null,
          displayName: data?.display_name ?? null,
        },
        loading: false,
      });
    };

    /**
     * U4g-6 (INC-101) — INVARIANT: AUTH-DERIVED STATE SETTLES INDEPENDENTLY OF
     * EVERY OTHER SUPABASE READ (i18n's public-language read included).
     *
     * supabase-js serialises ALL session access through one exclusive auth
     * lock, and `onAuthStateChange` callbacks are invoked while that lock is
     * held. Issuing a Supabase request from INSIDE the callback (this hook's
     * profile read did) makes that request wait for a lock its own caller is
     * holding — a re-entrancy the library documents as a deadlock. Before U4f
     * nothing else contended for the lock, so it always drained; the i18n
     * provider's `languages` read (mounted above the shell, fired on the same
     * first frames) now interleaves and the profile read — and behind it the
     * permission read — can hang forever. Symptoms: displayName never arrives
     * ("Signed in" fallback) and AdminGate's `pending` never clears.
     *
     * THE FIX IS STRUCTURAL: never touch Supabase inside the callback. A
     * macrotask hop releases the lock first; sequencing is still enforced by
     * the `seq` ticket above, so a deferred write from an older event loses.
     */
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      const userId = session?.user?.id;
      const email = session?.user?.email;
      setTimeout(() => {
        if (cancelled) return;
        void applyUser(userId, email);
      }, 0);
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
    signUp: authService.signUp,
    signIn: authService.signInWithPassword,
    resendConfirmation: authService.resendConfirmation,
    signOut,
  };
}
