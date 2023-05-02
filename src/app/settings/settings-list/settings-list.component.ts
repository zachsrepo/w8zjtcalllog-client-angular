import { Component } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user.class';
import { LoggerService } from 'src/app/user/logger.service';
import { Router } from '@angular/router';
import { Pref } from 'src/app/user/pref.class';


@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.css']
})
export class SettingsListComponent {


  user!: User;
  pref!: Pref;
  jsonStyleString: string = "";
  styleColor: string = "";
  userId: number = 0;


  

  constructor(
    private usrsvc: UserService,
    private sys: LoggerService,
    private router: Router
    
    
  ){}

  save(): void {

    this.user.style = JSON.stringify(this.pref)

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
  refresh(): void {
    this.userId = this.sys.userId;
    this.usrsvc.get(this.userId).subscribe({
      next: (res) => {
        this.user = res;
        this.pref = JSON.parse(this.user.style);

      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnInit(): void {

    this.refresh();





  }

}
