import { useI18n } from "@/i18n";
import { fill } from "./refusal-text";

/**
 * Bundle 3 step 20 — THE SELLER LINE, drawn in one place.
 *
 * Who is selling: a business by its business name (with the public name under
 * it), a person by the public name. For 365 days after a change it adds
 * "previously <old name>"; it always adds "Member since <month year>". The facts
 * come from `my_seller_line()` (`readSellerLine`); this component only draws.
 * Used by the review summary and the buyer's-eye preview.
 */
export interface SellerLineProps {
  alias: string | null;
  businessName: string | null;
  previousAlias: string | null;
  /** ISO timestamp from the door; null while unknown. */
  memberSince: string | null;
  /** Test id prefix, so each surface keeps its own markers. */
  testId: string;
}

export function SellerLine({
  alias,
  businessName,
  previousAlias,
  memberSince,
  testId,
}: SellerLineProps) {
  const { t, language } = useI18n();
  const business = businessName !== null && businessName !== "" ? businessName : null;
  const since = memberSince === null ? null : new Date(memberSince);
  const sinceText =
    since === null || Number.isNaN(since.getTime())
      ? null
      : new Intl.DateTimeFormat(language, { month: "long", year: "numeric" }).format(since);
  return (
    <>
      <p className="text-sm text-foreground" data-testid={`${testId}-name`}>
        {business ?? alias ?? t("post.review.notGiven")}
      </p>
      {business !== null && alias !== null && alias !== "" && (
        <p className="text-xs text-muted-foreground" data-testid={`${testId}-alias`}>
          {alias}
        </p>
      )}
      {previousAlias !== null && previousAlias !== "" && (
        <p className="text-xs text-muted-foreground" data-testid={`${testId}-previous`}>
          {fill(t("post.seller.previously"), { name: previousAlias })}
        </p>
      )}
      {sinceText !== null && (
        <p className="text-xs text-muted-foreground" data-testid={`${testId}-since`}>
          {fill(t("post.seller.memberSince"), { date: sinceText })}
        </p>
      )}
    </>
  );
}
