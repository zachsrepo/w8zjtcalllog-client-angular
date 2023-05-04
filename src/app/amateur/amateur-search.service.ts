import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Amateuren } from './amateuren.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmateurSearchService {
  
  callsignSearch: string = "";
  // baseurl: string = "http://localhost:5000/api/ens"
   baseurl: string = "https://api.w8zjt.net:7443/api/ens";
  constructor(
    private http: HttpClient
  ) { }
  getCallsign(callsign: string): Observable<Amateuren> {
    return this.http.get(`${this.baseurl}/callsign/${callsign}`) as Observable<Amateuren>;
  }
}
