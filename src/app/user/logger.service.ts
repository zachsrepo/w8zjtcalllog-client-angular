
import { Injectable } from '@angular/core';
import { User } from './user.class';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  public isLoggedin = true; // change for debug use to stay logged in.
  user!: User ;
  userId: number = 1;       // change this to 0 for prod user.
  constructor() {}
}