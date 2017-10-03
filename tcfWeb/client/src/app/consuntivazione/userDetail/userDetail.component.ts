import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../model/user';


@Component({
  selector: 'user-detail',
  templateUrl: './userDetail.component.html',
  styleUrls: ['./userDetail.component.css'],
  providers: []
})

export class UserDetailComponent {
  @Input() userSelected : User;
  @Output() userChanged = new EventEmitter();

  changeUser(){
    this.userChanged.emit();
  }
}
