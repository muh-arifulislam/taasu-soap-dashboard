import {
  useDeleteNotificationMutation,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
} from "@/redux/features/notifications/notificationApi";
import {
  markAllReadLocal,
  markNotificationRead,
  removeNotification,
} from "@/redux/features/notifications/notificationSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useCallback } from "react";

export const useNotificationsOperations = () => {
  const dispatch = useAppDispatch();
  const [markAsReadApi] = useMarkAsReadMutation();
  const [markAllAsReadApi] = useMarkAllAsReadMutation();
  const [deleteNotificationApi] = useDeleteNotificationMutation();

  const handleMarkAsRead = useCallback(
    async (id: string) => {
      // optimistic local update
      dispatch(markNotificationRead({ id }));
      try {
        await markAsReadApi({ id }).unwrap();
      } catch {
        // optionally revert or refetch
      }
    },
    [markAllAsReadApi]
  );

  const handleMarkAllAsRead = useCallback(async () => {
    dispatch(markAllReadLocal());
    try {
      await markAllAsReadApi().unwrap();
    } catch {
      // handle failure
    }
  }, [markAllAsReadApi]);

  const handleDelete = useCallback(
    async (id: string) => {
      dispatch(removeNotification({ id }));
      try {
        await deleteNotificationApi({ id }).unwrap();
      } catch {
        // handle failure / refetch
      }
    },
    [deleteNotificationApi]
  );

  return {
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleDelete,
  };
};
