import { Injectable } from '@angular/core';
import { IPostMessage } from '../Shared-Interface/IPostMessage';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ISendRequest } from '../Shared-Interface/ISendRequest';
import { IMessage } from '../Shared-Interface/IMessage';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  AddMessage(Message: IPostMessage) {
    return this.http.post<IPostMessage>(`https://localhost:7223/api/Message/AddMessage`, Message)
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }
  GetMessages(Users: ISendRequest) {
    return this.http.get<IMessage[]>(`https://localhost:7223/api/Message/GetMessages?FromId=${Users.fromId}&ToId=${Users.toId}`)
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }
  
}
