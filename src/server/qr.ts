import qrcode from "qrcode-generator";

import { isPublicId } from "@/features/ad-page/address";

/**
 * D201 §2 / DEC-187 — server-only QR encoding; this module reads no database.
 * The public id's shape lives in src/features/ad-page/address.ts (client-safe);
 * it is re-exported here so the route and QR-1 keep one import.
 */
export { isPublicId };

export function qrSvg(text: string): string {
  const qr = qrcode(0, "M");
  qr.addData(text);
  qr.make();
  return qr.createSvgTag({ cellSize: 4, margin: 4, scalable: true });
}
