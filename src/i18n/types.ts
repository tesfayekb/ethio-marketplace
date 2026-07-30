import type { en } from "./locales/en";

/** Compile-time key parity: every locale file must satisfy this exact key set. */
export type Messages = { [K in keyof typeof en]: string };

export type MessageKey = keyof Messages;

export const SUPPORTED_LANGUAGES = ["en", "am"] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];
