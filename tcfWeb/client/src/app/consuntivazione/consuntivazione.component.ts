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

export class ConsuntivazioneComponent {


  userSelected : User;
  userLogged : User;
<<<<<<< HEAD
  isAdmin : boolean = false;
  selected : boolean = false;

  constructor(private authenticationService : AuthenticationService){
    this.authenticationService.user$.subscribe(user => { this.userLogged = user; });
    this.isAdmin = this.userLogged.isAdmin;
    if(!this.isAdmin)
       this.userSelected = this.userLogged;   
=======
  selected : boolean = false;

  constructor(private authenticationService : AuthenticationService){
    this.authenticationService.user$.subscribe(user => { this.userLogged = user });
    //alert(this.userLogged._id);
>>>>>>> ed19fedfa993349b67adcd19ea2fd6632d0ccec5
  }

  selectUser(userParam){
    this.userSelected = userParam;
    this.isAdmin = this.userLogged.isAdmin;
    this.selected = true;
    /*$('.selectUser').slideUp().fadeOut().hide('slow');
    $('.userDetail').fadeIn().show('slow');*/
  }

  changeUser(){
    this.userSelected = null;
    this.isAdmin = true;
    this.selected = false;
    /*$('.userDetail').slideDown().fadeOut().hide('slow');
    $('.selectUser').fadeIn().show('slow');*/
  }

}
