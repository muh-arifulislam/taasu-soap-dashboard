import { baseApi } from "@/redux/api/baseApi";
import type {
  ApiResponse,
  ProductCategory,
  ProductCategoryType,
} from "@/types";

export const productCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create
    createCategory: builder.mutation({
      query: (data) => ({
        url: "categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["productCategories"],
    }),

    // Read All
    getAllCategories: builder.query<
      ApiResponse<ProductCategory[]>,
      {
        searchTerm?: string;
        activeStatus?: string;
        type?: ProductCategoryType | "all";

        page?: number;
        limit?: number;
        sortBy?: string;
      }
    >({
      query: ({ searchTerm, activeStatus, type, page, limit, sortBy }) => {
        const params = new URLSearchParams();

        if (searchTerm) params.append("search", searchTerm);
        // if (isActive) params.append("status", isActive);
        if (type && type !== "all") params.append("type", type);
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (sortBy) params.append("sort", sortBy);

        if (activeStatus === "active") {
          params.append("isActive", "true");
        } else if (activeStatus === "inactive") {
          params.append("isActive", "false");
        }

        return {
          method: "GET",
          url: `categories?${params.toString()}`,
        };
      },
      providesTags: ["productCategories"],
    }),

    // Read by ID
    getCategoryById: builder.query({
      query: (id) => ({
        method: "GET",
        url: `categories/${id}`,
      }),
    }),

    // Update
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["productCategories"],
    }),

    // Soft Delete
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["productCategories"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = productCategoryApi;
