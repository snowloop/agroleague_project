export interface ISubject {
  _id: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  messageList: IMessage[];
}

export type TSubjectWithoutMessages = Omit<ISubject, "messageList">;

export interface IMessage {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
