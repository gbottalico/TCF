import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { beforeMethod } from 'kaop-ts';import { LogAspect } from '../helpers/logAspect';
import { Ambito } from '../model/ambito';


@Injectable()
export class AmbitoService {

  constructor(private http:Http) { }

  //retrieving ActivityService
	@beforeMethod(LogAspect.log)
  getAmbito(){
  	return this.http.get('/tcf/api/ambitoController/CRUD')
  		.map(res=> res.json());
  }
  
  @beforeMethod(LogAspect.log)
  addAmbito(attivitaParam : Ambito){
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this.http.post('/tcf/api/ambitoController/CRUD/', attivitaParam, {headers:headers})
  		.map(res => res.json());
  }

  @beforeMethod(LogAspect.log)
  deleteAmbito(criteria){
  	var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete('/tcf/api/ambitoController/CRUD?criteria='+JSON.stringify(criteria), {headers:headers})
  		.map(res => res.json());
  }


  @beforeMethod(LogAspect.log)
  getAmbitoByCliente(criteria){
      return this.http.get('/tcf/api/ambitoController/CRUD?criteria='+JSON.stringify(criteria))
          .map(res=> res.json());
  }
}
