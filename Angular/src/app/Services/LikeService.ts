import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }
  status:any

  async checkLike(postId:number,user:string):Promise<any>{
    var data:any
      await lastValueFrom( this.http.get(`https://localhost:7223/api/Like?postId=${postId}&userId=${user}`)
      .pipe(tap((result) => {data = result})));
     this.status =data;
     return data;
   }
   checkLike1(postId:number,user:string){
     return  this.http.get(`https://localhost:7223/api/Like?postId=${postId}&userId=${user}`)
     .pipe(catchError((err) => {
       return throwError(() => err.message || "server error");
             }));
   }
   createLike(like:any){
     console.log(like)
     return this.http.post(`https://localhost:7223/api/Like`,like)
     .pipe(catchError((err) => {
       return throwError(() => err.message || "server error");
     }));
   }
   deleteLike(post:number,user:string){
     return this.http.delete(`https://localhost:7223/api/Like?postId=${post}&userId=${user}`)
     .pipe(catchError((err) => {
       return throwError(() => err.message || "server error");
   }));
   }
}