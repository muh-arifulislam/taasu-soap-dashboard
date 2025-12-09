import type { ProductDiscount } from "@/types";
import { useForm } from "react-hook-form";
import { discountSchema, type DiscountFormData } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCallback } from "react";

export const useDiscountForm = () => {
  const form = useForm<DiscountFormData>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      name: "",
      description: "",
      discountPercent: 0,
      isActive: true,
    },
  });

  const resetForm = useCallback(() => {
    form.reset({
      name: "",
      description: "",
      discountPercent: 0,
      isActive: true,
    });
  }, [form]);

  const populateForm = useCallback(
    (discount: ProductDiscount) => {
      form.reset({
        name: discount.name,
        description: discount.description,
        discountPercent: discount.discountPercent,
        isActive: discount.isActive,
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
