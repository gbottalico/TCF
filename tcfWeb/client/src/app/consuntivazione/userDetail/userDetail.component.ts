import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { User } from '../../model/user';
import * as $ from 'jquery';
import 'jquery-ui';
import 'jquery-easing';

@Component({
  selector: 'user-detail',
  templateUrl: './userDetail.component.html',
  styleUrls: ['./userDetail.component.css'],
  providers: []
})

export class UserDetailComponent{

  @Input() userLogged: User;
  @Input() userSelected : User;
  @Output() userChanged = new EventEmitter();
  monthSelected : Number;
  yearSelected : Number;

  selectMonth($monthParams){
    this.monthSelected = $monthParams.monthParam;
    this.yearSelected = $monthParams.year;
  }

  changeUser(){
    this.userChanged.emit();
  }
}
