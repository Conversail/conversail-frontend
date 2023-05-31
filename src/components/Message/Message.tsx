import { MessageType } from "@/src/types/message";

function Message({ id, content, replyTo, sentAt, fromYourself }: MessageType) {
  return (
    <div
      className={`c-message ${fromYourself ? "c-message--from-yourself" : ""}`}
    >
      <p>{content}</p>
      <span className="c-message__time">
        {sentAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
    </div>
  );
}

export default Message;
