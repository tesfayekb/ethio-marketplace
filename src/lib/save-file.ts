import { appObjectUrl } from "@/lib/safe-href";

/**
 * DEC-370 — THE ONE DOWNLOAD: a blob the app holds is saved under a file name through an object
 * URL the app made (`appObjectUrl`), clicked once and revoked, so the page's one `.href` sink
 * lives here. Used by the route client's downloads, the legal console's exports and the
 * translations console's transfers.
 */
export function saveBlobAs(blob: Blob, name: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  try {
    anchor.href = appObjectUrl(url);
    anchor.download = name;
    document.body.appendChild(anchor);
    anchor.click();
  } finally {
    anchor.remove();
    URL.revokeObjectURL(url);
  }
}
