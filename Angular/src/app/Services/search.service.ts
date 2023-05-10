import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IUser } from '../Shared-Interface/IUser';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }

  Search(name:string): Observable<IUser[]> {

    return this.http.get<IUser[]>(`https://localhost:7223/api/Search/GetUser?name=${name}`)
      .pipe(catchError((err) => {
        return throwError(() => err.message || "server error");
      }));
  }

  
}
