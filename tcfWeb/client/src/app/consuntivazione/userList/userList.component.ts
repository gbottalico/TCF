import { Component, OnInit } from '@angular/core';
import {User} from '../../user/user';
import {UserService} from '../../user/user.service';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search'
})

/*Da verifica se opportuno modificare per richiamare il servizio direttamente al type (casistica molti record)*/
export class SearchUser implements PipeTransform {
  public transform(value, keys: string, term: string) {

    if (!term) return value;
    return (value || []).filter((item) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));

  }
}

@Component({
  selector: 'user-list',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.css'],
  providers: [UserService]
})


export class UserListComponent {

  users: User[];
  constructor(private userService : UserService) {
    this.userService.getUsers().subscribe( users => this.users = users);
  }

  }
