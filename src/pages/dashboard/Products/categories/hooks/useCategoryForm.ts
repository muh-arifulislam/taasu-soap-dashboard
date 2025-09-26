import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { PRODUCT_CATEGORY_TYPES } from "../constant";
import type { ProductCategory } from "@/types";
import { categorySchema, type CategoryFormData } from "../validation";

export const useCategoryForm = (editingCategory: ProductCategory | null) => {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      type: PRODUCT_CATEGORY_TYPES[0]?.value || "type",
      isActive: true,
    },
  });

  const resetForm = useCallback(() => {
    form.reset({
      name: "",
      slug: "",
      type: PRODUCT_CATEGORY_TYPES[0]?.value || "type",
      isActive: true,
    });
  }, [form]);

  const populateForm = useCallback(
    (category: ProductCategory) => {
      form.reset({
        name: category.name,
        slug: category.slug,
        type: category.type,
        isActive: category.isActive,
      });
    },
    [form]
  );

  return {
    ...form,
    resetForm,
    populateForm,
  };
};
