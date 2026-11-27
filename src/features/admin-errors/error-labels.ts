import type { MessageKey } from "@/i18n";
import { ERROR_KINDS, type Device, type ErrorKind } from "@/lib/error-clean";
import type { ErrorWindow } from "@/lib/errors-search";

export { DEFAULT_WINDOW, ERROR_WINDOWS, type ErrorWindow } from "@/lib/errors-search";

/** Each kind's words, as staff read them. */
export const KIND_WORDS: Readonly<Record<ErrorKind, MessageKey>> = {
  notice: "admin.errors.kind.notice",
  crash: "admin.errors.kind.crash",
  unhandled: "admin.errors.kind.unhandled",
  route: "admin.errors.kind.route",
  upstream: "admin.errors.kind.upstream",
  render: "admin.errors.kind.render",
};

export const DEVICE_WORDS: Readonly<Record<Device, MessageKey>> = {
  phone: "admin.errors.device.phone",
  tablet: "admin.errors.device.tablet",
  desktop: "admin.errors.device.desktop",
};

/** The address's kind as a known kind, or none (an unknown word reads as every kind). */
export function knownKind(value: string | null | undefined): ErrorKind | null {
  return ERROR_KINDS.find((kind) => kind === value) ?? null;
}

export const WINDOW_WORDS: Readonly<Record<ErrorWindow, MessageKey>> = {
  1: "admin.errors.window.1",
  7: "admin.errors.window.7",
  30: "admin.errors.window.30",
  90: "admin.errors.window.90",
};
