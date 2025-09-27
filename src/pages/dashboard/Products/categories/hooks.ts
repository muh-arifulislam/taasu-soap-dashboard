import { useDebouncedInput } from "@/hooks/useDebouncedInput";
import type { ProductCategoryType } from "@/types";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { PRODUCT_CATEGORY_TYPES } from "./constant";
import { categorySchema, type CategoryFormData } from "./validation";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/features/products/productCategoryApi";
import type { ProductCategory } from "@/types";
import { toast } from "sonner";

export const useCategoryFilters = () => {
  const {
    searchTerm,
    debouncedSearchTerm,
    handleInputChange,
    debouncedSetter,
  } = useDebouncedInput();

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryType, setCategoryType] = useState<ProductCategoryType | "all">(
    "all"
  );
  const [sorting, setSorting] = useState<string>("default");

  // Cancel debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSetter.cancel();
    };
  }, [debouncedSetter]);

  return {
    searchTerm,
    debouncedSearchTerm,
    handleInputChange,
    statusFilter,
    setStatusFilter,
    categoryType,
    setCategoryType,
    sorting,
    setSorting,
  };
};

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

export const useCategoryOperations = () => {
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreate = useCallback(
    async (data: CategoryFormData) => {
      await createCategory(data).unwrap();
      toast.success("Category created successfully.");
    },
    [createCategory]
  );

  const handleUpdate = useCallback(
    async (id: string, data: CategoryFormData) => {
      await updateCategory({ id, data }).unwrap();
      toast.success("Category updated successfully.");
    },
    [updateCategory]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteCategory(id);
      toast.success("Category deleted successfully.");
    },
    [deleteCategory]
  );

  const handleToggleStatus = useCallback(
    async (category: ProductCategory) => {
      const updatedData = {
        ...category,
        isActive: !category.isActive,
      };
      await updateCategory({ id: category._id, data: updatedData }).unwrap();
      toast.success("Category status updated successfully.");
    },
    [updateCategory]
  );

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    handleToggleStatus,
  };
};
