import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IComment } from "../Shared-Interface/IComment";
import { IProfile } from '../Shared-Interface/IProfile';
import { IChangePass } from '../Shared-Interface/IChangePass';
import { IPost } from '../Shared-Interface/IPost';
import { IUser } from '../Shared-Interface/IUser';

@Injectable({
  providedIn: 'root'
})
export class ProfileservicesService {

  constructor(private http: HttpClient) { }

  UpdateData(userid: any, ProfileData: IProfile): Observable<IProfile> {

    return this.http.put<IProfile>(`https://localhost:7223/api/Profile/Data/${userid}`, ProfileData)
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }

  GetData(userid: string): Observable<IProfile> {

    return this.http.get<IProfile>(`https://localhost:7223/api/profile/MyData/${userid}`)
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }
  Search(name:string): Observable<IUser> {

    return this.http.get<IUser>(`https://localhost:7223/api/Search/GetUser?name=${name}`)
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }

  ChangePass(id:string,IchPss:IChangePass):Observable<IChangePass>{
    
    return this.http.put<IChangePass>(`https://localhost:7223/api/Profile/Password/${id}`,IchPss)
    .pipe(catchError((err)=>{
      return throwError(()=>err.message ||"server error");
    }));
  }

  GetMyPosts(id:string):Observable<IPost[]>{
    
    return this.http.get<IPost[]>(`https://localhost:7223/api/Post/${id}`)
    .pipe(catchError((err)=>{
      return throwError(()=>err.message ||"server error");
    }));
  }
}