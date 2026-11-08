import { useEffect, useState } from "react";
import { socket } from "../lib/socket";

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [socketError, setSocketError] = useState(null);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      setSocketError(null);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onConnectError(err) {
      // For error from backend
      if (err.data && err.data.code) {
        setSocketError({
          code: err.data.code,
          message: err.message,
        });
        return;
      }

      // For network error
      if (err.message === "xhr poll error") {
        setSocketError({
          code: "NETWORK_ERROR",
          message: "Cant connect to server",
        });
      } else {
        setSocketError({
          code: "UNKNOWN_ERROR",
          message: err.message || "A connection error occurred",
        });
      }
    }

    function onAppError(data) {
      setSocketError(data);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on("exception", onAppError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.off("exception", onAppError);
    };
  }, []);

  return { socket, isConnected, socketError, setSocketError };
};
