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
import { Sede } from '../../../model/sede';
import {ConfirmationService} from 'primeng/primeng';
@Component({
    selector: 'userGrid',
    templateUrl: './userGrid.component.html',
    styleUrls: ['./userGrid.component.css'],
    providers: [UserService, SedeService, ClienteService, ConfirmationService]
})

export class UserGridComponent implements OnInit {
    users: any;
    newUser: User;
    sedi: any;
    clienti: Cliente[] = [];
    admins: SelectItem[] = [{ label: "Si", value: true }, { label: "No", value: false }];
    sediList: SelectItem[] = [];
    clientiComboBox: SelectItem[] = [];
    profili: SelectItem[] = [{ label: "Amm. di Progetto", value: "AP" }, { label: "Consuntivatore", value: "CS" }];
    @Input() userLogged: User;
    headerUtente: string;
    displayDialog: boolean = false;
    datePipe = new DatePipe('en-US');
    btnDialog: any;
    startUserDate: string;
    endUserDate: string;
    startClientDate: Date[] = [];
    endClientDate: Date[] = [];
    minClientDate: Date[] = [];
    maxClientDate: Date[] = [];
    userIndex;

    constructor(private userService: UserService,
        private sedeService: SedeService,
        private clienteService: ClienteService,
        private confirmationService: ConfirmationService) {
        this.users = null;
        this.sedi = null;
        this.newUser = new User();
    }

    ngOnInit() {
        $('.chiudi').hide();
        this.getInformations();
    }

    getInformations() {
        this.userService.getUsersByClient(this.userLogged._id).subscribe(users => this.users = users);
        this.sedeService.getSedi().subscribe(sedi => {
            sedi.forEach(sedi => {
                this.sediList.push({ label: sedi.nome_sede, value: sedi._id });
            });
        });
        this.clienteService.getClienti().subscribe(clienti => {
            this.clienti = clienti;
            clienti.forEach(clienti => {
                /*Come value gli devo passare la stringa e non l'oggetto.
                * Se passassi l'oggetto andrebbe a confrontare la stringa (clientSelected)
                * con l'oggetto del value, ritornerebbe false e quindi non sarebbe preselezionato il cliente*/
                this.clientiComboBox.push({ label: clienti.nome_cliente, value: clienti._id });
                this.minClientDate.push(clienti.data_inizio_validita);
                this.maxClientDate.push(clienti.data_fine_validita);
            });
        });
    }

    /*Gestione click MODIFICA UTENTE*/
    editRow(rowData, rowIndex) {
        this.newUser = rowData;
        this.newUser.data_inizio_validita = new Date(rowData.data_inizio_validita);
        this.newUser.data_fine_validita = rowData.data_fine_validita != null ? new Date(rowData.data_fine_validita) : null ;
        this.newUser.clienti.forEach((element, index) => {
            if(rowData.clienti[index]!=null){
                element.data_inizio_validita_cliente = rowData.clienti[index].data_inizio_validita_cliente != null ? new Date(rowData.clienti[index].data_inizio_validita_cliente) : null;
                element.data_fine_validita_cliente = rowData.clienti[index].data_fine_validita_cliente != null ? new Date(rowData.clienti[index].data_fine_validita_cliente) : null;
            }
        });         
        this.headerUtente = "Modifica Utente";
        this.btnDialog = "Modifica";
        this.userIndex = rowIndex;
        this.displayDialog = true;
    }

    /*Gestione click AGGIUNTA UTENTE*/
    addNewUser() {
        this.newUser = new User();
        this.headerUtente = "Aggiungi Utente";
        this.btnDialog = "Aggiungi";
        this.userIndex = null;
        this.displayDialog = true;
    }

    saveNew() {
        if (this.userIndex == null) { //aggiunta
            this.userService.addUser(this.newUser).subscribe(event => {
                this.users.push(this.newUser);
                this.users = Object.create(this.users);
            });
        }
        else { //modifica
            alert("Sono qui");
            this.userService.updateUser(this.newUser).subscribe(event => {
                this.users[this.userIndex] = this.newUser;
                /*this.users = Object.create(this.users);*/
            });
        }
        this.displayDialog = false;
    }

    /*Metodo per aggiungere, al click del bottone, una riga alla table dei clienti*/
    addCliente() {
        var newCliente: any = {};
        newCliente.id_cliente = null;
        newCliente.id_profilo = null;
        newCliente.data_inizio_validita_cliente = null;
        newCliente.data_fine_validita_cliente = null;

        if(this.newUser.clienti == null){
            this.newUser.clienti = [{id_cliente : "Zurich", id_profilo : "CS", data_inizio_validita_cliente : new Date(), data_fine_validita_cliente : null}];
        }else{
            this.newUser.clienti.push(newCliente);
        }

        /*Eliminando i due clienti, verificando si siano eliminati e riaggiungendoli, li vedo correttamente*/
        this.newUser.clienti = [{id_cliente : "Zurich", id_profilo : "CS", data_inizio_validita_cliente : new Date(), data_fine_validita_cliente : null},
                                {id_cliente : "Itas", id_profilo : "CS", data_inizio_validita_cliente : new Date(), data_fine_validita_cliente : null}];
        //this.newUser.clienti = this.newUser.clienti;


   }

    //DELETE ROW
    private deleteRow(rowData, rowIndex) {
        //TODO logica di eleiminazione della riga
        this.confirmationService.confirm({
            message: "Sei sicuro di voler eliminare l'utente '"+rowData._id+"' ?",
            header: 'Elimina utente',
            icon: 'fa fa-trash',
            accept: () => {
                this.userService.deleteUser(rowData._id).subscribe(event => {
                    this.users.splice(rowIndex, 1);
                    this.users = Object.create(this.users); //deepcopy
                });
            }
        });
        
    }

    private deleteClientRow(rowData, rowIndex){
        this.confirmationService.confirm({
            message: "Sei sicuro di voler eliminare il cliente?",
            header: 'Elimina cliente',
            icon: 'fa fa-trash',
            accept: () => {
                /*this.userService.deleteClientUser(rowData.id_cliente).subscribe(event => {*/
                this.newUser.clienti.splice(rowIndex, 1);
                this.newUser.clienti = Object.create(this.newUser.clienti); //deepcopy
                /* }); */
            }
        });
        
    }

}
