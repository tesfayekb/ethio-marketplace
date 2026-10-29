import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useI18n, type MessageKey } from "@/i18n";

type Meta = { title?: string; name?: string; property?: string; content?: string };
type Intent = [MessageKey | null, MessageKey | null, MessageKey | null, string | null];
type Head = { meta?: Meta[] };

/** INC-990: literal server fallbacks are unchanged; only keys cross into the client effect. */
export function pageHead<T extends Head>(
  title: MessageKey | null,
  description: MessageKey | null,
  head: T,
  nameKey: MessageKey | null = null,
  name: string | null = null,
): T {
  return {
    ...head,
    meta: head.meta?.map((meta) =>
      meta.title
        ? { ...meta, pageHead: [title, description, nameKey, name] satisfies Intent }
        : meta,
    ),
  };
}

/** One placeholder, not the future general-purpose translation/interpolation API (L-5). */
export function fillOne(pattern: string, name: string): string {
  return pattern.replaceAll("{name}", name);
}

export function headText(
  meta: Array<Meta & { pageHead?: Intent }>,
  t: (key: MessageKey) => string,
) {
  const title = meta.find((item) => item.title);
  if (!title) return null;
  const description = meta.find((item) => item.name === "description")?.content ?? "";
  const intent = title.pageHead;
  if (!intent) return { title: title.title ?? "", description };
  const [titleKey, descriptionKey, nameKey, rawName] = intent;
  const name = nameKey ? t(nameKey) : (rawName ?? "");
  return {
    title: titleKey ? fillOne(t(titleKey) || title.title || "", name) : (title.title ?? ""),
    description: descriptionKey ? fillOne(t(descriptionKey) || description, name) : description,
  };
}

/** The applied catalogue, never a selection, owns this one effect; no loader invalidation. */
export function usePageHead() {
  const { t, appliedLanguage } = useI18n();
  const matches = useRouterState({ select: (state) => state.matches });
  useEffect(() => {
    const match = [...matches].reverse().find((item) => item.meta?.some((meta) => meta.title));
    if (!match?.meta) return;
    const text = headText(match.meta, t);
    if (!text) return;
    document.title = text.title;
    for (const [selector, content] of [
      ['meta[name="description"]', text.description],
      ['meta[property="og:title"]', text.title],
      ['meta[property="og:description"]', text.description],
    ]) document.head.querySelector(selector)?.setAttribute("content", content);
  }, [matches, t, appliedLanguage]);
}