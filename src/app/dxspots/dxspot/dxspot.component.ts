import { Component } from '@angular/core';
import { SpotService } from '../spot.service';
import { Spot } from '../dxspot.class';
import { Subscription, map, timer } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { LoggerService } from 'src/app/user/logger.service';
import { User } from 'src/app/user/user.class';

@Component({
  selector: 'app-dxspot',
  templateUrl: './dxspot.component.html',
  styleUrls: ['./dxspot.component.css']
})
export class DxspotComponent {

  spots: Spot[] = [];
  timerSubscription!: Subscription;
  paused: boolean = false;
  pageTitle = "DX Spots"
  spotsToShow: string = "10";
  user!: User;
  refreshRate: number = 1000;

  constructor(
    private spot:SpotService,
    private usrsvc: UserService,
    private sys: LoggerService
  ){}
  pause(): void {
    this.timerSubscription.unsubscribe(); 
    this.paused = true;
    
  }
  unPause():void {
    this.ngOnInit();
    this.paused = false;
  }

  refresh(): void {
    this.spot.listSpots(Number(this.spotsToShow)).subscribe({
      next: (res) => {
        this.spots = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnInit(): void {
    let userId = this.sys.userId;
    this.usrsvc.get(userId).subscribe({
      next: (res) => {
        this.user = res;
        this.refreshRate = this.user.spotsRefreshRate;
      },
      error: (err) => {
        console.error(err);
      }
    })
          // timer(0, 10000) call the function immediately and every 10 seconds 
          this.timerSubscription = timer(0, this.refreshRate).pipe( 
            map(() => { 
              this.refresh(); // load data contains the http request 
            }) 
          ).subscribe(); 
          
          
          
  }
  ngOnDestroy(): void { 
    this.timerSubscription.unsubscribe(); 
  } 

}
