import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './user/login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth-guard';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserChangeComponent } from './user/user-change/user-change.component';
import { AmateurSearchComponent } from './amateur/amateur-search/amateur-search.component';
import { HamlogListcreateComponent } from './hamlog/hamlog-listcreate/hamlog-listcreate.component';
import { HamlogDetailComponent } from './hamlog/hamlog-detail/hamlog-detail.component';
import { HamlogChangeComponent } from './hamlog/hamlog-change/hamlog-change.component';
import { SettingsListComponent } from './settings/settings-list/settings-list.component';
import { RadioComponent } from './radio/radio/radio.component';
import { DxconfigComponent } from './dxspots/dxconfig/dxconfig.component';
import { DxdetailComponent } from './dxspots/dxdetail/dxdetail.component';


const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login", component:LoginPageComponent},
  {path:"home", component:HomeComponent, canActivate: [authGuard]},
  {path:"radio", component:RadioComponent, canActivate: [authGuard]},
  {path:"user/list", component:UserListComponent, canActivate: [authGuard]},
  {path:"user/detail/:id", component:UserDetailComponent, canActivate: [authGuard]},
  {path:"user/change/:id", component:UserChangeComponent, canActivate: [authGuard]},
  {path:"user/create", component:UserCreateComponent, canActivate: [authGuard]},
  {path:"logging/newlog/:userId", component:HamlogListcreateComponent, canActivate: [authGuard]},
  {path:"amateur/search/:callsign", component:AmateurSearchComponent, canActivate: [authGuard]},
  {path:"hamlog/details/:id", component:HamlogDetailComponent, canActivate: [authGuard]},
  {path:"hamlog/update/:id", component:HamlogChangeComponent, canActivate: [authGuard]},
  {path:"settings/list/:id", component:SettingsListComponent, canActivate: [authGuard]},
  {path:"spots/config/:id", component:DxconfigComponent, canActivate: [authGuard]},
  {path:"spots/detail/:id", component:DxdetailComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
