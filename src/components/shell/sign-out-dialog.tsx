import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useI18n } from "@/i18n";

/**
 * U0j — the ONE sign-out confirmation (INC-072).
 *
 * Every sign-out affordance (rail/drawer foot, account menu) opens this
 * dialog; only the confirm action performs the hard reset. Radix AlertDialog
 * gives the focus trap and Escape-cancels for free; targets are >= 44px.
 */
export function SignOutDialog({
  open,
  onOpenChange,
  onConfirm,
  busy,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  busy: boolean;
}) {
  const { t } = useI18n();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent data-testid="sign-out-dialog" className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("auth.signOutConfirmTitle")}</AlertDialogTitle>
          <AlertDialogDescription>{t("auth.signOutConfirmBody")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-testid="sign-out-cancel" className="min-h-11">
            {t("common.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            data-testid="sign-out-confirm"
            className="min-h-11"
            disabled={busy}
            onClick={(event) => {
              // Keep the dialog mounted until the reset finishes.
              event.preventDefault();
              onConfirm();
            }}
          >
            {busy ? t("auth.working") : t("auth.signOut")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
