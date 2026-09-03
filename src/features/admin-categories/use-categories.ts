import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

import {
  addCategoryPointer,
  createCategory,
  listCategories,
  listCategoryPointers,
  moveCategoryPointer,
  removeCategoryPointer,
  reorderCategories,
  retireCategory,
  setCategoryWindow,
  setCountryExclusions,
  updateCategory,
  type CreateCategoryInput,
  type UpdateCategoryInput,
} from "./categories-service";

/**
 * U1g-3 purge law: the key starts at AUTH_DERIVED_ROOT so a sign-out drops
 * every categories-console read with one removeQueries().
 */
export const ADMIN_CATEGORIES_KEY = [AUTH_DERIVED_ROOT, "admin", "categories"] as const;

export function useAdminCategories() {
  return useQuery({
    queryKey: [...ADMIN_CATEGORIES_KEY, "list"],
    queryFn: listCategories,
    staleTime: 30_000,
  });
}

function useInvalidateCategories() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ADMIN_CATEGORIES_KEY });
}

export function useCreateCategory() {
  const invalidate = useInvalidateCategories();
  return useMutation({
    mutationFn: (input: CreateCategoryInput) => createCategory(input),
    onSettled: invalidate,
  });
}

export function useUpdateCategory() {
  const invalidate = useInvalidateCategories();
  return useMutation({
    mutationFn: (input: UpdateCategoryInput) => updateCategory(input),
    onSettled: invalidate,
  });
}

export function useSetCategoryWindow() {
  const invalidate = useInvalidateCategories();
  return useMutation({
    mutationFn: (input: { id: string; visibleFrom: string | null; visibleUntil: string | null }) =>
      setCategoryWindow(input),
    onSettled: invalidate,
  });
}

export function useSetCountryExclusions() {
  const invalidate = useInvalidateCategories();
  return useMutation({
    mutationFn: (input: { id: string; countryCodes: string[] }) => setCountryExclusions(input),
    onSettled: invalidate,
  });
}

export function useRetireCategory() {
  const invalidate = useInvalidateCategories();
  return useMutation({
    mutationFn: (input: { id: string; reassignTo: string }) => retireCategory(input),
    onSettled: invalidate,
  });
}

export function useAddCategoryPointer() {
  const invalidate = useInvalidateCategories();
  return useMutation({
    mutationFn: (input: { parentId: string; childId: string }) => addCategoryPointer(input),
    onSettled: invalidate,
  });
}

/** C2b — the browse paths of one category (pointer-listing contract). */
export function useCategoryPointers(categoryId: string | null) {
  return useQuery({
    queryKey: [...ADMIN_CATEGORIES_KEY, "pointers", categoryId ?? "none"],
    queryFn: () => listCategoryPointers(categoryId as string),
    enabled: categoryId !== null,
    staleTime: 30_000,
  });
}

export function useMoveCategoryPointer() {
  const invalidate = useInvalidateCategories();
  return useMutation({
    mutationFn: (input: { pointerId: string; newParentId: string | null }) =>
      moveCategoryPointer(input),
    onSettled: invalidate,
  });
}

export function useRemoveCategoryPointer() {
  const invalidate = useInvalidateCategories();
  return useMutation({
    mutationFn: (pointerId: string) => removeCategoryPointer(pointerId),
    onSettled: invalidate,
  });
}

export function useReorderCategories() {
  const invalidate = useInvalidateCategories();
  return useMutation({
    mutationFn: (input: { parentId: string | null; orderedChildIds: string[] }) =>
      reorderCategories(input),
    onSettled: invalidate,
  });
}
