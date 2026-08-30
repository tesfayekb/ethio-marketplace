import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { fetchEntityBundle, fetchUiBundle } from "./bundle";
import { EMPTY_ENTITY_BUNDLE, type EntityBundle } from "./entity";
import { en } from "./locales/en";
import { SUPPORTED_LANGUAGES, type Language, type MessageKey, type Messages } from "./types";

export const LANGUAGE_STORAGE_KEY = "ethio.lang";

/** Only "en" is bundled statically; other locales are fetched on demand. */
const loaders: Record<Exclude<Language, "en">, () => Promise<Messages>> = {
  am: () => import("./locales/am").then((m) => m.am),
};

type I18nValue = {
  language: Language;
  setLanguage: (next: Language) => void;
  t: (key: MessageKey) => string;
  /** U4d — approved entity names for the active language (overlay, never a replacement). */
  entities: EntityBundle;
};

const I18nContext = createContext<I18nValue | null>(null);

function isLanguage(value: string | null): value is Language {
  return value !== null && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [messages, setMessages] = useState<Messages>(en);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode); language still applies for this session.
    }
  }, []);

  // Restore the persisted choice after hydration.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (isLanguage(stored) && stored !== "en") setLanguageState(stored);
  }, []);

  // Load the active locale only.
  useEffect(() => {
    let cancelled = false;

    /**
     * D3 runtime flip (U4b), corrected by INC-095: the DB bundle is an OVERLAY
     * on the compiled ACTIVE catalog, never a replacement. The chain is
     * additive and applied lowest-first:
     *
     *   compiled.en  ▸  compiled[lang]  ▸  DB[lang]
     *
     * so an empty, partial or failing bundle is INVISIBLE: the compiled active
     * catalog still answers every key, and compiled English is the last resort.
     */
    const applyWithBundle = (compiled: Messages) => {
      if (cancelled) return;
      const base = { ...en, ...compiled } as Messages;
      setMessages(base);
      void fetchUiBundle(language).then(({ bundle, reason }) => {
        if (cancelled) return;
        if (!bundle) {
          console.warn(`[i18n] bundle fallback for ${language}: ${reason}`);
          return;
        }
        setMessages({ ...base, ...bundle } as Messages);
      });
    };

    if (language === "en") {
      applyWithBundle(en);
      return () => {
        cancelled = true;
      };
    }
    loaders[language]().then(applyWithBundle);
    return () => {
      cancelled = true;
    };
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<I18nValue>(
    () => ({
      language,
      setLanguage,
      t: (key: MessageKey) => messages[key] ?? en[key],
      entities,
    }),
    [language, setLanguage, messages, entities],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}
