import { Component } from '@angular/core';
import { AmateurSearchService } from '../amateur-search.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Amateuren } from '../amateuren.class';

@Component({
  selector: 'app-amateur-search',
  templateUrl: './amateur-search.component.html',
  styleUrls: ['./amateur-search.component.css']
})
export class AmateurSearchComponent {
  hamEn!: Amateuren;
  pageTitle = "Amateur Search";
  constructor(
    private fccsvc: AmateurSearchService,
    private router: ActivatedRoute,
    private routing: Router
  ){}
  refresh(): void {
    let search = this.router.snapshot.params["callsign"];
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

