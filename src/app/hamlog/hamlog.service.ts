import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hamlog } from './hamlog.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HamlogService {
  // baseurl: string = "http://localhost:5000/api/hamlogs";
   baseurl: string = "https://w8zjt.net:7443/api/hamlogs";

  constructor(
    private http: HttpClient
  ) { }

  getByCallUser(callsign: string, userId: number): Observable<Hamlog[]> {
    return this.http.get(`${this.baseurl}/${callsign}/${userId}`) as Observable<Hamlog[]>;
  }
  list(quantity: number, userId: number): Observable<Hamlog[]> {
    return this.http.get(`${this.baseurl}/list/${userId}/${quantity}`) as Observable<Hamlog[]>;
  }
  get(id: number): Observable<Hamlog> {
    return this.http.get(`${this.baseurl}/${id}`) as Observable<Hamlog>;
  }
  create(hamlog: Hamlog): Observable<Hamlog> {
    return this.http.post(`${this.baseurl}`, hamlog) as Observable<Hamlog>;
  }
  change(hamlog: Hamlog): Observable<any> {
    return this.http.put(`${this.baseurl}/${hamlog.id}`, hamlog) as Observable<any>;
  }
  remove(id: number): Observable<any> {
    return this.http.delete(`${this.baseurl}/${id}`) as Observable<any>;
  }
  
}
