import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {User} from '../model/user';
import 'rxjs/add/operator/map';

@Injectable()
export class SedeService {

  constructor(private http:Http) { }

  //retrieving SedeService
  getSedi(){
  	return this.http.get('/tcf/api/sedeController/sedi')
  		.map(res=> res.json());
  }

  //delete sede
  deleteSede(id){
    return this.http.delete('/tcf/api/sedeController/CRUD/' + id)
      .map(res => res.json);
  }
  
}
