
import { Injectable } from '@angular/core';
import { User } from './user.class';


@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  public isLoggedin = true; // change for debug use to stay logged in.
  user!: User ;
  userId: number = 22;       // change this to 0 for prod user.
  isAdmin: boolean = true;  // change this to false for prod user changes on this page for debug only.
  username: string = "";

  constructor() {}
}