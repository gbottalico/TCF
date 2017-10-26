import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {User} from '../model/user';
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
  	return this.http.post('/tcf/api/userController/CRUD', newUser, {headers:headers})
  		.map(res => res.json());
  }

  //add user
  updateUser(modifiedUser){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/tcf/api/userController/insOrUpdUtente/', modifiedUser, {headers:headers})
      .map(res => res.json());
  }

  //delete user
  deleteUser(id){
    return this.http.delete('/tcf/api/userController/CRUD/' + id)
      .map(res => res.json);
  }

  changeUserEmail(username:string, newEmail:string){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var bodyparams = {username:username, newEmail:newEmail}
  	return this.http.post('/tcf/api/userController/userChangeEmail', bodyparams, {headers:headers})
  		.map(res => res.json());
  }

  changeUserPwd(userLogged: User, oldPwd:string, newPwd:string){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var bodyparams = {userLogged: userLogged, oldPwd:oldPwd, newPwd:newPwd}
  	return this.http.post('/tcf/api/userController/userChangePwd', bodyparams, {headers:headers})
  		.map(res => res.json());
  }

  getUsersByClient(userLogged){
  	return this.http.get('/tcf/api/userController/userByClient/' + userLogged + "/")
    .map(res => res.json()); 
  }

  getMaxProfile(userLogged){
  	return this.http.get('/tcf/api/userController/getMaxProfile/' + userLogged + "/")
    .map(res => res.json()); 
  }
}
