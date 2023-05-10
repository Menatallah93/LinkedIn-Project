import { IUser } from "./IUser";

export interface IMessage {

    id: number,
    fromId: string,
    toId: string,
    messageTime: Date,
    textMessage: string,
    fromUser: IUser
    toUser: IUser
}