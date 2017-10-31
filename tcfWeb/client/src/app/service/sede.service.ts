import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { beforeMethod } from 'kaop-ts';import { LogAspect } from '../helpers/logAspect';

@Injectable()
export class SedeService {

  constructor(private http:Http) { }

  //retrieving SedeService
  @beforeMethod(LogAspect.log)
  getSedi(){
  	return this.http.get('/tcf/api/sedeController/sedi')
  		.map(res=> res.json());
  }

  //delete sede
  @beforeMethod(LogAspect.log)
  deleteSede(id){
    return this.http.delete('/tcf/api/sedeController/CRUD/' + id)
      .map(res => res.json);
  }
  
}
