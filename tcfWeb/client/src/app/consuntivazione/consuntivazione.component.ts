import { Component, OnInit, Input, OnChanges } from '@angular/core';
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

export class ConsuntivazioneComponent implements OnInit{


  userSelected : User;
  userLogged : User;
  isAdmin : boolean = false;
  selected : boolean = false;
  userList;
  userDetail;

  constructor(private authenticationService : AuthenticationService){
    this.authenticationService.user$.subscribe(user => { this.userLogged = user; });
    this.isAdmin = this.userLogged.isAdmin;
    
  }

  ngOnInit(){
    this.userList = $('.selectUser');
    this.userDetail = $('.userDetail');
    if(!this.isAdmin){
      this.userSelected = this.userLogged;
      this.userList.hide();
      this.userDetail.show();
   }
   else{
    this.userList.show();
    this.userDetail.hide();
   }
  }

  selectUser(userParam){
    this.userSelected = userParam;
    this.isAdmin = this.userLogged.isAdmin;
    this.selected = true;
    this.userList.slideUp().fadeOut().hide('slow');
    this.userDetail.fadeIn().show('slow');
  }

  changeUser(){
    this.userSelected = null;
    this.isAdmin = true;
    this.selected = false;    
    this.userDetail.slideDown().fadeOut().hide('slow');
    this.userList.fadeIn().show('slow');
  }

}
