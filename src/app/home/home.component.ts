import { Component } from '@angular/core';
import { User } from '../user/user.class';
import { LoggerService } from '../user/logger.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userId: any = 0;
  constructor(
    private loggersvc: LoggerService,
    private router: Router
    
  ){}
  ngOnInit(): void {
    this.userId = this.loggersvc.user?.id;
    // console.log(this.loggersvc.user)
  }
  logout():void {
    this.loggersvc.isLoggedin = false;
    this.router.navigate(["login"])
  }

}
