import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {
  currentuser: any = new BehaviorSubject(null);

  constructor(private myhttp: HttpClient, private _Router: Router) { }

  // LogOut()
  // {
  // localStorage.removeItem('userToken');
  // this.currentuser.next(null);
  // this._Router.navigate(['/Login']);
  // }



  register(kero: any): Observable<any> {
    return this.myhttp.post("https://localhost:7223/api/Account/register", kero);
  }

  login(pop: any): Observable<any> {
    return this.myhttp.post("https://localhost:7223/api/Account/login", pop);
  }
  id: any = `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier`;
  getToken() {
    let token: any = localStorage.getItem("userInfo");
    this.currentuser = jwtDecode(token);
  }
  gettokenID(): string {
    let token: any = localStorage.getItem("userInfo");
    this.currentuser = jwtDecode(token);
    var nameIdentifier = this.currentuser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    console.log(nameIdentifier);
    return nameIdentifier;

  }
  getName(): string {
    let token: any = localStorage.getItem("userInfo");
    this.currentuser = jwtDecode(token);
    var nameIdentifier = this.currentuser['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    console.log(nameIdentifier);
    return nameIdentifier;

  }
  LogOut()
  {
  localStorage.removeItem('userToken');
  this.currentuser=null;
  this._Router.navigate(['/login']);
  }
}
