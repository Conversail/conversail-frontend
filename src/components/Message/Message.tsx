import { MessageType } from "@/src/types";

function Message({ content, createdAt, fromYourself }: MessageType) {
  return (
    <div
      className={`c-message ${fromYourself ? "c-message--from-yourself" : ""}`}
    >
      <p>{content}</p>
      <span className="c-message__time">
        {createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
    </div>
  );
}

export default Message;
