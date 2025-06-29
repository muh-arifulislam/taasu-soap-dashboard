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
    changePassword: builder.mutation({
      query: (payload: { currentPassword: string; newPassword: string }) => ({
        url: "/auth/change-password",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginWithEmailMutation, useChangePasswordMutation } = authApi;
export default authApi;
