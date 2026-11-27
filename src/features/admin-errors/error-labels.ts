import type { MessageKey } from "@/i18n";
import type { ErrorKind } from "@/lib/error-clean";
import type { Device } from "@/lib/schemas/error-report";

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

/** The windows offered, in days; 7 by default. */
export const ERROR_WINDOWS = [1, 7, 30, 90] as const;
export type ErrorWindow = (typeof ERROR_WINDOWS)[number];
export const DEFAULT_WINDOW: ErrorWindow = 7;

export const WINDOW_WORDS: Readonly<Record<ErrorWindow, MessageKey>> = {
  1: "admin.errors.window.1",
  7: "admin.errors.window.7",
  30: "admin.errors.window.30",
  90: "admin.errors.window.90",
};
