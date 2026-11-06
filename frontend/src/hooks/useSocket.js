import { useEffect } from "react";
import { socket } from "../lib/socket";

export function useSocket(event, callback) {
  useEffect(() => {
    socket.connect();

    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
    };
  }, [event, callback]);
}
