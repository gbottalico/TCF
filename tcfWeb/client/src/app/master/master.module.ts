import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

import { AppRoutingModule }     from '../app-routing.module';

import { CustomHttpProvider } from '../helpers/custom-http';

import { AuthGuard } from '../guard/auth.guard';
import { HeaderModule } from './header/header.module';
import { MasterComponent } from './master.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { ToggleComponent } from './toggle/toggle.component';
import { LeftsideBarComponent } from './leftsidebar/leftsidebar.component';
import { RightsideBarComponent } from './rightsidebar/rightsidebar.component';

import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { UsersComponent } from '../user/users.component';
import { ConsuntivazioneModule } from '../consuntivazione/consuntivazione.module';

import { AuthenticationService } from '../login/authentication.service';

@NgModule({
  declarations: [
    MasterComponent,
    HomeComponent,
    LoginComponent,
    UsersComponent,
    SitemapComponent,
    ToggleComponent,
    LeftsideBarComponent,
    RightsideBarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    HeaderModule,
    ConsuntivazioneModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthGuard,
    CustomHttpProvider,
    AuthenticationService
   ],
  bootstrap: [MasterComponent],
  exports: [MasterComponent],
})
export class MasterModule { 
}
