import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
//import { AppRoutingModule }     from '../../app-routing.module';
import { FormsModule }   from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ConsuntivazioneComponent } from './consuntivazione.component';
import { UserListComponent } from './userList/userList.component';
import { UserSelectedComponent } from './userSelected/userSelected.component';
import { SearchUser } from './userList/userList.component';
//import { CustomHttpProvider } from '../../../helpers/custom-http';



@NgModule({
  declarations: [
    ConsuntivazioneComponent,
    UserListComponent,
    UserSelectedComponent,
    SearchUser
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
  exports: [ConsuntivazioneComponent],
  bootstrap: [ConsuntivazioneComponent]
})
export class ConsuntivazioneModule { }
