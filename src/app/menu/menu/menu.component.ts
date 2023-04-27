import { Component } from '@angular/core';
import { Menu } from '../menu.class';
import { UserService } from 'src/app/user/user.service';
import { AmateurSearchService } from 'src/app/amateur/amateur-search.service';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/user/logger.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  searchCallsign: string = "";
  menus: Menu[] = []
  constructor(
    private usrsvc: UserService,
    private fccsvc: AmateurSearchService,
    private router: Router,
    private sys: LoggerService
  ){}
  logout(): void {
    this.usrsvc.logout();
  }
  search(): void {
    this.fccsvc.callsignSearch = this.searchCallsign;
    this.router.navigateByUrl(`/amateur/search/${this.searchCallsign}`);
  }
  ngOnInit(): void {

    this.menus = [
      new Menu("Users", "/user/list"),
      new Menu("Logging", `/logging/newlog/${this.sys.userId}`),
      new Menu("Login", "/login")
    ];
  }
}
