import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginWithEmail: builder.mutation({
      query: ({ email, password }: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
    }),
  }),
});

export const { useLoginWithEmailMutation } = authApi;
export default authApi;
