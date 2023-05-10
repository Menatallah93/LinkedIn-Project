import { BarOptions } from 'src/assets/vendor/chart.js/types';
import { IUser } from '../Shared-Interface/IUser';
export interface IPost {
    id: number,
    userId: string
    postContent: string,
    like?: number,
    created?: Date,
    file? : string,
    showComment?:boolean
    user:IUser
}
export interface ICreatePost{
    userId:string
    postContent:string
    file?:File
}