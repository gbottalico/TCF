import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {User} from '../model/user';
import 'rxjs/add/operator/map';
import { beforeMethod } from 'kaop-ts';import { LogAspect } from '../helpers/logAspect';

@Injectable()
export class ClienteService {

  constructor(private http:Http) { }

  //retrieving ClienteService
  @beforeMethod(LogAspect.log)
  getClienti(){
  	return this.http.get('/tcf/api/clienteController/clienti')
  		.map(res=> res.json());
  }
  
}
