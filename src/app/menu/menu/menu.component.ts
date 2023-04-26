import { Component } from '@angular/core';
import { Menu } from '../menu.class';
import { UserService } from 'src/app/user/user.service';
import { AmateurSearchService } from 'src/app/amateur/amateur-search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menus: Menu[] = [
    new Menu("Users", "/user/list"),
    new Menu("Order", "/order/list"),
    new Menu("Login", "/employee/login")
  ]
  searchCallsign: string = "";
  constructor(
    private usrsvc: UserService,
    private fccsvc: AmateurSearchService,
    private router: Router
  ){}
  logout(): void {
    this.usrsvc.logout();
  }
  search(): void {
    this.fccsvc.callsignSearch = this.searchCallsign;
    this.router.navigateByUrl(`/amateur/search/${this.searchCallsign}`);

  }
}
