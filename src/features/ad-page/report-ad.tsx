import { Link } from "@tanstack/react-router";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { LazyReportAdDialog } from "./report-ad-dialog-lazy";

/**
 * The ad page's "Report this ad": at first paint only the signed-out link or the
 * opener; the dialog's body arrives on the first tap (L12, report-ad-dialog.tsx).
 */
export function ReportAd({
  publicId,
  viewer,
  signInTo,
  onOwn,
  subjectTitle,
}: {
  publicId: string;
  viewer: "unknown" | "signedOut" | "signedIn";
  signInTo: { to: "/auth"; search: { return: string } };
  onOwn: () => void;
  subjectTitle?: string;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  /** Each opening mounts a fresh dialog, so its reason, note and state start empty. */
  const [opened, setOpened] = useState(0);
  if (viewer === "unknown") return null;
  if (viewer === "signedOut")
    return (
      <Link
        data-testid="listing-report-sign-in"
        to="/auth"
        search={signInTo.search}
        className="inline-flex min-h-11 items-center text-sm text-muted-foreground underline"
      >
        {t("adPage.report.open")}
      </Link>
    );
  return (
    <>
      <Button
        variant="link"
        size="touch"
        className="px-0 text-muted-foreground underline"
        data-testid="listing-report-open"
        aria-haspopup="dialog"
        onClick={() => {
          setOpened((count) => count + 1);
          setOpen(true);
        }}
      >
        {t("adPage.report.open")}
      </Button>
      {opened > 0 && (
        <Suspense fallback={null}>
          <LazyReportAdDialog
            key={opened}
            open={open}
            onOpenChange={setOpen}
            publicId={publicId}
            onOwn={onOwn}
            {...(subjectTitle === undefined ? {} : { subjectTitle })}
          />
        </Suspense>
      )}
    </>
  );
}
