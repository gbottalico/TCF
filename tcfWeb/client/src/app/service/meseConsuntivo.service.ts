import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {MeseConsuntivo} from '../model/meseConsuntivo';
import 'rxjs/add/operator/map';
import { beforeMethod } from 'kaop-ts';import { LogAspect } from '../helpers/logAspect';

@Injectable()
export class MeseConsuntivoService {

  constructor(private http:Http) { }
  
	@beforeMethod(LogAspect.log)
  getMesiConsuntiviUtente(userId, year){
  	return this.http.get('/tcf/api/meseConsuntivoController/mesiConsuntiviUtente/'+userId+'/'+year)
    .map(res => res.json()); 
  }
}
