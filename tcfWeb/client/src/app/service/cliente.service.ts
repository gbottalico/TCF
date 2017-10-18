import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {User} from '../model/user';
import 'rxjs/add/operator/map';

@Injectable()
export class ClienteService {

  constructor(private http:Http) { }

  //retrieving ClienteService
  getClienti(){
  	return this.http.get('/tcf/api/clienteController/clienti')
  		.map(res=> res.json());
  }
  
}
