import { Component } from '@angular/core';
import { User } from '../user.class';
import { UserService } from '../user.service';
import {  Router } from '@angular/router';
import { encrypt } from 'node_modules/dsi-encrypt-password/index.js';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  user: User = new User();
  pageTitle = "New User";

  constructor(
    private usrsvc: UserService,
    private router: Router
    
  ){}

  save():void {
    this.user.password = encrypt(this.user.password);
    console.log(this.user);
    this.user.callsign = this.user.callsign.toUpperCase();
    this.user.isAdmin = (this.user.isAdmin)? true : false;
    this.usrsvc.create(this.user).subscribe({
      next: (res) => {
        console.debug("User Created!");
        this.router.navigateByUrl("/user/list");
      },
      error: (err) => {
        console.error(err);
      }
    })
    
  }

}
