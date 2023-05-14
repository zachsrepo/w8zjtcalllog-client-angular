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
  username: string = "";
  userId: number = 0;
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
  selectedItem: any;
  updateCart(id: number) {
    this.selectedItem = id;
  }
  ngOnInit(): void {
    this.isAdmin = this.sys.isAdmin;
    this.username = this.sys.username;
    this.userId = this.sys.userId;

    this.menus = [
      
      new Menu("Logging", `/logging/newlog/${this.sys.userId}`),
      new Menu("Settings", `/settings/list/${this.sys.userId}`),
      new Menu("Radio", "/radio"),
      new Menu("About", "/about"),
      new Menu("Login", "/login"),
    ];
    if(this.isAdmin){
      this.menus.unshift(new Menu("Users", "/user/list"));
    }
    
  }
}
