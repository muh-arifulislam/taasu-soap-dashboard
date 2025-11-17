import z from "zod";

export const discountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  discountPercent: z.coerce.number().min(1),
  isActive: z.boolean(),
});

export type DiscountFormData = z.infer<typeof discountSchema>;
