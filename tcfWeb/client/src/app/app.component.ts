import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import { AuthenticationService } from './login/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit{
	subscription:Subscription;
	userLogged : any;


   constructor( private authenticationService: AuthenticationService ) { 
   		 this.subscription = this.authenticationService.user$
      			.subscribe(item => {
      				this.userLogged = item;
      				console.log(this.userLogged);
      			})
   }


	ngOnInit() {
		
	}

	logout(){
		this.authenticationService.logout();
	}

}
