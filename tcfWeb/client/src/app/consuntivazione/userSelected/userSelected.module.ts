import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
//import { AppRoutingModule }     from '../../app-routing.module';
import { FormsModule }   from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { UserSelectedComponent } from './userSelected.component';
//import { CustomHttpProvider } from '../../../helpers/custom-http';



@NgModule({
  declarations: [
    UserSelectedComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    //AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [
    //CustomHttpProvider,
    ],
  exports: [UserSelectedComponent],
  bootstrap: [UserSelectedComponent]
})
export class UserSelectedModule { }
