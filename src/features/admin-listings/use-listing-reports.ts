import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ownValue } from "@/lib/own-key";
import { ADMIN_LISTINGS_KEY } from "./use-admin-listings";

export function useOpenReportCounts(listingIds: readonly string[], enabled: boolean) {
  const ids = [...new Set(listingIds)].sort();
  return useQuery({
    queryKey: [...ADMIN_LISTINGS_KEY, "reports", "open", ids.join(",")],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("admin_open_report_counts", {
        p_listing_ids: ids,
      });
      if (error) throw new Error(error.message);
      if (data === null || typeof data !== "object" || Array.isArray(data))
        throw new Error("invalid report counts");
      return new Map(
        Object.entries(data).map(([id, count]) => {
          if (typeof count !== "number") throw new Error("invalid report count");
          return [id, count] as const;
        }),
      );
    },
    enabled: enabled && ids.length > 0 && ids.length <= 100,
    staleTime: 10_000,
  });
}

export type ListingReport = {
  id: string;
  reason: string;
  note: string | null;
  status: "open" | "closed";
  createdAt: string;
};
export function useListingReports(listingId: string, enabled: boolean) {
  return useQuery({
    queryKey: [...ADMIN_LISTINGS_KEY, "reports", listingId],
    queryFn: async (): Promise<ListingReport[]> => {
      const { data, error } = await supabase.rpc("admin_listing_reports", {
        p_listing_id: listingId,
      });
      if (error) throw new Error(error.message);
      if (!Array.isArray(data)) throw new Error("invalid listing reports");
      return data.map((value) => {
        if (value === null || typeof value !== "object" || Array.isArray(value))
          throw new Error("invalid listing report");
        const row = value as Record<string, unknown>;
        const id = ownValue(row, "id"),
          reason = ownValue(row, "reason"),
          note = ownValue(row, "note"),
          status = ownValue(row, "status"),
          createdAt = ownValue(row, "createdAt");
        if (
          typeof id !== "string" ||
          typeof reason !== "string" ||
          (note !== null && typeof note !== "string") ||
          (status !== "open" && status !== "closed") ||
          typeof createdAt !== "string"
        )
          throw new Error("invalid listing report fields");
        return { id, reason, note, status, createdAt };
      });
    },
    enabled,
  });
}
