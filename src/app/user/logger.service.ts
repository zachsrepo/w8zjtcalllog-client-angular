
import { Injectable } from '@angular/core';
import { User } from './user.class';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  public isLoggedin = true; // change for debug use to stay logged in.
  user?: User ;
  constructor() {}
}