import z from "zod";
import { PRODUCT_CATEGORY_TYPES } from "./constant";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  type: z.enum(
    PRODUCT_CATEGORY_TYPES.map((type) => type.value) as [string, ...string[]]
  ),
  isActive: z.boolean(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
