import { IPost } from "./IPost"
import { IUser } from "./IUser"

export interface ISharedPost{
    id:number
    userId:string
    post:IPost
    user?:IUser
    postId:number
    showComment?:boolean
}

export interface ICreateSharedPost{
    id:number
    userId:string
    postId?:number
}