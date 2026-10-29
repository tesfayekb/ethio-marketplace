import type { MessageKey } from "@/i18n/types";

/** INC-990: the sole re-title effect, downloaded only for an applied non-base catalogue. */
let read: (key: MessageKey) => string;
let observer: MutationObserver | undefined;
export function applyPageHead(t: (key: MessageKey) => string): void {
  read = t;
  const update = () => {
    for (const property of ["og:title", "og:description"]) {
      const meta = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      const key = meta?.dataset.headKey;
      if (!meta || !key) continue;
      const nameKey = meta.dataset.headNameKey;
      const name = nameKey ? read(nameKey as MessageKey) : (meta.dataset.headName ?? "");
      const text = read(key as MessageKey)?.replace("{name}", name);
      if (text === undefined) continue;
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
