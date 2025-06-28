import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(
          params as Record<string, string>
        ).toString();
        return {
          url: `/orders?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["orders"],
    }),
    getOrder: builder.query({
      query: (id: string) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["orders"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...orderData }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: orderData,
      }),
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetOrderQuery,
} = orderApi;
