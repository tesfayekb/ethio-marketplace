import { supabase } from "@/integrations/supabase/client";
import type { MessageKey } from "@/i18n";

import type { AuthResult, Credentials } from "./types";

/** Where Supabase sends the user after they click the confirmation link. */
export function emailRedirectUrl(): string {
  return `${window.location.origin}/auth/callback`;
}

function isEmailNotConfirmed(message: string, code?: string): boolean {
  return code === "email_not_confirmed" || /email not confirmed/i.test(message);
}

/** Map a Supabase auth error onto a translation key. Raw errors never reach the UI. */
function toErrorKey(error: { message: string; code?: string; status?: number }): MessageKey {
  const message = error.message ?? "";
  const code = error.code;

  if (isEmailNotConfirmed(message, code)) return "auth.errorEmailNotConfirmed";
  if (code === "invalid_credentials" || /invalid login credentials/i.test(message)) {
    return "auth.errorInvalidCredentials";
  }
  if (code === "user_already_exists" || /already registered/i.test(message)) {
    return "auth.errorEmailInUse";
  }
  if (code === "weak_password" || /password should be/i.test(message)) {
    return "auth.errorWeakPassword";
  }
  if (code === "validation_failed" || /invalid email|email address/i.test(message)) {
    return "auth.errorInvalidEmail";
  }
  if (error.status === 429 || /rate limit/i.test(message)) return "auth.errorRateLimited";
  return "auth.errorGeneric";
}

function failure(error: { message: string; code?: string; status?: number }): AuthResult {
  return {
    ok: false,
    errorKey: toErrorKey(error),
    emailNotConfirmed: isEmailNotConfirmed(error.message ?? "", error.code),
  };
}

export async function signUp({ email, password }: Credentials): Promise<AuthResult> {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: emailRedirectUrl() },
  });
  if (error) return failure(error);
  return { ok: true };
}

export async function signInWithPassword({ email, password }: Credentials): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return failure(error);
  return { ok: true };
}

export async function resendConfirmation(email: string): Promise<AuthResult> {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: emailRedirectUrl() },
  });
  if (error) return failure(error);
  return { ok: true };
}

export async function signOut(): Promise<AuthResult> {
  const { error } = await supabase.auth.signOut();
  if (error) return failure(error);
  return { ok: true };
}
