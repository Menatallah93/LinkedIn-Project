
import { IUser } from "./IUser";

export interface ISharedComment {
    id: number,
    sharedPostid: number,
    userId: string,
    likes: number,
    date: Date,
    content: string,
    updated: boolean,
    user: IUser
}

export interface ISharedCreateComment {
    postId: number,
    userId: string
    commentContent: any
    
}