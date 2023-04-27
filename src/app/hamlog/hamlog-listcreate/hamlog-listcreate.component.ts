import { Component } from '@angular/core';
import { Hamlog } from '../hamlog.class';
import { UserService } from 'src/app/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user/user.class';
import { LoggerService } from 'src/app/user/logger.service';
import { DatePipe } from '@angular/common';
import { AmateurSearchService } from 'src/app/amateur/amateur-search.service';
import { Amateuren } from 'src/app/amateur/amateuren.class';
import { HamlogService } from '../hamlog.service';

@Component({
  selector: 'app-hamlog-listcreate',
  templateUrl: './hamlog-listcreate.component.html',
  styleUrls: ['./hamlog-listcreate.component.css']
})
export class HamlogListcreateComponent {
  pageTitle = "HamLog";
  user!: User;
  hamlogs: Hamlog[] = [];
  newlog: Hamlog = new Hamlog();
  hamEn!: Amateuren;

  constructor(
    private urssvc: UserService,
    private route: ActivatedRoute,
    private amasvc: AmateurSearchService,
    private hamsvc: HamlogService
    
  ){}
  save(): void {
    this.hamsvc.create(this.newlog).subscribe({
      next: (res) => {
        console.debug(res, "Log Created!");
        this.refresh();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  clear(): void {
    this.newlog.callsign = "";
  }
  search(): void {
    this.amasvc.getCallsign(this.newlog.callsign).subscribe({
      next: (res) => {
        this.hamEn = res;
        this.newlog.callsign = this.hamEn.callsign.toUpperCase();
        this.newlog.address = this.hamEn.address1;
        this.newlog.city = this.hamEn.city;
        this.newlog.state = this.hamEn.state;
        this.newlog.postalCode = this.hamEn.zip;
        this.newlog.fullName = this.hamEn.fullName;
        this.newlog.firstName = this.hamEn.first;
        this.newlog.userId = +this.user.id;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  refresh(): void {
    let userId = this.route.snapshot.params["userId"];
    this.urssvc.get(userId).subscribe({
      next: (res) => {
        this.user = res;
        this.hamlogs = this.user.hamLogs;
        console.debug(this.user);
        console.debug(this.hamlogs);
        this.newlog.mode = this.user.defaultMode;
        this.newlog.power = +this.user.defaultPower;
        // this.newlog.user = this.user;
        // this.newlog.dateAndTime = Date();
        // this.newlog.timeOff = Date();
        
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void {
    this.refresh();
  }

}
