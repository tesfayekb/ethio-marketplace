import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState, type ComponentProps } from "react";

import { IconButtonBare } from "@/components/ui/icon-button";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

/** One visibility control inside the field; the input retains its form contract. */
export const PasswordInput = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ className, type: _type, ...props }, ref) => {
    const { t } = useI18n();
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative w-full min-w-0">
        <input
          {...props}
          ref={ref}
          type={visible ? "text" : "password"}
          className={cn(className, "w-full pe-11")}
        />
        <IconButtonBare
          data-testid="password-toggle"
          type="button"
          aria-pressed={visible}
          label={t(visible ? "auth.hidePassword" : "auth.showPassword")}
          icon={visible ? <EyeOff /> : <Eye />}
          size="touch"
          disabled={props.disabled}
          onClick={() => setVisible((current) => !current)}
          className="absolute end-0 top-1/2 -translate-y-1/2"
        />
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";