import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";
import { refreshAfterWrite } from "@/lib/refresh-after-write";
import {
  discardLegalDraft,
  getLegalSettings,
  getLegalVersion,
  getUserLegalHistory,
  listLegalDocuments,
  markLegalReviewed,
  publishLegalVersion,
  saveLegalDraft,
  setLegalSettings,
} from "./legal-service";
export const ADMIN_LEGAL_KEY = [AUTH_DERIVED_ROOT, "admin", "legal"] as const;
export function useLegalDocuments() {
  return useQuery({ queryKey: [...ADMIN_LEGAL_KEY, "documents"], queryFn: listLegalDocuments });
}
export function useLegalSettings() {
  return useQuery({ queryKey: [...ADMIN_LEGAL_KEY, "facts"], queryFn: getLegalSettings });
}
export function useLegalVersion(id: string | undefined) {
  return useQuery({
    queryKey: [...ADMIN_LEGAL_KEY, "version", id],
    queryFn: () => {
      if (!id) throw new Error("missing legal version");
      return getLegalVersion(id);
    },
    enabled: Boolean(id),
    retry: false,
  });
}
export function useUserLegalHistory(id: string) {
  return useQuery({
    queryKey: [...ADMIN_LEGAL_KEY, "user", id],
    queryFn: () => getUserLegalHistory(id),
  });
}
export function useLegalWrites() {
  const client = useQueryClient();
  const refresh = () => refreshAfterWrite(client, { queryKey: ADMIN_LEGAL_KEY });
  return {
    save: useMutation({
      mutationKey: ADMIN_LEGAL_KEY,
      mutationFn: saveLegalDraft,
      onSuccess: refresh,
    }),
    discard: useMutation({
      mutationKey: ADMIN_LEGAL_KEY,
      mutationFn: discardLegalDraft,
      onSuccess: refresh,
    }),
    publish: useMutation({
      mutationKey: ADMIN_LEGAL_KEY,
      mutationFn: publishLegalVersion,
      onSuccess: refresh,
    }),
    facts: useMutation({
      mutationKey: ADMIN_LEGAL_KEY,
      mutationFn: setLegalSettings,
      onSuccess: refresh,
    }),
    review: useMutation({
      mutationKey: ADMIN_LEGAL_KEY,
      mutationFn: markLegalReviewed,
      onSuccess: refresh,
    }),
  };
}
