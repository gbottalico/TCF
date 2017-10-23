import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { User } from '../../model/user';
import * as $ from 'jquery';
import 'jquery-ui';
import 'jquery-easing';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-gestioneUtenti',
  templateUrl: './gestioneUtenti.component.html',
  styleUrls: ['./gestioneUtenti.component.css'],
  providers: []
})

export class GestioneUtentiComponent{
  components : boolean;
  clientGrid : boolean;
  showUserSection : boolean;
  showClientGrid : boolean;
  saved : boolean;
  userLogged : User;
  userDaModificare : User; 

  public constructor(private authenticationService : AuthenticationService){
    this.authenticationService.user$.subscribe(user => { this.userLogged = user });
  }

  openUserForm($event){
    this.saved = null;
    this.showUserSection = true;
  }

  closeUserForm($event){
    this.showUserSection = false;
    this.userDaModificare = null;
  }

  openClientGrid($event){
    this.showClientGrid = true;
  }

  closeClientGrid($event){
    this.showClientGrid = false;
  }

  salva(){
    this.showUserSection = null;
    this.showClientGrid = null;
    this.saved = true;
    this.userDaModificare = null;
  }

  modificaUtente(userParam){    
    this.showUserSection = true;
    this.userDaModificare = userParam;
  }

}
