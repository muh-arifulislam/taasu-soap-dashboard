import { baseApi } from "@/redux/api/baseApi";
import type { ApiResponse, Product } from "@/types";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create
    createProduct: builder.mutation({
      query: (data) => ({
        url: "products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),

    // Read All with query filters
    getAllProducts: builder.query<
      ApiResponse<Product[]>,
      { page?: number; limit?: number; categories?: string }
    >({
      query: ({ page = 1, limit = 9, categories = "" }) => ({
        url: `product?page=${page}&limit=${limit}&categories=${categories}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),

    // Read by ID
    getProductById: builder.query<Product, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} = productApi;
