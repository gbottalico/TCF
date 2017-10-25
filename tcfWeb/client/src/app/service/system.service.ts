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

    //MENU SECTION
    getMenu(userLogged: any) {
        return this.http.post('/tcf/api/menuController/getMenuList',  userLogged )
            .map((response: Response) => {
                let menu = response.json();
                return menu;
            });
    }

    //DOMAIN SECTION
    getTipiDeliverable() {
        return this.getGenericCall("/FTC/COMMON/lst_deliverable");      
    }

    getAmbiti() {
        return this.getGenericCall("/FTC/COMMON/lst_ambiti");               
    }

    getAree() {
        return this.getGenericCall("/FTC/COMMON/lst_aree");               
    }

    getGenericCall(domain){
        return this.http.get('/tcf/api/domainController/getDomainList' + domain )
        .map((response: Response) => {
            let domain  = response.json();
            return domain;
        }); 
    }


 
}