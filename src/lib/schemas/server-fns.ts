import { z } from "zod";
import { SCRATCH_KIND } from "@/features/legal/legal-kinds";

/** INC-863: server reads use createServerFn().validator(<schema>). */
export const NoInputSchema = z.undefined();
export const AdPageInputSchema = z.object({ slug: z.string().min(1) }).strict();
export const SellerPageInputSchema = z.object({ name: z.string() }).strict();
export const LegalScratchInputSchema = z
  .object({ kind: z.string().regex(SCRATCH_KIND), countries: z.array(z.string()).max(5) })
  .strict();