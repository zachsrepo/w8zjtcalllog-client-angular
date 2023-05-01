import { Component } from '@angular/core';
import { User } from '../user.class';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { encrypt } from 'node_modules/dsi-encrypt-password/index.js';



@Component({
  selector: 'app-user-change',
  templateUrl: './user-change.component.html',
  styleUrls: ['./user-change.component.css']
})
export class UserChangeComponent {
  user: User = new User();
  pageTitle = "Modify User";
  admin!: string;
  password: string = "";

  constructor(
    private usrsvc: UserService,
    private router: Router,
    private route: ActivatedRoute
  ){}
  save():void {
    this.user.callsign = this.user.callsign.toUpperCase();
    // put encrypt here 
    if(this.password != this.user.password){
      this.user.password = encrypt(this.password);
    }
    (this.admin === "true") ? this.user.isAdmin = true : this.user.isAdmin = false;
    this.usrsvc.change(this.user).subscribe({
      next: (res) => {
        console.debug("User Updated!");
        this.router.navigateByUrl("/user/list");
      },
      error: (err) => {
        console.error(err);
      }
    })
    
  }
  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];

    this.usrsvc.get(id).subscribe({
      next: (res) => {
        this.user = res;
        (this.user.isAdmin) ? this.admin = "true" : this.admin = "false";
        this.password = this.user.password;
        
        
        
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
