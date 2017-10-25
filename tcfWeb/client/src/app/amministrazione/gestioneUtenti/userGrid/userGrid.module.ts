import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
//import { AppRoutingModule }     from '../../app-routing.module';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { UserGridComponent} from './userGrid.component';
import { ConfirmDialogModule, AccordionModule, CalendarModule, DataTableModule, SharedModule, DialogModule, InputTextModule, DropdownModule, MultiSelectModule} from 'primeng/primeng';




@NgModule({
  declarations: [
    UserGridComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    FormsModule,
    DataTableModule, 
    SharedModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    CalendarModule,
    AccordionModule,
    ConfirmDialogModule
  ],
  providers: [],
  exports: [UserGridComponent],
  bootstrap: [UserGridComponent]
})
export class UserGridModule { }
