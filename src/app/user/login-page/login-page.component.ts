import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggerService } from '../logger.service';
import { encrypt } from 'node_modules/dsi-encrypt-password/index.js';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public loginForm!: FormGroup
  private user: User = {} as any;
  message: string = "";
  pageTitle = "W8ZJT CallLog";

 
  constructor(
    private svcusr: UserService,
    private loggersvc: LoggerService,
    private formbuilder: FormBuilder,
    private router: Router
  ){}
  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username: [''],
      password: ['', Validators.required]
    })
  }
  loginuser(){
    this.loginForm.value.password = encrypt(this.loginForm.value.password)
    this.svcusr.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: (res) => {
        this.user = res;
        if(this.user){
          this.loggersvc.isLoggedin = true;
          this.loggersvc.user = this.user;
          this.loggersvc.userId = this.user.id;
          this.loggersvc.username = this.user.userName;
          this.loggersvc.isAdmin = this.user.isAdmin;

          console.log("Login Successful")
          this.message = "Login Successful";
          this.loginForm.reset()
        this.router.navigate([`/logging/newlog/${this.user.id}`])
        }
      },
      error: (err) => {
        if(err.status == 404){
          console.warn("NOT FOUND");
          this.message = "Incorrect Username or Password / Login Failed";
        }
        else{
          console.error(err);

        }
      }
    })
  }
}
