import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
//import { AppRoutingModule }     from '../../app-routing.module';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { MonthGridComponent} from './monthGrid.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ConsuntivazioneService } from '../../../service/consuntivazione.service';


//import { CustomHttpProvider } from '../../../helpers/custom-http';



@NgModule({
  declarations: [
    MonthGridComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    //AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    Ng2SmartTableModule
  ],
  providers: [
    ConsuntivazioneService
    ],
  exports: [MonthGridComponent],
  bootstrap: [MonthGridComponent]
})
export class MonthGridModule { }
