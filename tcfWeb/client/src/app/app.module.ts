import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

import { CustomHttpProvider } from './helpers/custom-http';
import { AppComponent } from './app.component';
import { MasterModule } from './master/master.module';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    MasterModule,
    NgbModule.forRoot()
  ],
  providers: [
    CustomHttpProvider
   ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
