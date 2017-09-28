import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';


@Component({
  selector: 'app-consuntivazione',
  templateUrl: './consuntivazione.component.html',
  styleUrls: ['./consuntivazione.component.css'],
  providers: []
})

export class ConsuntivazioneComponent {
  
  userSelected : User;
  selection : boolean = false;  

  constructor(){}

  selectUser(userParam){
    this.userSelected = userParam;
  }
}
