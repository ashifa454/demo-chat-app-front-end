import io from "socket.io-client";
import cuid from 'cuid';
export const socket = io("http://localhost:3000");
socket.on("connect", () => {
  if (localStorage.getItem('userId') === null) {
    localStorage.setItem("userId", cuid());
  }
});