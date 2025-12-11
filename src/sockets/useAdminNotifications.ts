import { useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5001";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAdminNotifications = (onReceive: (data: any) => void) => {
  useEffect(() => {
    socket.emit("join-admin");

    socket.on("notification", (data) => {
      onReceive(data);
    });

    return () => {
      socket.off("notification");
    };
  }, [onReceive]);
};
