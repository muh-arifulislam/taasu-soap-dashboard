import { baseApi } from "@/redux/api/baseApi";
import type { ApiResponse, Inventory, Product } from "@/types";

export type ExtendedInventory = Inventory & {
  products: Pick<Product, "name" | "sku">;
};

export const productInventoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Read All
    getAllInventories: builder.query<
      ApiResponse<ExtendedInventory[]>,
      {
        searchTerm?: string;
        activeStatus?: string;
        page?: number;
        limit?: number;
        sortBy?: string;
        discountRangeFilter?: string;
      }
    >({
      query: ({ searchTerm, page, limit, sortBy }) => {
        const params = new URLSearchParams();

        if (searchTerm) params.append("search", searchTerm);
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (sortBy) params.append("sort", sortBy);

        return {
          method: "GET",
          url: `inventories?${params.toString()}`,
        };
      },
    }),
  }),
});

export const { useGetAllInventoriesQuery } = productInventoryApi;
