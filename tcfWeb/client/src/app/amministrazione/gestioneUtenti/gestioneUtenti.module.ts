import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
//import { AppRoutingModule }     from '../../app-routing.module';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { GestioneUtentiComponent } from './gestioneUtenti.component';
import { UserFormComponent} from './userForm/userForm.component';
import { ClientGridComponent } from './clientGrid/clientGrid.component';
import { UserGridModule } from './userGrid/userGrid.module';
//import { CustomHttpProvider } from '../../../helpers/custom-http';

@NgModule({
  declarations: [
    GestioneUtentiComponent,
    UserFormComponent,
    ClientGridComponent,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    //AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    UserGridModule    
  ],
  providers: [
    //CustomHttpProvider,
    ],
  exports: [GestioneUtentiComponent],
  bootstrap: [GestioneUtentiComponent]
})
export class GestioneUtentiModule { }
