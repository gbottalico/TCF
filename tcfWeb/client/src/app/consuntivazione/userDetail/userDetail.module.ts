import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
//import { AppRoutingModule }     from '../../app-routing.module';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { UserDetailComponent } from './userDetail.component';
import { UserInfoComponent } from './userInfo/userInfo.component';
import { MonthGridComponent } from './monthGrid/monthGrid.component';
import { MonthListComponent } from './monthList/monthList.component';

//import { CustomHttpProvider } from '../../../helpers/custom-http';



@NgModule({
  declarations: [
    UserDetailComponent,
    UserInfoComponent,
    MonthGridComponent,
    MonthListComponent
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
  exports: [UserDetailComponent],
  bootstrap: [UserDetailComponent]
})
export class UserDetailModule { }
