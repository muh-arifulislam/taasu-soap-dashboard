import { baseApi } from "@/redux/api/baseApi";
import type { ApiResponse } from "@/types";

type TKeyMetrics = {
  revenue: {
    amount: number;
    growth: number;
  };
  orders: {
    count: number;
    growth: number;
  };
  customers: {
    count: number;
    growth: number;
  };
  products: {
    total: number;
  };
  period: {
    from: number;
    to: number;
  };
};

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Read All with query filters
    getKeyMetrics: builder.query<ApiResponse<TKeyMetrics>, unknown>({
      query: () => ({
        url: `/stats/key-metrics`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetKeyMetricsQuery } = statsApi;
