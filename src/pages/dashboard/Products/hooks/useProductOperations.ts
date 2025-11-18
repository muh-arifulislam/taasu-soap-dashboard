import {
  useCreateProductMutation,
  useDeleteProductMutation,
} from "@/redux/features/products/productApi";
import { useCallback } from "react";
import type { ProductFormData } from "../add/validation";
import { toast } from "sonner";

export const useProductOperations = () => {
  const [addProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleCreate = useCallback(
    async (data: ProductFormData) => {
      await addProduct(data).unwrap();
      toast.success("Product created successfully.");
    },
    [addProduct]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteProduct(id).unwrap();
      toast.success("Product created successfully.");
    },
    [deleteProduct]
  );

  return {
    handleCreate,
    handleDelete,
  };
};
