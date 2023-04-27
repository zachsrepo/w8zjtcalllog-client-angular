import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hamlog } from './hamlog.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HamlogService {
  baseurl: string = "http://localhost:5000/api/hamlogs";
  constructor(
    private http: HttpClient
  ) { }

  create(hamlog: Hamlog): Observable<Hamlog> {
    return this.http.post(`${this.baseurl}`, hamlog) as Observable<Hamlog>;
  }
}
