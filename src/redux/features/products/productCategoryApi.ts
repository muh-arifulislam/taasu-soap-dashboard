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
        isActive?: string;
        type?: ProductCategoryType | "all";
      }
    >({
      query: ({ searchTerm, isActive, type }) => ({
        method: "GET",
        url: `categories?searchTerm=${searchTerm}&status=${isActive}&type=${type}`,
      }),
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
