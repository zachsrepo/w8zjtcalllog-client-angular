import { Component } from '@angular/core';
import { AmateurSearchService } from '../amateur-search.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Amateuren } from '../amateuren.class';
import { HamlogService } from 'src/app/hamlog/hamlog.service';
import { LoggerService } from 'src/app/user/logger.service';
import { Hamlog } from 'src/app/hamlog/hamlog.class';

@Component({
  selector: 'app-amateur-search',
  templateUrl: './amateur-search.component.html',
  styleUrls: ['./amateur-search.component.css']
})
export class AmateurSearchComponent {
  hamEn!: Amateuren;
  hamlogs: Hamlog[] = [];
  pageTitle = "Amateur Search";
  constructor(
    private fccsvc: AmateurSearchService,
    private router: ActivatedRoute,
    private hamsvc: HamlogService,
    private sys: LoggerService,
    private routing: Router
  ){}
  refresh(): void {
    let search = this.router.snapshot.params["callsign"];
    let userId = this.sys.userId;
    this.hamsvc.getByCallUser(search, userId).subscribe({
      next: (res) => {
        this.hamlogs = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
    this.fccsvc.getCallsign(search).subscribe({
      next: (res) => {
        this.hamEn = res;
        console.debug(res);
        
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  
  ngOnInit(): void {
      this.router.params.subscribe(({ callsign }) => this.refresh());
    }
  }

