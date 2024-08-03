export interface IMessage {
  createdAt: number;
  text: string;
  author: "NOTICE" | string;
  room: string;
}

export interface IChatContext {
  clientId: string | null;
  roomId: string | null;
  messages: IMessage[];

  sendMessage: (text: string) => void;

  updateRoom: (id: string) => void;
}
