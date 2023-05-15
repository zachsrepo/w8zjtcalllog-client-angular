import { Component, ViewChild } from '@angular/core';
import { Hamlog } from '../hamlog.class';
import { UserService } from 'src/app/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/user/user.class';
import { LoggerService } from 'src/app/user/logger.service';
import { DatePipe, formatDate } from '@angular/common';
import { AmateurSearchService } from 'src/app/amateur/amateur-search.service';
import { Amateuren } from 'src/app/amateur/amateuren.class';
import { HamlogService } from '../hamlog.service';
import { FreqencyPipe } from 'src/app/pipes/freqency.pipe';
import { CalcBandPipe } from 'src/app/pipes/calc-band.pipe';
import { DxspotComponent } from 'src/app/dxspots/dxspot/dxspot.component';




@Component({
  selector: 'app-hamlog-listcreate',
  templateUrl: './hamlog-listcreate.component.html',
  styleUrls: ['./hamlog-listcreate.component.css']
})
export class HamlogListcreateComponent {
 

  pageTitle = "HamLog";
  user!: User;

  hamlogs: Hamlog[] = [];
  searchHamLogs: Hamlog[] = [];
  searchResCount: number = 0;
  searchResMessage: string = "";
  newlog: Hamlog = new Hamlog();
  logsToShow: string = "50";
  hamEn!: Amateuren;
  isaham: string = "";
  sortColumn: string = "id";
  sortAsc: boolean = false;
  searching: boolean = false;
  logpost: boolean = false;
  showNetColumn: boolean = false;
  showDxSpot: boolean = false;
  pipe = new DatePipe('en-US');
  freqpipe = new FreqencyPipe;
  bandpipe = new CalcBandPipe;
  enteredfreq: string = "";
  warnMessage: string = "";
  warnMessageDesc: string = "";
  successMessage: string = "";
  regExp = /[a-zA-Z]/g;
  tableHeight: string = "";


  constructor(
    private urssvc: UserService,
    private route: ActivatedRoute,
    private amasvc: AmateurSearchService,
    private hamsvc: HamlogService,
    private sys: LoggerService,
    private router: Router
    
  ){}
  ngAfterViewInit() {
   
  }


