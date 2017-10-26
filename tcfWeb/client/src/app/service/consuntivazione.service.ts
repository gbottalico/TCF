import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Consuntivo } from "../model/consuntivo";
import { MeseConsuntivo } from "../model/meseConsuntivo";

@Injectable()
export class ConsuntivazioneService {

  constructor(private http:Http) { }

  //retrieving
  getMeseConsuntivoUtente(user, month, year){
  	return this.http.get('/tcf/api/consuntivoController/consuntiviUtente/' + user + "/" + month + "/" + year)
  		.map(res=> res.json());
  }

  //add Consuntivo
  addConsuntivo(consuntivoParam : Consuntivo){
  	var headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this.http.post('/tcf/api/consuntivoController/CRUD/', consuntivoParam, {headers:headers})
  		.map(res => res.json());
  }

  addUpdateConsuntivi(consuntivoParam : Consuntivo[]){
  	var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(consuntivoParam);
  	return this.http.post('/tcf/api/consuntivoController/consuntiviUtente/', consuntivoParam, {headers:headers})
  		.map(res => res.json());
  }

  //delete Consuntivo
  // deleteConsuntivi(id_user, id_macro_area, id_ambito, id_attivita, id_tipo_deliverable){
  // 	var headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.delete('/tcf/api/consuntivoController/consuntiviUtente/'+id_user+'/' + id_macro_area+'/'+id_ambito+'/'+id_attivita+'/'+id_tipo_deliverable, {headers:headers})
  // 		.map(res => res.json());
  // }

  deleteConsuntivi(criteria){
  	var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("/tcf/api/consuntivoController/CRUD?criteria="+JSON.stringify(criteria));
    return this.http.delete('/tcf/api/consuntivoController/CRUD?criteria='+JSON.stringify(criteria), {headers:headers})
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
