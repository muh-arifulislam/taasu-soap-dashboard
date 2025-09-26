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

export const PAGINATION_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  LIMIT_OPTIONS: [12, 24, 48, 100],
} as const;

export const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "createdAt-desc", label: "Newest First" },
  { value: "createdAt-asc", label: "Oldest First" },
] as const;

export const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
] as const;
