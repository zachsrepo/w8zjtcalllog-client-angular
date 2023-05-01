import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.class';
import { Observable, of, tap } from 'rxjs';
import { LoggerService } from './logger.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // baseurl: string = 'http://localhost:5000/api/users';
  baseurl: string = 'https://w8zjt.net:7443/api/users';
  constructor(
    private http: HttpClient,
    private readonly loggerService: LoggerService,
    private router: Router
  ) { }

  list(): Observable<User[]>{
    return this.http.get(`${this.baseurl}`) as Observable<User[]>;
  }
  get(id:number): Observable<User>{
    return this.http.get(`${this.baseurl}/${id}`) as Observable<User>;
  }
  login(username: string, password: string): Observable<User>{
    return this.http.get(`${this.baseurl}/${username}/${password}`) as Observable<User>;
  }
  create(user: User): Observable<User>{
    return this.http.post(`${this.baseurl}`, user) as Observable<User>;
  }
  change(user: User): Observable<any> {
    return this.http.put(`${this.baseurl}/${user.id}`, user) as Observable<any>;
  }
  remove(id: number): Observable<any>{
    return this.http.delete(`${this.baseurl}/${id}`) as Observable<any>;
  }
  isLoggedIn() {
    return of(this.loggerService.isLoggedin).pipe(tap((v) => console.log(v)));
  }
  logout():void {
    this.loggerService.isLoggedin = false;
    this.router.navigate(["login"])
  }

}
