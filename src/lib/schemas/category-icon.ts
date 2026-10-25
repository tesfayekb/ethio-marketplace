import { z } from "zod";

/** POST /api/admin/categories/suggest-icon — the body shape (turn 16, CHANGE 7). */
export const SuggestIconBody = z
  .object({
    name: z.string().trim().min(1).max(120),
    parentName: z.string().trim().max(120).nullable().optional(),
  })
  .strict();
