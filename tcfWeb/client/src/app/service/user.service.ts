import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {User} from '../model/user';
import 'rxjs/add/operator/map';
import { beforeMethod } from 'kaop-ts';import { LogAspect } from '../helpers/logAspect';

@Injectable()
export class UserService {

  constructor(private http:Http) { }

  //retrieving UserService
  @beforeMethod(LogAspect.log)
  getUsers(){
  	return this.http.get('/tcf/api/userController/users')
  		.map(res=> res.json());
  }

  //add user
  @beforeMethod(LogAspect.log)
  addUser(newUser){
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this.http.post('/tcf/api/userController/insOrUpdUtente', newUser, {headers:headers})
  		.map(res => res.json());
  }

  //add user
  @beforeMethod(LogAspect.log)
  updateUser(modifiedUser){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/tcf/api/userController/insOrUpdUtente/', modifiedUser, {headers:headers})
      .map(res => res.json());
  }

  //delete user
  @beforeMethod(LogAspect.log)
  deleteUser(id){
    return this.http.delete('/tcf/api/userController/CRUD/' + id)
      .map(res => res.json);
  }

  @beforeMethod(LogAspect.log)
  changeUserEmail(username:string, newEmail:string){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var bodyparams = {username:username, newEmail:newEmail}
  	return this.http.post('/tcf/api/userController/userChangeEmail', bodyparams, {headers:headers})
  		.map(res => res.json());
  }

  @beforeMethod(LogAspect.log)
  changeUserPwd(userLogged: User, oldPwd:string, newPwd:string){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var bodyparams = {userLogged: userLogged, oldPwd:oldPwd, newPwd:newPwd}
  	return this.http.post('/tcf/api/userController/userChangePwd', bodyparams, {headers:headers})
  		.map(res => res.json());
  }

  @beforeMethod(LogAspect.log)
  getUsersByClient(userLogged){
  	return this.http.get('/tcf/api/userController/userByClient/' + userLogged + "/")
    .map(res => res.json()); 
  }

  @beforeMethod(LogAspect.log)
  getMaxProfile(userLogged){
  	return this.http.get('/tcf/api/userController/getMaxProfile/' + userLogged + "/")
    .map(res => res.json()); 
  }
}
