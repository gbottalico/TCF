import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import * as $ from 'jquery';
import 'jquery-ui';
import 'jquery-easing';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'userGrid',
  templateUrl: './userGrid.component.html',
  styleUrls: ['./userGrid.component.css'],
  providers: [UserService]
})

export class UserGridComponent implements OnInit{
    users : User[];
    @Input() userLogged : User;
    @Output() showUserForm = new EventEmitter();
    @Output() dismissUserForm = new EventEmitter();
    @Input() saved : boolean;

    constructor(private userService : UserService) {
    }

    ngOnInit(){
        $('.chiudi').hide();
        this.getUsers();
    }

    ngOnChanges(){
        if(this.saved != null){
            this.showUsersGrid();
            $('.chiudi').hide();
            $('.aggiungi').fadeIn().show();
        }


    }

    getUsers(){
        this.userService.getUsersByClient(this.userLogged._id).subscribe( users => this.users = users);
    }

    chooseClass(userParam : User){
        var userClass;
        switch(this.getMaxUserProfile(userParam)){
        case 'AS':
            userClass = "fa fa-user-md";
            break;
        case 'AP':
            userClass = "fa fa-user-plus";
            break;
        case 'CS':
            userClass = "fa fa-user";
            break;
        }
        return userClass;  
    }
    
    getMaxUserProfile(userLogged : User) : string{
        var profiles = Array<string>();
        
        for(let i=0; i<userLogged.clienti.length; i++)
            profiles.push(userLogged.clienti[i].id_profilo);

        return profiles.includes('AS') ? "AS" : "AP";
    }

    /*Gestione click arrow "Gestione utenti"*/
    showUsersGrid(){
        if ($('.userCustomTitle').find('.toggleRight').hasClass('active')) {
            $('.toggleRight.userListRemote').removeClass('active').addClass('deactive');
        } else {
            $('.toggleRight.userListRemote').removeClass('deactive').addClass('active');
        }
        $('.listaUtenti ul').slideToggle();
    }

    /*Gestione click bottone "Aggiungi Utente"*/
    openUserForm(){
        if ($('.userCustomTitle').find('.toggleRight').hasClass('active')) {
            $('.toggleRight.userListRemote').removeClass('active').addClass('deactive');
            $('.listaUtenti ul').slideToggle();
            $('.aggiungi').hide();
            $('.chiudi').fadeIn().show();
        } else {
            $('.aggiungi').hide();
            $('.chiudi').fadeIn().show();
        }
        this.showUserForm.emit();
    }

    /*Gestione click BOTTONE "Chiudi aggiunta utente"*/
    closeUserForm(){
        $('.chiudi').hide();
        $('.aggiungi').fadeIn().show();
        if ($('.toggleRight.userListRemote').hasClass('deactive')) {
            $('.toggleRight.userListRemote').removeClass('deactive').addClass('active');
            $('.listaUtenti ul').slideToggle();
        } 
        this.dismissUserForm.emit();
    }
}
