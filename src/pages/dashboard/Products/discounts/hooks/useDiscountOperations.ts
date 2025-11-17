import {
  useCreateDiscountMutation,
  useDeleteDiscountMutation,
  useUpdateDiscountMutation,
} from "@/redux/features/products/productDiscountApi";

import { useCallback } from "react";

import type { ProductDiscount } from "@/types";
import { toast } from "sonner";
import type { DiscountFormData } from "../validation";

export const useDiscountOperations = () => {
  const [createCategory] = useCreateDiscountMutation();
  const [updateCategory] = useUpdateDiscountMutation();
  const [deleteCategory] = useDeleteDiscountMutation();

  const handleCreate = useCallback(
    async (data: DiscountFormData) => {
      await createCategory(data).unwrap();
      toast.success("Discount created successfully.");
    },
    [createCategory]
  );

  const handleUpdate = useCallback(
    async (id: string, data: DiscountFormData) => {
      await updateCategory({ id, data }).unwrap();
      toast.success("Discount updated successfully.");
    },
    [updateCategory]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteCategory(id);
      toast.success("Discount deleted successfully.");
    },
    [deleteCategory]
  );

  const handleToggleStatus = useCallback(
    async (category: ProductDiscount) => {
      const updatedData = {
        ...category,
        isActive: !category.isActive,
      };
      await updateCategory({ id: category._id, data: updatedData }).unwrap();
      toast.success("Discount status updated successfully.");
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
