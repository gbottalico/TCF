import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import * as $ from 'jquery';
import 'jquery-ui';
import 'jquery-easing';
import { UserService } from '../../../service/user.service';
import { DatePipe } from '@angular/common';
import { SedeService } from '../../../service/sede.service';
import { SelectItem } from 'primeng/primeng';
import { ClienteService } from '../../../service/cliente.service';
import { Cliente } from '../../../model/cliente';

@Component({
    selector: 'userGrid',
    templateUrl: './userGrid.component.html',
    styleUrls: ['./userGrid.component.css'],
    providers: [UserService, SedeService, ClienteService]
})

export class UserGridComponent implements OnInit {
    users: any;
    sedi : any;
    admins: SelectItem[] = [{label : "Si", value: "Si"},{label: "No", value: "No"}];
    sediList: SelectItem[] = [];    
    clienti: SelectItem[] = []
    @Input() userLogged: User;
    @Output() showUserForm = new EventEmitter();
    @Output() dismissUserForm = new EventEmitter();
    @Output() modUser = new EventEmitter();
    @Input() saved: boolean;
    headerUtente : string;
    displayDialog: boolean = false;
    datePipe = new DatePipe('en-US');
    selectedSede: any;
    selectedAdmin : any;
    btnDialog : any;
    selectedClients: string[] = [];
    defaultClient : string = "Clienti";
    startDate : string;
    endDate : string;

    constructor(private userService: UserService,
                private sedeService : SedeService,
                private clienteService : ClienteService) {
        this.users = null;
        this.sedi = null;
    }

    ngOnInit() {
        $('.chiudi').hide();        
        this.getInformations();
    }

    ngOnChanges() {
        if (this.saved != null) {
            this.showUsersGrid();
            $('.chiudi').hide();
            $('.aggiungi').fadeIn().show();
        }            
    }

    getInformations() {
        this.userService.getUsersByClient(this.userLogged._id).subscribe(users => this.users = users);
        this.sedeService.getSedi().subscribe(sedi =>{
            sedi.forEach(sedi => {
                this.sediList.push({label : sedi.nome_sede, value : sedi.nome_sede});
            });
        });
        this.clienteService.getClienti().subscribe(clienti =>{
            clienti.forEach(clienti => {
                /*Come value gli devo passare la stringa e non l'oggetto.
                * Se passassi l'oggetto andrebbe a confrontare la stringa (clientSelected)
                * con l'oggetto del value, ritornerebbe false e quindi non sarebbe preselezionato il cliente*/
                this.clienti.push({label : clienti._id, value : clienti._id});
            });
        })
    }

    chooseClass(userParam: User) {
        var userClass;
        switch (this.getMaxUserProfile(userParam)) {
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

    getMaxUserProfile(userLogged: User): string {
        var profiles = Array<string>();

        for (let i = 0; i < userLogged.clienti.length; i++)
            profiles.push(userLogged.clienti[i].id_profilo);

        return profiles.includes('AS') ? "AS" : "AP";
    }

    /*Gestione click arrow "Gestione utenti"*/
    showUsersGrid() {
        if ($('.userCustomTitle').find('.toggleRight').hasClass('active')) {
            $('.toggleRight.userListRemote').removeClass('active').addClass('deactive');
        } else {
            $('.toggleRight.userListRemote').removeClass('deactive').addClass('active');
        }
        $('.listaUtenti ul').slideToggle();
    }

    /*Gestione click bottone "Aggiungi Utente"*/
    openUserForm() {
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
    closeUserForm() {
        $('.chiudi').hide();
        $('.aggiungi').fadeIn().show();
        if ($('.toggleRight.userListRemote').hasClass('deactive')) {
            $('.toggleRight.userListRemote').removeClass('deactive').addClass('active');
            $('.listaUtenti ul').slideToggle();
        }
        this.dismissUserForm.emit();
    }

    /*Gestione click BOTTONE modifica*/
    edit(indexParam) {
        if(indexParam != null){
            this.compilaUtente(this.users[indexParam]);
            this.headerUtente = "Modifica Utente";
            this.btnDialog = "Modifica";
        }
        else{
            this.resetUtente();
            this.headerUtente = "Aggiunta Utente";
            this.btnDialog = "Aggiungi"
        }
        this.displayDialog = true;
    }

    compilaUtente(user: User) {
        this.selectedClients = [];
        $("#cognome").val(user.cognome);
        $('#user').val(user._id);
        $('#email').val(user.email);
        this.startDate = user.data_inizio_validita != null ? this.datePipe.transform(user.data_inizio_validita, 'dd/MM/yyyy') : this.datePipe.transform(Date.now(), 'dd/MM/yyyy');
        this.endDate = user.data_fine_validita != null ? this.datePipe.transform(user.data_fine_validita, 'dd/MM/yyyy') : null;
        this.selectedSede = user.desc_sede != null ? user.desc_sede : null;
        this.selectedAdmin = user.isAdmin ? 'Si' : 'No';
        user.clienti.forEach(clienti => {
            this.selectedClients.push(clienti.id_cliente);
        });
        $('#nome').val(user.nome);
        $('#password').val(user.password);
        $('#sedeInput').val(user.desc_sede);
        $('#dataFine').val(this.datePipe.transform(user.data_fine_validita, 'dd/MM/yyyy'));
    }

    resetUtente() {
        $('.input').val("");        
        this.startDate = this.datePipe.transform(Date.now(), 'dd/MM/yyyy');
        this.endDate = null;
        this.selectedSede = null;
        this.selectedAdmin = null;
        this.selectedClients = [];
    }

}
