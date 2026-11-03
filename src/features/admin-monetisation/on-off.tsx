import { TipBadge } from "@/components/shell/tip-badge";
import type { MessageKey } from "@/i18n";

/** P-1b — the on/off word every product and market table shows (a badge, P-1's words). */
export function OnOff({
  value,
  testid,
  t,
}: {
  value: boolean;
  testid: string;
  t: (key: MessageKey) => string;
}) {
  const word = t(value ? "admin.packages.on" : "admin.packages.off");
  return (
    <TipBadge variant={value ? "secondary" : "outline"} label={word} tip={word} testid={testid} />
  );
}
