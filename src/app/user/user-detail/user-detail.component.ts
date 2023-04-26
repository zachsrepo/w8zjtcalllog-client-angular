import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.class';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  user!: User; // null
  pageTitle = "User Details"
  areYouSure: boolean = false;
  constructor(
    private usrsvc: UserService,
    private route: ActivatedRoute,
    private router: Router
  ){}
  delete(): void {
    this.areYouSure = !this.areYouSure;
  }
  deleteVerified(): void {
    this.usrsvc.remove(this.user.id).subscribe({
      next: (res) => {
        console.debug("Deleted!");
        this.router.navigateByUrl("/user/list");
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  ngOnInit(): void{
    let id = Number(this.route.snapshot.params["id"]); // adding a plus + sign before this will do the same thing.
    this.usrsvc.get(id).subscribe({
      next: (res) => {
          console.debug("Employee received");
          this.user = res;
      },
      error: (err) => {
          console.error(err);
      }
    })
  }
}
