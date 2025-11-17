import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/features/products/productCategoryApi";

import { useCallback } from "react";

import type { ProductCategory } from "@/types";
import { toast } from "sonner";
import type { CategoryFormData } from "../validation";

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
