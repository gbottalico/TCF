import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {User} from './user';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http:Http) { }

  //retrieving UserService
  getUsers(){
  	return this.http.get('/tcf/api/userController/users')
  		.map(res=> res.json());
  }

  //add user
  addUser(newUser){
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this.http.post('/tcf/api/userController/user', newUser, {headers:headers})
  		.map(res => res.json());
  }

  //delete user
  deleteUser(id){
    return this.http.delete('/tcf/api/user')
      .map(res => res.json);
  }

}
