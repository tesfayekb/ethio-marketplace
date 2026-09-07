import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

import {
  deleteAttribute,
  linkAttribute,
  listAttributes,
  listAttributeCategories,
  listCategoryLinks,
  mergeAttributes,
  setAttributeLinkOrder,
  setCardAttributes,
  unlinkAttribute,
  upsertAttribute,
  type UpsertAttributeInput,
} from "./attributes-service";

/**
 * U1g-3 purge law: the key starts at AUTH_DERIVED_ROOT so a sign-out drops
 * every attributes-console read with one removeQueries().
 */
export const ADMIN_ATTRIBUTES_KEY = [AUTH_DERIVED_ROOT, "admin", "attributes"] as const;
/** The roster reports attribute_count / card_attribute_count, so it re-reads too. */
const ADMIN_CATEGORIES_KEY = [AUTH_DERIVED_ROOT, "admin", "categories"] as const;

export function useAdminAttributes() {
  return useQuery({
    queryKey: [...ADMIN_ATTRIBUTES_KEY, "list"],
    queryFn: listAttributes,
    staleTime: 30_000,
  });
}

export function useCategoryLinks(categoryId: string | null) {
  return useQuery({
    queryKey: [...ADMIN_ATTRIBUTES_KEY, "links", categoryId ?? "none"],
    queryFn: () => listCategoryLinks(categoryId as string),
    enabled: categoryId !== null,
    staleTime: 10_000,
  });
}

function useInvalidateAttributes() {
  const queryClient = useQueryClient();
  return async () => {
    await queryClient.invalidateQueries({ queryKey: ADMIN_ATTRIBUTES_KEY });
    await queryClient.invalidateQueries({ queryKey: ADMIN_CATEGORIES_KEY });
  };
}

export function useUpsertAttribute() {
  const invalidate = useInvalidateAttributes();
  return useMutation({
    mutationFn: (input: UpsertAttributeInput) => upsertAttribute(input),
    onSettled: invalidate,
  });
}

export function useDeleteAttribute() {
  const invalidate = useInvalidateAttributes();
  return useMutation({
    mutationFn: (input: { id: string; confirmKey: string }) => deleteAttribute(input),
    onSettled: invalidate,
  });
}

export function useMergeAttributes() {
  const invalidate = useInvalidateAttributes();
  return useMutation({
    mutationFn: (input: { targetId: string; sourceIds: string[] }) => mergeAttributes(input),
    onSettled: invalidate,
  });
}

export function useLinkAttribute() {
  const invalidate = useInvalidateAttributes();
  return useMutation({
    mutationFn: (input: {
      categoryId: string;
      attributeId: string;
      isRequired: boolean;
      isFilterable: boolean;
      displayOrder: number | null;
    }) => linkAttribute(input),
    onSettled: invalidate,
  });
}

export function useUnlinkAttribute() {
  const invalidate = useInvalidateAttributes();
  return useMutation({
    mutationFn: (linkId: string) => unlinkAttribute(linkId),
    onSettled: invalidate,
  });
}

export function useSetCardAttributes() {
  const invalidate = useInvalidateAttributes();
  return useMutation({
    mutationFn: (input: { categoryId: string; orderedAttributeIds: string[] }) =>
      setCardAttributes(input),
    onSettled: invalidate,
  });
}

export function useSetAttributeLinkOrder() {
  const invalidate = useInvalidateAttributes();
  return useMutation({
    mutationFn: (input: { categoryId: string; orderedLinkIds: string[] }) =>
      setAttributeLinkOrder(input),
    onSettled: invalidate,
  });
}

/**
 * C3-UX-1c — the used-by chips. One read for the whole library (not per row),
 * invalidated by every link/unlink through `useInvalidateAttributes`.
 */
export function useAttributeCategories() {
  return useQuery({
    queryKey: [...ADMIN_ATTRIBUTES_KEY, "categories"],
    queryFn: listAttributeCategories,
    staleTime: 30_000,
  });
}
