"use client";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";

type Props = {
  socket?: Socket;
};

const SocketContext = createContext({} as Props);

export function useSocket() {
  const context = useContext(SocketContext);
  return context;
}

function SocketProvider({ children }: PropsWithChildren) {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    if (!socket) {
      const socketIo = io(process.env.NEXT_PUBLIC_API_URL ?? "", { closeOnBeforeunload: false, path: "/ws" });

      setSocket(socketIo);
    }

    function cleanup() {
      if (socket) socket.disconnect();
    }
    return cleanup;
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
