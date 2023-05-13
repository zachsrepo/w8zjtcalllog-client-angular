import { Component } from '@angular/core';
import { SpotService } from '../spot.service';
import { Spot } from '../dxspot.class';
import { Subscription, map, timer } from 'rxjs';

@Component({
  selector: 'app-dxspot',
  templateUrl: './dxspot.component.html',
  styleUrls: ['./dxspot.component.css']
})
export class DxspotComponent {

  spots: Spot[] = [];
  timerSubscription!: Subscription;
  paused: boolean = false;

  constructor(
    private spot:SpotService
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
    this.spot.listSpots(50).subscribe({
      next: (res) => {
        this.spots = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnInit(): void {
          // timer(0, 10000) call the function immediately and every 10 seconds 
          this.timerSubscription = timer(0, 1000).pipe( 
            map(() => { 
              this.refresh(); // load data contains the http request 
            }) 
          ).subscribe(); 
  }
  ngOnDestroy(): void { 
    this.timerSubscription.unsubscribe(); 
  } 

}
