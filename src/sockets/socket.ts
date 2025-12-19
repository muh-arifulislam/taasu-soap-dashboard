import { io } from "socket.io-client";

const SOCKET_URL = "https://taasu-saop-notification-micro.onrender.com";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

export default socket;
