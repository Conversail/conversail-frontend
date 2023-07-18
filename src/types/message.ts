export type MessageType = {
  id?: string;
  content: string;
  replyTo: string;
  createdAt: Date;
  fromYourself: boolean;
};
