import { Component, OnInit, OnChanges } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user';

@Component({
  selector: 'master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css'],
  providers: []
})
export class MasterComponent{

	readonly adminSystem:string = "Amministratore di sistema";
    readonly adminProject:string = "Amministratore di progetto";
    readonly reporter:string = "Consuntivatore";

	subscription:Subscription;
	userLogged : any;
	menuSelected : any;
	maxUserProfile : string;

   constructor( private authenticationService: AuthenticationService ) { 
   		 this.subscription = this.authenticationService.user$
      			.subscribe(
					item => setTimeout( 
							() => {
								  this.userLogged = item;
								  this.maxUserProfile = this.getMaxProfile(this.userLogged);
								  console.log(this.userLogged);} 
					  		, 0)
      			) //timeout fix error ExpressionChangedAfterItHasBeenCheckedError
   }

	logout(){
		this.authenticationService.logout();
	}

	selectMenu(menuParam){
		this.menuSelected = menuParam;
	}
    
    getMaxProfile(userLogged : User) : string{
        var profiles = Array<string>();

        for(let i=0; i<userLogged.clienti.length; i++)
            profiles.push(userLogged.clienti[i].id_profilo);

        return profiles.includes('AS') ? this.adminSystem : profiles.includes('AP') ? this.adminProject : this.reporter;
    }

}
