import { z } from "zod";
import { uuid } from "./primitives";

export const GenerateImageBody = z.object({ categoryId: uuid }).strict();
export const GenerateImageProbeQuery = z.object({ probe: z.literal("1"), categoryId: uuid }).strict();