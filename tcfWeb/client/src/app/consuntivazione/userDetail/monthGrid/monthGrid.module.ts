import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
//import { AppRoutingModule }     from '../../app-routing.module';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { MonthGridComponent} from './monthGrid.component';
import {DataTableModule, PanelModule, SharedModule, DialogModule} from 'primeng/primeng';
import { ConsuntivazioneService } from '../../../service/consuntivazione.service';




@NgModule({
  declarations: [
    MonthGridComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    FormsModule,
    DataTableModule, 
    PanelModule,
    SharedModule,
    DialogModule
  ],
  providers: [
    ConsuntivazioneService
    ],
  exports: [MonthGridComponent],
  bootstrap: [MonthGridComponent]
})
export class MonthGridModule { }
