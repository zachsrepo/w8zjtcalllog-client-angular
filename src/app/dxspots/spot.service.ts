import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Spot } from './dxspot.class';

@Injectable({
  providedIn: 'root'
})
export class SpotService {

  baseurl: string = "https://api.w8zjt.net:7443/api/spots"

  constructor(
    private http: HttpClient
  ) { }

  listSpots(quantity: number): Observable<Spot[]> {
    return this.http.get(`${this.baseurl}/list/${quantity}`) as Observable<Spot[]>;
  }
  getSpot(id: number): Observable<Spot> {
    return this.http.get(`${this.baseurl}/${id}`) as Observable<Spot>;
  }
}
