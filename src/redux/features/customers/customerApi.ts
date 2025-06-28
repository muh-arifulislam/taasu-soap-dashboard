import { baseApi } from "@/redux/api/baseApi";

const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(
          params as Record<string, string>
        ).toString();
        return {
          url: `/users/customer?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["customers"],
    }),
    getCustomer: builder.query({
      query: (id: string) => ({
        url: `/users/customer/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCustomerQuery, useGetCustomersQuery } = customerApi;