  selectColumn(col: string):void{
    if(col === this.sortColumn){
      this.sortAsc = !this.sortAsc;
      return;
    }
    this.sortAsc = true;
    this.sortColumn = col;
  } 
  save(): void {
    console.debug(this.newlog);
    if(this.regExp.test(this.enteredfreq)){
      console.warn("The entered frequency cannot contain any letters")
      this.warnMessage = "The entered frequency is INVALID : ";
      this.warnMessageDesc = "Numbers ONLY. can NOT contain letters";
      return;
    }
    if(!this.enteredfreq.includes(".")){
      console.warn("The entered frequency must contain a decimal point for mhz");
      this.warnMessage = "The entered frequency is INVALID : ";
      this.warnMessageDesc = "Must contain a decimal point after MHZ";
      return;
    }
  
    this.newlog.frequency = this.freqpipe.transform(this.enteredfreq);
    let offDate = Date.now();
    this.newlog.timeOff = this.pipe.transform(offDate, 'yyyy-MM-ddThh:mm:ss.sss');
    this.user.lastWorkedMode = this.newlog.mode;
    this.user.lastWorkedPower = this.newlog.power;
    this.user.recordCount += 1;
    this.hamsvc.create(this.newlog).subscribe({
      next: (res) => {
        this.successMessage = "Entry Successful";
        this.logpost = true;
        this.newlog.fullName = "";
        this.newlog.firstName = "";
        this.newlog.lastName = "";
        this.newlog.address = "";
        this.newlog.city = "";
        this.newlog.state = "";
        this.newlog.postalCode = "";
        this.newlog.fccId = "";
        this.newlog.callsign = "";
        this.newlog.qth = "";
        this.newlog.comments = "";
      
        console.debug(res, "Log Created!");
       // this.refresh();
        this.urssvc.change(this.user).subscribe({
          next: (res) => {
            console.debug("User Updated");
            this.refresh();
          },
          error: (err) => {console.error(err);}
        });
        
        this.searching = true;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  clear(): void {
    this.newlog.callsign = "";
    this.isaham = "";
    this.warnMessage = "";
    this.successMessage = "";
    this.logpost = false;
    this.searching = true;
  }
  freqChange(): void {
    this.warnMessage = "";
    this.warnMessageDesc = "";
  }
  freqBlur(): void {
    if(this.enteredfreq === "" || !this.enteredfreq.includes(".")){
      console.warn("cannot automatically calculate band");
      return;
    } else {
      this.newlog.band = this.bandpipe.transform(this.enteredfreq);
    }
    if(this.newlog.band === 0){
      this.warnMessage = "Caution: Out of band! ShortWave!";
    }
    console.log(this.newlog.band);

  }
  searchHamlog(): void {
    this.hamsvc.getByCallUser(this.newlog.callsign, this.user.id).subscribe({
      next: (res) => {
        console.log(res);
        this.searchHamLogs = res;
        this.searchResCount = this.searchHamLogs.length;
        if(this.searchResCount === 0){
          this.searchResMessage = `You haven't worked ${this.newlog.callsign}`;
        }
        if(this.searchResCount === 1){
          this.searchResMessage = `You have worked ${this.newlog.callsign} ${this.searchResCount} Time`;
        }
        if(this.searchResCount > 1){
          this.searchResMessage = `You have worked ${this.newlog.callsign} ${this.searchResCount} Times`;
        }
        this.searching = false;
        // runs when the call only exists in the user database
        if(this.searchHamLogs.length >= 1 && ((this.hamEn?.callsign != this.searchHamLogs[0].callsign) || this.hamEn === undefined)){
          this.newlog.firstName = this.searchHamLogs[0].firstName;
          this.newlog.fullName = this.searchHamLogs[0].fullName;
          this.newlog.lastName = this.searchHamLogs[0].lastName;
          this.newlog.address = this.searchHamLogs[0].address;
          this.newlog.city = this.searchHamLogs[0].city;
          this.newlog.state = this.searchHamLogs[0].state;
          this.newlog.postalCode = this.searchHamLogs[0].postalCode;
          console.debug("Ham did not exist in fcc database but did exist in your logs");
        }
        // runs when the call does not exist in any database.
        if(this.searchHamLogs.length < 1 && this.isaham === "notfound"){
          console.warn("NOT FOUND");
          this.warnMessage = "NOT FOUND!";
          this.newlog.fullName = "";
          this.newlog.fccId = "";
          this.newlog.firstName = "";
          this.newlog.lastName = "";
          this.newlog.address = "";
          this.newlog.city = "";
          this.newlog.state = "";
          this.newlog.postalCode = "";
          this.newlog.comments = "";
        }        
      },
      error: (err) => {
        console.error(err);
      }
    })
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
        this.newlog.lastName = this.hamEn.last;
        this.newlog.userId = +this.user.id;
        this.newlog.fccId = this.hamEn.fccid.toString();
        let currentDate = Date.now();
        this.newlog.dateAndTime = this.pipe.transform(currentDate, 'yyyy-MM-ddThh:mm:ss.sss');
        this.searchHamlog();
      },
      error: (err) => {
        let currentDate = Date.now();
        this.newlog.callsign = this.newlog.callsign.toUpperCase();
        this.newlog.userId = +this.user.id;
        this.newlog.dateAndTime = this.pipe.transform(currentDate, 'yyyy-MM-ddThh:mm:ss.sss');
        this.isaham = "notfound";
        this.searchHamlog();
        console.log(err);
      }
    })
  }
  refresh(): void {

    this.searching = true;
    let userId = this.route.snapshot.params["userId"];
    this.urssvc.get(userId).subscribe({
      next: (res) => {
        this.user = res;
        // this.hamlogs = this.user.hamLogs;
        this.newlog.mode = this.user.lastWorkedMode;
        this.newlog.power = +this.user.lastWorkedPower;   
        this.showDxSpot = this.user.showDxSpot;
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.hamsvc.list(Number(this.logsToShow), userId).subscribe({
      next: (res) => {
        this.hamlogs = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnInit(): void {
    this.tableHeight = "tableFixHeadShort";
    if(this.route.snapshot.params["userId"] != this.sys.userId){
      this.router.navigateByUrl(`/login`);
    }
    this.refresh();
  }

}
