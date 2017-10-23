import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';

import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    userLogged =new BehaviorSubject<any>(0);
    user$ = this.userLogged.asObservable();

    constructor(
        private http: Http,
        private router: Router
        ) {
    }

    login(username: string, password: string) {
        return this.http.post('/tcf/api/userController/authenticate', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                   this.userLogged.next(user);                   
                }
                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        this.userLogged.next(null);
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }


  /**
   * Reset the password for a user and send it via mail
   *//*
  forgotPassword(token:string, newPassword:string) {
    return this.http.post('/tcf/api/userController/forgotpassword', { email: email});
  }*/
 
}