import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISendRequest } from '../Shared-Interface/ISendRequest';
import { Observable, catchError, from, throwError } from 'rxjs';
import { IUser } from '../Shared-Interface/IUser';
@Injectable({
  providedIn: 'root'
})
export class FrindRequstService {

  constructor(private Http: HttpClient) { }

  SenConnect(fromId: string, toId: string) {
    return this.Http.post(`https://localhost:7223/api/Frind/SendRequset`, { fromId, toId })
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }

  GetRequest(toId: string): Observable<IUser[]> {
    return this.Http.get<IUser[]>(`https://localhost:7223/api/Frind/ToId?ToId=${toId}`)
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }
  GetNumberRequest(toId: string): Observable<number> {
    return this.Http.get<number>(`https://localhost:7223/api/Frind/NewRequest?Id=${toId}`)
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }
  CheckFrind(fromId: string, toId: string): Observable<boolean> {
    return this.Http.get<boolean>(`https://localhost:7223/api/Frind/CheckFrind?FromId=${fromId}&ToId=${toId}`)
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }

  CheckReject(fromId: string, toId: string): Observable<boolean> {
    return this.Http.get<boolean>(`https://localhost:7223/api/Frind/CheckRejected?FromId=${fromId}&ToId=${toId}`)
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }
  CheckPending(fromId: string, toId: string): Observable<boolean> {
    return this.Http.get<boolean>(`https://localhost:7223/api/Frind/CheckPendding?FromId=${fromId}&ToId=${toId}`)
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }

  AcceptRequest(FromId: string, ToId: string) {
    return this.Http.post(`https://localhost:7223/api/Frind/Accept`, { FromId, ToId })
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }
  CancelRequest(FromId: string, ToId: string) {
    return this.Http.post(`https://localhost:7223/api/Frind/CancelRequest`, { FromId, ToId })
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }

  RejectRequest(FromId: string, ToId: string) {
    return this.Http.post(`https://localhost:7223/api/Frind/Reject`, { FromId, ToId })
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }

  GetFriends(fromId: string): Observable<IUser[]> {
    return this.Http.get<IUser[]>(`https://localhost:7223/api/Frind/GetFriends?Id=${fromId}`)
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }

}
