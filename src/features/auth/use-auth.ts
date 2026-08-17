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
    signUp: authService.signUp,
    signIn: authService.signInWithPassword,
    resendConfirmation: authService.resendConfirmation,
    signOut,
  };
}
