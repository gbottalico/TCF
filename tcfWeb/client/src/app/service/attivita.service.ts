import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AttivitaService {

  constructor(private http:Http) { }

  //retrieving SedeService
  getAttivita(){
  	return this.http.get('/tcf/api/attivitaController/CRUD')
  		.map(res=> res.json());
  }
  
}
