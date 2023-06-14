import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

function useSocket(url: string) {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    if (!socket) {
      const socketIo = io(url, { closeOnBeforeunload: false });

      setSocket(socketIo);
    }

    function cleanup() {
      if (socket) socket.disconnect();
    }
    return cleanup;
  }, [socket, url]);

  return socket;
}

export { useSocket };
