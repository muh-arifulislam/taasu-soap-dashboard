import z from "zod";

export const productFormSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .min(2, "Product name must be at least 2 characters"),
  sku: z
    .string()
    .min(1, "SKU is required")
    .min(3, "SKU must be at least 3 characters"),
  price: z.number().min(0, "Price must be greater than 0"),
  descriptions: z
    .array(z.string().min(1, "Description cannot be empty"))
    .min(1, "At least one description is required"),
  advantages: z
    .array(z.string().min(1, "Advantage cannot be empty"))
    .min(1, "At least one advantage is required"),
  ingredients: z
    .array(z.string().min(1, "Ingredient cannot be empty"))
    .min(1, "At least one ingredient is required"),
  addInformation: z.object({
    weight: z.string().min(1, "Weight is required"),
    dimension: z.string().optional(),
    direction: z.string().optional(),
    warnings: z.string().optional(),
  }),
  images: z
    .array(z.string().url("Invalid URL format"))
    .min(1, "At least one image is required"),
  categoryId: z.string().min(1, "Category is required"),

  stock: z.number().min(0, "Quantity cannot be negative"),
  sold: z.number().min(0, "Quantity cannot be negative"),

  discountId: z.string().nullable().optional(),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
