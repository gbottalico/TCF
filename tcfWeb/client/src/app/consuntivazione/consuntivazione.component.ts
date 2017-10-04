import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/user';
import * as $ from 'jquery';
import 'jquery-ui';
import 'jquery-easing';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-consuntivazione',
  templateUrl: './consuntivazione.component.html',
  styleUrls: ['./consuntivazione.component.css'],
  providers: []
})

export class ConsuntivazioneComponent{
  
  userSelected : User;
  userLogged : User;
  selected : boolean = false;

  constructor(private authenticationService : AuthenticationService){
    this.authenticationService.user$.subscribe(user => { this.userLogged = user });
    alert(this.userLogged._id);
  }

  selectUser(userParam){
    this.userSelected = userParam;
    this.selected = true;
  }

  changeUser(){
    this.userSelected = null;
    this.selected = false;
  }

}
