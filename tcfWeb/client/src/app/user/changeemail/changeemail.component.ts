import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-users',
  templateUrl: './changeemail.component.html',
  styleUrls: ['./changeemail.component.css'],
  providers: [UserService]
})
export class ChangeEmailComponent implements OnInit {
  user: User;
  model: any = {};


  constructor(private userService : UserService) { }

  ngOnInit() {
  }

  changeUserEmail(){
    this.userService.changeUserEmail(this.model.username, this.model.newEmail).subscribe(
      data => {
          
      },
      error => {
          
      });
  }

}
