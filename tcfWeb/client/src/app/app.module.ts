import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

import { AppRoutingModule }     from './app-routing.module';

import { CustomHttpProvider } from './helpers/custom-http';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './user/users.component';
import { LoginComponent } from './login/login.component';

import { AuthenticationService } from './login/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthGuard,
    CustomHttpProvider,
    AuthenticationService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
