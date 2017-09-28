import { Component, Input } from '@angular/core';
import { User } from '../../user/user';


@Component({
  selector: 'user-selected',
  templateUrl: './userSelected.component.html',
  styleUrls: ['./userSelected.component.css'],
  providers: []
})

export class UserSelectedComponent {
  @Input() userSelected : User;
  
}
