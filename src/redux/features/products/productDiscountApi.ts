import { baseApi } from "@/redux/api/baseApi";
import type { ApiResponse, ProductDiscount } from "@/types";

export const productDiscountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create
    createDiscount: builder.mutation({
      query: (data) => ({
        url: "product-discounts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["productDiscounts"],
    }),

    // Read All
    getAllDiscounts: builder.query<
      ApiResponse<ProductDiscount[]>,
      { searchTerm: string; discountRangeFilter: string; statusFilter: string }
    >({
      query: ({ searchTerm, statusFilter, discountRangeFilter }) => ({
        method: "GET",
        url: `product-discounts?searchTerm=${searchTerm}&status=${statusFilter}&discountRange=${discountRangeFilter}`,
      }),
      providesTags: ["productDiscounts"],
    }),

    // Read by ID
    getDiscountById: builder.query({
      query: (id) => ({
        method: "GET",
        url: `product-discounts/${id}`,
      }),
    }),

    // Update
    updateDiscount: builder.mutation({
      query: ({ id, data }) => ({
        url: `product-discounts/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["productDiscounts"],
    }),

    // Soft Delete
    deleteDiscount: builder.mutation({
      query: (id) => ({
        url: `product-discounts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["productDiscounts"],
    }),
  }),
});

export const {
  useCreateDiscountMutation,
  useGetAllDiscountsQuery,
  useGetDiscountByIdQuery,
  useUpdateDiscountMutation,
  useDeleteDiscountMutation,
} = productDiscountApi;
