import type { ProductCategoryType } from "@/types";

export const PRODUCT_CATEGORY_TYPES: {
  label: string;
  value: ProductCategoryType;
}[] = [
  { label: "Type", value: "type" },
  { label: "Skin Type", value: "skinType" },
  { label: "Scent", value: "scent" },
  { label: "Use Case", value: "useCase" },
  { label: "Feature", value: "feature" },
];
