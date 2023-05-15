import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/user/logger.service';
import { User } from 'src/app/user/user.class';
import { UserService } from 'src/app/user/user.service';


@Component({
  selector: 'app-dxconfig',
  templateUrl: './dxconfig.component.html',
  styleUrls: ['./dxconfig.component.css'],


})
export class DxconfigComponent {

  user!: User;
  tableHeight: string = "";


  constructor(
    private sys: LoggerService,
    private usrsvc: UserService,
    private router: ActivatedRoute
  ){}

  save():void {
    this.usrsvc.change(this.user).subscribe({
      next: (res) => {
        console.debug("User Updated");
        this.ngOnInit();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  refresh(): void {
    let userId = this.router.snapshot.params["id"];
    this.usrsvc.get(userId).subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
    
  }


  ngOnInit():void {
    this.tableHeight = "tableFixHeadTall";
    this.refresh();
  }

}
