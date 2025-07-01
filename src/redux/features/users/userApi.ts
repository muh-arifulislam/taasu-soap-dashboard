import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),

    updateUserProfile: builder.mutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: ({ id, payload }: { id: string; payload: any }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["profile"],
    }),

    getAdminUsers: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(
          params as Record<string, string>
        ).toString();
        return {
          url: `/users?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),

    updateAdminUser: builder.mutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: ({ id, payload }: { id: string; payload: any }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["users"],
    }),

    createAdminUser: builder.mutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: ({ payload }: { payload: any }) => ({
        url: `/users`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["users"],
    }),

    deleteAdminUser: builder.mutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: ({ id }: { id: string }) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateUserProfileMutation,
  useGetAdminUsersQuery,
  useUpdateAdminUserMutation,
  useCreateAdminUserMutation,
  useDeleteAdminUserMutation,
} = userApi;

export default userApi;
