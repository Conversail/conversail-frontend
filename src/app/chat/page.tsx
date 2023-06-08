"use client";

import { Header, Message, ToggleThemeButton } from "@/src/components";
import { useSocket } from "@/src/hooks/useSocket";
import { MessageType } from "@/src/types/message";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsBoxArrowLeft, BsPlug, BsSend } from "react-icons/bs";

export default function Chat() {
  const [status, setStatus] = useState<"lazy" | "pairing" | "paired">("lazy");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [chatEnded, setChatEnded] = useState<boolean>(false);
  const [isUserTyping, setIsUserTyping] = useState<boolean>(false);
  const [isMateTyping, setIsMateTyping] = useState<boolean>(false);
  const socket = useSocket(process.env.NEXT_PUBLIC_API_URL ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (socket) {
      socket.on("paired", () => {
        setStatus("paired");
      });

      socket.on("chat ended", () => {
        setStatus("lazy");
        setChatEnded(true);
      });

      socket.on("message", ({ id, content, replyTo, sentAt, fromYourself }) => {
        setMessages([
          { id, content, replyTo, sentAt: new Date(sentAt), fromYourself },
          ...messages,
        ]);
      });

      socket.on("typing", () => {
        setIsMateTyping(true);
      });

      socket.on("stop typing", () => {
        setIsMateTyping(false);
      });
    }
  }, [socket, setStatus, messages, setMessages, setChatEnded]);

  const handlePair = useCallback(() => {
    setMessages([]);
    setChatEnded(false);
    switch (status) {
      case "lazy":
        socket?.emit("pair");
        setStatus("pairing");
        break;

      default:
        socket?.emit("cancel chatting");
        setStatus("lazy");
    }
  }, [status, setStatus, socket]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!isUserTyping) return;
      if (!inputRef.current) return;

      const content = inputRef.current.value.trim();
      if (!content) return;
      const message: MessageType = {
        content,
        sentAt: new Date(),
        fromYourself: true,
        replyTo: "0",
      };

      socket?.emit(
        "message",
        { content, sentAt: new Date() },
        (response: string) => {
          message.id = response;
        }
      );
      setMessages([message, ...messages]);
      inputRef.current.value = "";
      socket?.emit("stop typing");
      setIsUserTyping(false);
    },
    [inputRef, setMessages, messages, socket, isUserTyping]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.trim() === "") {
        socket?.emit("stop typing");
        setIsUserTyping(false);
      } else {
        socket?.emit("typing");
        setIsUserTyping(true);
      }
    },
    [socket]
  );

  return (
    <div className="p-chat">
      <Header bgColor="default">
        <ToggleThemeButton />
      </Header>
      <main className="p-chat__main">
        <div className="p-chat__chatting-area">
          <div className="p-chat__messages-area">
            <div className="p-chat__messages-area__warnings">
              {status === "pairing" ? (
                <span className="p-chat__indicator-with-ellipsis">Pairing</span>
              ) : null}
              {status === "paired" && messages.length === 0 ? (
                <span>Paired</span>
              ) : null}
              {chatEnded ? <span>Chat ended</span> : null}
              {isMateTyping ? (
                <span className="p-chat__indicator-with-ellipsis">Typing</span>
              ) : null}
            </div>
            {messages.map((message, i) => (
              <Message {...message} key={i} />
            ))}
          </div>
          <div className="p-chat__message-bar">
            <form onSubmit={(e) => handleSubmit(e)}>
              <button
                className="p-chat__bar-button"
                onClick={() => handlePair()}
                type="button"
              >
                {status === "lazy" ? (
                  <BsPlug className="p-chat__bar-button__icon" />
                ) : (
                  <BsBoxArrowLeft className="p-chat__bar-button__icon" />
                )}
              </button>
              <input
                placeholder="Message"
                className="p-chat__message-input"
                ref={inputRef}
                disabled={status !== "paired"}
                onChange={(e) => handleInputChange(e)}
              />
              {isUserTyping ? (
                <button
                  className="p-chat__bar-button p-chat__send-button"
                  type="submit"
                  disabled={status !== "paired"}
                >
                  <BsSend className="p-chat__bar-button__icon" />
                </button>
              ) : null}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
