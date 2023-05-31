"use client";

import { Header, Message, ToggleThemeButton } from "@/src/components";
import { useSocket } from "@/src/hooks/useSocket";
import { MessageType } from "@/src/types/message";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsBoxArrowLeft, BsPlug, BsSend } from "react-icons/bs";

export default function Chat() {
  const [status, setStatus] = useState<"lazy" | "pairing" | "paired">("lazy");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const socket = useSocket(process.env.NEXT_PUBLIC_API_URL ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (socket) {
      socket.on("paired", () => {
        setStatus("paired");
      });

      socket.on("chat ended", () => {
        setStatus("lazy");
        setMessages([]);
      });

      socket.on("message", ({ id, content, replyTo, sentAt, fromYourself }) => {
        setMessages([
          { id, content, replyTo, sentAt: new Date(sentAt), fromYourself },
          ...messages,
        ]);
      });
    }
  }, [socket, setStatus, messages, setMessages]);

  const handlePair = useCallback(() => {
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

  const handleSendMessage = useCallback(() => {
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
  }, [inputRef.current, setMessages, messages]);

  return (
    <div className="p-chat">
      <Header bgColor="default">
        <ToggleThemeButton />
      </Header>
      <main className="p-chat__main">
        <div className="p-chat__chatting-area">
          <div className="p-chat__messages-area">
            {status === "pairing" ? (
              <span className="p-chat__pairing-indicator">Pairing</span>
            ) : null}
            {status === "paired" && messages.length === 0 ? (
              <span>Paired</span>
            ) : null}
            {messages.map((message, i) => (
              <Message {...message} key={i} />
            ))}
          </div>
          <div className="p-chat__message-bar">
            <button className="p-chat__bar-button" onClick={() => handlePair()}>
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
            />
            <button className="p-chat__bar-button">
              <BsSend
                className="p-chat__bar-button__icon"
                onClick={() => handleSendMessage()}
              />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
