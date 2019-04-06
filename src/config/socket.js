import io from "socket.io-client";

export const socket = io("http://localhost:3000");
socket.on("connect", () => {
  localStorage.setItem("userId", socket.id);
});