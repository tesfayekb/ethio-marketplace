import { registerNoticeOutlet } from "@/lib/notice-outlets";

/**
 * INC-955 — the place inside a modal overlay's content where the shell's notices are drawn while
 * it is open (the mechanism: src/lib/notice-outlets.ts). Absolute over the content's foot, so it
 * takes no room and adds no gap; it passes the pointer through but for the notice itself; a
 * polite live region from its first paint, with no role (ODN-2).
 */
export function NoticeOutlet() {
  // React 19's ref cleanup: the outlet leaves the register when its element unmounts.
  return (
    <div
      ref={registerNoticeOutlet}
      aria-live="polite"
      data-notice-outlet=""
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center p-3"
    />
  );
}
