import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/user/logger.service';
import { SpotService } from '../spot.service';
import { Spot } from '../dxspot.class';

@Component({
  selector: 'app-dxdetail',
  templateUrl: './dxdetail.component.html',
  styleUrls: ['./dxdetail.component.css']
})
export class DxdetailComponent {
  pageTitle = "DX Details";
  userId: number = 0;
  spot!: Spot;


  constructor(
    private sys: LoggerService,
    private route: ActivatedRoute,
    private spotter: SpotService
  ){}





  ngOnInit():void{
    this.userId = this.sys.userId;
    let dxId = this.route.snapshot.params["id"];
    this.spotter.getSpot(dxId).subscribe({
      next: (res) => {
        this.spot = res;
      },
      error: (err) => {
        console.error(err);
      }
    })

  }
}
