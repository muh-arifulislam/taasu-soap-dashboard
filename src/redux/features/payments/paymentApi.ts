import { baseApi } from "@/redux/api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: () => {
        return {
          url: `/payments`,
          method: "GET",
        };
      },
      providesTags: ["payments"],
    }),
  }),
});

export const { useGetPaymentsQuery } = paymentApi;
