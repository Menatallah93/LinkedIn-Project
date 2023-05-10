import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ICreatePost, IPost } from '../Shared-Interface/IPost';
import { Observable, catchError, throwError } from 'rxjs';
import { IUser } from '../Shared-Interface/IUser';
import { ICreateSharedPost, ISharedPost } from '../Shared-Interface/ISharedPost';

@Injectable({
  providedIn: 'root'
})
export class SharedPost implements OnInit {

  constructor(private Http: HttpClient) { }

  ngOnInit(): void {

  }

  GetPosts(): Observable<IPost[]> {
    return this.Http.get<IPost[]>('https://localhost:7223/api/Post')
    .pipe(catchError((err) => {
      return throwError(() => err.message || "server error");
    }));
  }


  CreatePost(Post :ICreateSharedPost){
    return this.Http.post<ICreateSharedPost>('https://localhost:7223/api/Post/SharePost',Post)
    .pipe(catchError((err) => {
      return throwError(() => err.message || "server error");
    }));
  }
  

  GetCurrentUser(id : string){
    return this.Http.get<IUser>(`https://localhost:7223/api/Profile/User/${id}`)
    .pipe(catchError((err) => {
      return throwError(() => err.message || "server error");
    }));
  }
  
  GetSharedPost():Observable<ISharedPost[]>{
    return this.Http.get<ISharedPost[]>(`https://localhost:7223/api/Post/GetSharedPost`)
    .pipe(catchError((err) => {
      return throwError(() => err.message || "server error");
    }));
  }

  SharedPost(SharedPost :ISharedPost){
    return this.Http.post<ISharedPost>('https://localhost:7223/api/Post/SharePost',SharedPost)
    .pipe(catchError((err) => {
      return throwError(() => err.message || "server error");
    }));
  }
  

}
