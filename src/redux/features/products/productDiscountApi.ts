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
      {
        searchTerm?: string;
        activeStatus?: string;
        page?: number;
        limit?: number;
        sortBy?: string;
        discountRangeFilter?: string;
      }
    >({
      query: ({
        searchTerm,
        activeStatus,
        page,
        limit,
        sortBy,
        discountRangeFilter,
      }) => {
        const params = new URLSearchParams();

        if (searchTerm) params.append("search", searchTerm);
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (sortBy) params.append("sort", sortBy);
        if (discountRangeFilter) {
          params.append("discountRange", discountRangeFilter);
        }
        if (activeStatus === "active") {
          params.append("isActive", "true");
        } else if (activeStatus === "inactive") {
          params.append("isActive", "false");
        }

        return {
          method: "GET",
          url: `product-discounts?${params.toString()}`,
        };
      },
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
