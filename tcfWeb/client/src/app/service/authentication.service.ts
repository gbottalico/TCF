import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
//import {Subject} from 'rxjs/Subject';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';

import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService implements OnInit{

    user$ = new BehaviorSubject<any>(null);
    //userLogged =new BehaviorSubject<any>(0);
    //user$ = this.userLogged.asObservable();

    constructor(
        private http: Http,
        private router: Router,
        private activatedRoute: ActivatedRoute
        ) {
            console.log("costruttore autentication service");
            this.user$.next(this._user$);
            // if(localStorage.getItem('currentUser'))
            //     this._user$ = localStorage.getItem('currentUser');
    }

    ngOnInit(){
        console.log("onInit autentication service");
        this.router.events
        .filter((event) => event instanceof NavigationEnd)
        .map(() => this.activatedRoute)
        .map((route) => {
            
            while (route.firstChild) route = route.firstChild;
            return route;
        })
        .filter((route) => route.outlet === 'primary')
        .mergeMap((route) => route.data)
        .subscribe(
        (event) => {
            console.log(window.location.pathname);
            if (window.location.pathname == "/login") {
                this.logout();
            } else {
                
                // user = localStorage.getItem('currentUser');
                // if (this.userLogged != null)
                // this.maxUserProfile = this.getMaxProfile(this.userLogged);
            }
        });
    }


    login(username: string, password: string) {
        return this.http.post('/tcf/api/userController/authenticate', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                   this._user$ = user;                   
                }
                return this._user$;
            });
    }

    logout() {
        // remove user from local storage to log user out
        //this.userLogged.next(null);
        //this.userLogged = null;
        
        this.router.navigate(['/login']);
        this._user$ = null;
    }

    set _user$(value: any) {
        console.log("set userLogged");
        if(value){
            localStorage.setItem('currentUser', JSON.stringify(value));
        }else{
            localStorage.removeItem('currentUser');
        }
        this.user$.next(value); // this will make sure to tell every subscriber about the change.
    }
     
      get _user$() {
        console.log("get userLogged");
        return JSON.parse(localStorage.getItem('currentUser'));
      }


  /**
   * Reset the password for a user and send it via mail
   *//*
  forgotPassword(token:string, newPassword:string) {
    return this.http.post('/tcf/api/userController/forgotpassword', { email: email});
  }*/
 
}