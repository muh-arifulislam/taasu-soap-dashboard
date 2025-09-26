import { baseApi } from "@/redux/api/baseApi";

const inventoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInventories: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(
          params as Record<string, string>
        ).toString();
        return {
          url: `/inventory?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["inventories"],
    }),
  }),
});

export const { useGetInventoriesQuery } = inventoriesApi;
