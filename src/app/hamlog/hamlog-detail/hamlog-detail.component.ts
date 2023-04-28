import { Component } from '@angular/core';
import { HamlogService } from '../hamlog.service';
import { Hamlog } from '../hamlog.class';
import { UserService } from 'src/app/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from 'src/app/user/logger.service';

@Component({
  selector: 'app-hamlog-detail',
  templateUrl: './hamlog-detail.component.html',
  styleUrls: ['./hamlog-detail.component.css']
})
export class HamlogDetailComponent {
  pageTitle = "Log Details";
  hamlog!: Hamlog;
  areYouSure: boolean = false;

  constructor(
    private hamsvc: HamlogService,
    private route: ActivatedRoute,
    private router: Router,
    private sys: LoggerService
  ) {}

  delete(): void {
    this.areYouSure = !this.areYouSure;
  }
  deleteVerified(): void {
    this.hamsvc.remove(this.hamlog.id).subscribe({
      next: (res) => {
        console.debug("Deleted!");
        this.router.navigateByUrl(`/logging/newlog/${this.sys.userId}`);
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
