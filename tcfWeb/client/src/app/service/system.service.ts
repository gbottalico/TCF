import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';

import 'rxjs/add/operator/map'

@Injectable()
export class SystemService {

     constructor(
        private http: Http,
        private router: Router
        ) {            
    }

    getMenu(userLogged: any) {
        return this.http.post('/tcf/api/menuController/getMenuList',  userLogged )
            .map((response: Response) => {
                let menu = response.json();
                return menu;
            });
    }

 
}