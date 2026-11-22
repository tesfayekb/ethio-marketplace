import * as React from "react";

import type * as Parts from "./dialog-parts";
import { useOverlays } from "./overlay-loader";

/** The anatomy arrives in the modal's own load, before the real panel can mount. */
export function PanelHeader(props: React.ComponentProps<typeof Parts.PanelHeader>) {
  const impl = useOverlays();
  return impl === null ? null : <impl.dialogParts.PanelHeader {...props} />;
}

export function PanelSubject(props: React.ComponentProps<typeof Parts.PanelSubject>) {
  const impl = useOverlays();
  return impl === null ? null : <impl.dialogParts.PanelSubject {...props} />;
}

export function PanelBody(props: React.ComponentProps<typeof Parts.PanelBody>) {
  const impl = useOverlays();
  return impl === null ? null : <impl.dialogParts.PanelBody {...props} />;
}

export function PanelFooter(props: React.ComponentProps<typeof Parts.PanelFooter>) {
  const impl = useOverlays();
  return impl === null ? null : <impl.dialogParts.PanelFooter {...props} />;
}

export function StepTrack(props: React.ComponentProps<typeof Parts.StepTrack>) {
  const impl = useOverlays();
  return impl === null ? null : <impl.dialogParts.StepTrack {...props} />;
}

export function ActionRow(props: React.ComponentProps<typeof Parts.ActionRow>) {
  const impl = useOverlays();
  return impl === null ? null : <impl.dialogParts.ActionRow {...props} />;
}

export const ClosedPrimary = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Parts.ClosedPrimary>
>((props, ref) => {
  const impl = useOverlays();
  return impl === null ? null : <impl.dialogParts.ClosedPrimary {...props} ref={ref} />;
});
ClosedPrimary.displayName = "ClosedPrimary";
