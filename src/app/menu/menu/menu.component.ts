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
  isAdmin: boolean = true;
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
    this.isAdmin = this.sys.isAdmin;
    this.menus = [
      
      new Menu("Logging", `/logging/newlog/${this.sys.userId}`),
      new Menu("Settings", "/user/settings"),
      new Menu("Login", "/login"),
    ];
    if(this.isAdmin){
      this.menus.unshift(new Menu("Users", "/user/list"));
    }
    
  }
}
