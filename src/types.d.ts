export interface IMessage {
  message: string;
  author: string;
  datetime: string;
  _id: string;
}

export interface INewMessage {
  message: string;
  author: string;
}