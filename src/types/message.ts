export type MessageType = {
  id?: string;
  content: string;
  replyTo: string;
  sentAt: Date;
  fromYourself: boolean;
};
