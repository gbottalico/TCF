import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { beforeMethod } from 'kaop-ts';import { LogAspect } from '../helpers/logAspect';


@Injectable()
export class AttivitaService {

  constructor(private http:Http) { }

  //retrieving SedeService
	@beforeMethod(LogAspect.log)
  getAttivita(){
  	return this.http.get('/tcf/api/attivitaController/CRUD')
  		.map(res=> res.json());
  }
  
}
