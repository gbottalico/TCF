import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import * as $ from 'jquery';
import 'jquery-ui';
import 'jquery-easing';

@Component({
  selector: 'app-consuntivazione',
  templateUrl: './consuntivazione.component.html',
  styleUrls: ['./consuntivazione.component.css'],
  providers: []
})

export class ConsuntivazioneComponent{
  
  userSelected : User;
  selected : boolean = false;

  constructor(){}

  selectUser(userParam){
    /*slidingPanel.animate({
                'left': '46%'
            }, 550, 'easeInOutBack');*/ 
    this.userSelected = userParam;
    this.selected = true;
  }

  changeUser(){
    this.userSelected = null;
    this.selected = false;
  }

}
