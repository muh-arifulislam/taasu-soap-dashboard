import { addNotification } from "@/redux/features/notifications/notificationSlice";
import type { NotificationDto } from "@/redux/features/notifications/types";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5001";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAdminNotifications = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.emit("join-admin");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (payload: any) => {
      // Convert payload to NotificationDto shape expected
      const dto: NotificationDto = {
        _id: payload._id ?? payload.orderId ?? String(Date.now()),
        title: payload.title ?? payload.message ?? "New notification",
        message: payload.message ?? JSON.stringify(payload),
        userId: payload.userId,
        type: payload.type ?? "order",
        isRead: payload.isRead ?? false,
        eventId: payload.eventId,
        createdAt: payload.createdAt ?? new Date().toISOString(),
      };

      dispatch(addNotification(dto));
    };

    socket.on("notification", handler);

    return () => {
      socket.off("notification");
    };
  }, []);
};
