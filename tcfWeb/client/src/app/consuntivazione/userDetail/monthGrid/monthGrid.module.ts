import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
//import { AppRoutingModule }     from '../../app-routing.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { MonthGridComponent} from './monthGrid.component';
import {DataTableModule, PanelModule, SharedModule, DialogModule, DropdownModule} from 'primeng/primeng';
import { ConsuntivazioneService } from '../../../service/consuntivazione.service';
import { ClienteService } from '../../../service/cliente.service';
import { SystemService } from '../../../service/system.service';
import { AttivitaService } from '../../../service/attivita.service';
import { MeseConsuntivoService } from '../../../service/meseConsuntivo.service';




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
    DropdownModule,
    SharedModule,
    DialogModule,
    ReactiveFormsModule
  ],
  providers: [
    ConsuntivazioneService,
    MeseConsuntivoService,
    AttivitaService,
    ClienteService,
    SystemService
    ],
  exports: [MonthGridComponent],
  bootstrap: [MonthGridComponent]
})
export class MonthGridModule { }
