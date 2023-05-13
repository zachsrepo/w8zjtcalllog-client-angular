import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './user/login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu/menu.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserChangeComponent } from './user/user-change/user-change.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { AmateurSearchComponent } from './amateur/amateur-search/amateur-search.component';
import { HamlogListcreateComponent } from './hamlog/hamlog-listcreate/hamlog-listcreate.component';
import { FreqencyPipe } from './pipes/freqency.pipe';
import { SorthamlogPipe } from './pipes/sorthamlog.pipe';
import { HamlogDetailComponent } from './hamlog/hamlog-detail/hamlog-detail.component';
import { CalcBandPipe } from './pipes/calc-band.pipe';
import { HamlogChangeComponent } from './hamlog/hamlog-change/hamlog-change.component';
import { SettingsListComponent } from './settings/settings-list/settings-list.component';
import { AboutComponent } from './core/about/about.component';
import { RadioComponent } from './radio/radio/radio.component';
import { DxspotComponent } from './dxspots/dxspot/dxspot.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomeComponent,
    MenuComponent,
    UserListComponent,
    UserChangeComponent,
    UserCreateComponent,
    UserDetailComponent,
    AmateurSearchComponent,
    HamlogListcreateComponent,
    FreqencyPipe,
    SorthamlogPipe,
    HamlogDetailComponent,
    CalcBandPipe,
    HamlogChangeComponent,
    SettingsListComponent,
    AboutComponent,
    RadioComponent,
    DxspotComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
