export interface IMessage {
  createdAt: number;
  text: string;
  author: string;
  room: string;
}

export interface IMessageAlert {
  createdAt: number;
  text: string;
  type: "MESSAGE_ALERT";
  room: string;
  author: string;
}

export interface IChatContext {
  userId: string | null;
  rooms: string[];
  contents: (IMessage | IMessageAlert)[];

  sendMessage: (text: string) => void;
  getRoom: (id: string) => string | undefined;
  navigateRoom: (room: string | null) => void;

  joinGroup: (id: string) => void;
  createGroup: () => void;
}
