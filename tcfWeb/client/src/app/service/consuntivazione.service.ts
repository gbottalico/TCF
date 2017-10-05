import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Consuntivo } from "../model/consuntivo";
import { MeseConsuntivo } from "../model/meseConsuntivo";

@Injectable()
export class ConsuntivazioneService {

  constructor(private http:Http) { }

  //retrieving
  getMeseConsuntivoCliente(user, month, year){
  	return this.http.get('/tcf/api/consuntivoController/meseConsuntivoCliente/' + user + "/" + month + "/" + year)
  		.map(res=> res.json());
  }

  //add Consuntivo
  addConsuntivo(consuntivoParam : Consuntivo){
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this.http.post('/tcf/api/consuntivoController/consuntivo/', consuntivoParam, {headers:headers})
  		.map(res => res.json());
  }

  //add Mese Consuntivo
  addMeseConsuntivo(meseConsuntivoParam : MeseConsuntivo){
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this.http.post('/tcf/api/consuntivoController/meseConsuntivo/', meseConsuntivoParam, {headers:headers})
  		.map(res => res.json());
  }

  //TODO: delete Consentuivo
  /*TODOdeleteConsuntivo(id){
    return this.http.delete('/tcf/api/user')
      .map(res => res.json);
  }*/

}
