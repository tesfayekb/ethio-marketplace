import qrcode from "qrcode-generator";

/** D201 §2 / DEC-187 — server-only QR encoding; this module reads no database. */
export const PUBLIC_ID_RE = /^[23456789abcdefghjkmnpqrstuvwxyz]{10}$/;

export function isPublicId(value: string): boolean {
  return PUBLIC_ID_RE.test(value);
}

export function qrSvg(text: string): string {
  const qr = qrcode(0, "M");
  qr.addData(text);
  qr.make();
  return qr.createSvgTag({ cellSize: 4, margin: 4, scalable: true });
}
