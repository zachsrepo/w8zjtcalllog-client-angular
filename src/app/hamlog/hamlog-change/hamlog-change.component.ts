import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HamlogService } from '../hamlog.service';
import { LoggerService } from 'src/app/user/logger.service';
import { Hamlog } from '../hamlog.class';

@Component({
  selector: 'app-hamlog-change',
  templateUrl: './hamlog-change.component.html',
  styleUrls: ['./hamlog-change.component.css']
})
export class HamlogChangeComponent {
  pageTitle = "Modify Contact Log"

  hamlog!: Hamlog;


  constructor(
    private route: ActivatedRoute,
    private hamsvc: HamlogService,
    private router: Router,
    private sys: LoggerService
  ){}
  save(): void {
    this.hamsvc.change(this.hamlog).subscribe({
      next: (res) => {
        console.debug("Log Updated!");
        this.router.navigateByUrl(`/logging/newlog/${this.hamlog.userId}`)
      },
      error: (err) => {
        console.error(err);
      }
    })
  }



  ngOnInit(): void {
    let id = this.route.snapshot.params["id"];
    this.hamsvc.get(id).subscribe({
      next: (res) => {
        this.hamlog = res;
        if(this.sys.userId != this.hamlog.userId){
          this.router.navigateByUrl(`/logging/newlog/${this.sys.userId}`)
        }
      },
      error: (err) => {
        console.error(err);
      }
    })

  }

}
