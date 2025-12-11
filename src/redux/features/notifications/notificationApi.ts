import { notificationApi } from "@/redux/api/notificationApi";

const notificationsApi = notificationApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminNotifications: builder.query({
      query: () => {
        return {
          url: `/notifications`,
          method: "GET",
        };
      },
      providesTags: ["notifications"],
    }),

    markAsRead: builder.mutation({
      query: ({ id }) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["notifications"],
    }),

    markAllAsRead: builder.mutation<void, void>({
      query: () => ({ url: `/notifications/read-all`, method: "PATCH" }),
      invalidatesTags: ["notifications"],
    }),

    deleteNotification: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({ url: `/notifications/${id}`, method: "DELETE" }),
      invalidatesTags: ["notifications"],
    }),
  }),
});

export const {
  useGetAdminNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
} = notificationsApi;
