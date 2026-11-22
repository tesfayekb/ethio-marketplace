export interface SellerCellProps {
  sellerAlias: string | null;
  sellerBusinessName: string | null;
  sellerEmail: string | null;
}

/** Staff listing tables draw only the identity fields their door answered. */
export function SellerCell({ sellerAlias, sellerBusinessName, sellerEmail }: SellerCellProps) {
  const name = sellerBusinessName ?? sellerAlias ?? "—";
  return (
    <span className="block min-w-0 max-w-full">
      <span className="block truncate text-foreground" title={name}>
        {name}
      </span>
      {sellerEmail === null ? null : (
        <span className="block truncate text-xs text-muted-foreground" title={sellerEmail}>
          {sellerEmail}
        </span>
      )}
    </span>
  );
}
