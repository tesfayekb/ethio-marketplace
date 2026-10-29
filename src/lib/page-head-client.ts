import type { MessageKey } from "@/i18n/types";

/** INC-990: the sole re-title effect, downloaded only for an applied non-base catalogue. */
let read: (key: MessageKey) => string;
let observer: MutationObserver | undefined;
export function applyPageHead(t: (key: MessageKey) => string): void {
  read = t;
  const update = () => {
    const intent = document.head.querySelector<HTMLMetaElement>('meta[name="ethio-head"]');
    if (!intent) return;
    const [titleKey, descriptionKey, nameKey, rawName] = JSON.parse(intent.content) as [
      MessageKey,
      MessageKey | null,
      MessageKey | null,
      string | null,
    ];
    const name = nameKey ? read(nameKey) : (rawName ?? "");
    for (const [property, key] of [
      ["og:title", titleKey],
      ["og:description", descriptionKey],
    ] as const) {
      if (!key) continue;
      const meta = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      const text = read(key)?.replace("{name}", name);
      if (!meta || text === undefined) continue;
      if (meta.content !== text) meta.content = text;
      if (property === "og:title") {
        if (document.title !== text) document.title = text;
      } else {
        const description = document.head.querySelector<HTMLMetaElement>(
          'meta[name="description"]',
        );
        if (description && description.content !== text) description.content = text;
      }
    }
  };
  observer ??= new MutationObserver(update);
  observer.observe(document.head, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  });
  update();
}
