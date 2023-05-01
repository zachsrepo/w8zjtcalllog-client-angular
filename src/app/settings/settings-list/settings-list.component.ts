import { Component } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user.class';
import { LoggerService } from 'src/app/user/logger.service';
import { Router } from '@angular/router';
import { Style } from '../style.class';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.css']
})
export class SettingsListComponent {


  user!: User;
  jsonStyleString: string = "";
  styleColor: string = "";
  userId: number = 0;
  userDefinedStyle: Style = new Style();
  userBGcolor: string = "";
  userFontSize: string = "";
  

  constructor(
    private usrsvc: UserService,
    private sys: LoggerService,
    private router: Router
    
    
  ){}

  save(): void {
    this.userDefinedStyle.styleClass = this.userBGcolor + " " + this.userFontSize;
    this.jsonStyleString = JSON.stringify(this.userDefinedStyle);
    this.user.style = this.jsonStyleString;
    this.usrsvc.change(this.user).subscribe({
      next: (res) => {
        console.debug("User Settings Updated");
        // this.router.navigateByUrl(`/logging/newlog/${this.userId}`);
        
        
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


  ngOnInit(): void {
    this.userId = this.sys.userId;
    this.usrsvc.get(this.userId).subscribe({
      next: (res) => {
        this.user = res;
        this.userDefinedStyle = JSON.parse(this.user.style);

        
      },
      error: (err) => {
        console.error(err);
      }
    })






  }

}
