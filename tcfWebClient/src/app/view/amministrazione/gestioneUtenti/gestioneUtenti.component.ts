import { Component, Input, Output, EventEmitter, OnChanges, OnInit, Injectable, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { User } from '../../../model/user';
import * as $ from 'jquery';
import 'jquery-ui';
import 'jquery-easing';
import { UserService } from '../../../service/user.service';
import { DatePipe } from '@angular/common';
import { DomainService } from '../../../service/domain.service';
import { SelectItem } from 'primeng/primeng';
import { ClienteService } from '../../../service/cliente.service';
import { Cliente } from '../../../model/cliente';

import { ConfirmationService } from 'primeng/primeng';
import { AuthenticationService } from '../../../service/authentication.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'gestioneUtenti',
  templateUrl: './gestioneUtenti.component.html',
  styleUrls: ['./gestioneUtenti.component.css'],
  providers: [FormBuilder, AuthenticationService, UserService, DomainService, ClienteService, ConfirmationService]
})

export class GestioneUtentiComponent implements OnInit {
  allSistemUser: User[] = [];
  users: any;
  newUser: User;
  sedi: any;
  clienti: Cliente[] = [];
  admins: SelectItem[] = [{ label: "Si", value: true }, { label: "No", value: false }];
  sediList: SelectItem[] = [];
  clientiComboBox: SelectItem[] = [];
  profili: SelectItem[] = [{ label: "Amm. di Progetto", value: "AP" }, { label: "Consuntivatore", value: "CS" }];
  userLogged: User;
  headerUtente: string;
  displayDialog: boolean = false;
  datePipe = new DatePipe('en-US');
  //btnDialog: any;
  startUserDate: string;
  endUserDate: string;
  startClientDate: Date[] = [];
  endClientDate: Date[] = [];
  minClientDate: Date[] = [];
  maxClientDate: Date[] = [];
  userIndex;
  userForm: FormGroup;
  confirmPassword: string;
  formSubmitted: boolean = false;
  clientiObject : any;


  constructor(private userService: UserService,
    private domainService: DomainService,
    private clienteService: ClienteService,
    private confirmationService: ConfirmationService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private changeDetectionRef: ChangeDetectorRef) {
    this.authenticationService.user$.subscribe(user => { this.userLogged = user });
    this.allSistemUser = [];
    this.users = null;
    this.sedi = null;
    this.newUser = new User();
    this.clientiObject = new Array<Object>();
    this.userForm = this.formBuilder.group({
      cognome: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      dataInizio: new FormControl('', Validators.required),
      dataFine: new FormControl('', this.controlDateValidator),
      username: new FormControl('', [Validators.required/*, this.usernameValidator*/]),
      password: new FormControl('', Validators.required),
      confPassword: new FormControl('', Validators.compose([Validators.required, this.matchPasswordValidator])),
      dataInizioCliente: new FormControl('', Validators.required),
      dataFineCliente: new FormControl('', this.controlClientDateValidator),
      sede: new FormControl('', Validators.required),
      idCliente: new FormControl('', Validators.required),
      profiloCliente: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.userService.getUsersByManager(this.userLogged._id).subscribe(users =>
      this.users = users);

    this.domainService.getSedi().subscribe(sedi => {
      this.sediList = sedi;
    });

    this.clienteService.getClienti().subscribe(clienti => {
      this.clienti = clienti;
      clienti.forEach(cliente => {
        /*Come value gli devo passare la stringa e non l'oggetto.
        * Se passassi l'oggetto andrebbe a confrontare la stringa (clientSelected)
        * con l'oggetto del value, ritornerebbe false e quindi non sarebbe preselezionato il cliente*/
        this.clientiComboBox.push({ label: cliente.nome_cliente, value: cliente._id });
        this.minClientDate.push(cliente.data_inizio_validita);
        this.maxClientDate.push(cliente.data_fine_validita);
      });
    });
    //this.userService.getUsers().subscribe(users => this.allSistemUser = users);
  }


  /*Gestione click MODIFICA UTENTE*/
  editRow(rowData, rowIndex) {
    this.abilitaValidazioni();
    this.newUser = JSON.parse(JSON.stringify(rowData));
    this.newUser.data_inizio_validita = new Date(this.newUser.data_inizio_validita);
    this.newUser.data_fine_validita = this.newUser.data_fine_validita != null ? new Date(this.newUser.data_fine_validita) : null;
    this.newUser.clienti.forEach((element, index) => {
      if (element != null) {
        element.data_inizio_validita_cliente = element.data_inizio_validita_cliente != null ? new Date(element.data_inizio_validita_cliente) : null;
        element.data_fine_validita_cliente = element.data_fine_validita_cliente != null ? new Date(element.data_fine_validita_cliente) : null;
      }
    });

    this.clientiObject = this.newUser.clienti;
    this.clientiObject.forEach(element => {
      element.isEditable = false;
    });
  
    this.headerUtente = "Modifica Utente - " + this.newUser.nome + " " + this.newUser.cognome;
    //this.btnDialog = "Modifica";
    this.userIndex = rowIndex;
    this.displayDialog = true;
  }

  /*Gestione click AGGIUNTA UTENTE*/
  addNewUser() {
    this.abilitaValidazioni();
    this.newUser = new User();
    this.newUser.isAdmin = false;
    this.newUser.data_inizio_validita = new Date();
    this.formSubmitted = false;
    this.headerUtente = "Aggiungi Utente";
    //this.btnDialog = "Aggiungi";
    this.userIndex = null;
    this.displayDialog = true;
    this.userForm.reset();
  }

  saveNew() {
    //alert("save");
    this.userService.insOrUpdUser(this.newUser).subscribe(
      user => {
        if (this.userIndex == null) { //aggiunta
          this.users.push(user);
        } else {
          this.users[this.userIndex] = user;
        }
        this.users = JSON.parse(JSON.stringify(this.users)); //deepcopy
        this.changeFormatDate(this.users);
      });
    this.displayDialog = false;
  }

  /*Metodo per aggiungere, al click del bottone, una riga alla table dei clienti*/
  addCliente() {
    var newCliente: any;
    newCliente = {};
    newCliente.cliente = {};
    newCliente.cliente._id = null;
    newCliente.profilo = null;
    newCliente.data_inizio_validita_cliente = new Date();
    newCliente.data_fine_validita_cliente = null;
    newCliente.isEditable = true;

    this.clientiObject.push(newCliente);

  }

  //DELETE ROW
  private deleteRow(rowData, rowIndex) {
    var selCriteria;
    selCriteria = new Object();
    selCriteria._id = rowData._id;
    this.confirmationService.confirm({
      message: "Sei sicuro di voler eliminare l'utente '" + rowData._id + "' ?",
      header: 'Elimina utente',
      icon: 'fa fa-trash',
      accept: () => {
        this.userService.deleteUser(selCriteria).subscribe(event => {
          this.users.splice(rowIndex, 1);
          this.users = JSON.parse(JSON.stringify(this.users)); //deepcopy
          this.changeFormatDate(this.users);
        });
      }
    });
  }

  private deleteClientRow(rowData, rowIndex) {
    this.confirmationService.confirm({
      message: "Sei sicuro di voler eliminare il cliente?",
      header: 'Elimina cliente',
      icon: 'fa fa-trash',
      accept: () => {
        this.newUser.clienti.splice(rowIndex, 1);
        //this.newUser.clienti = JSON.parse(JSON.stringify(this.newUser.clienti)); //deepcopy
        //this.changeFormatDate(this.newUser);
      }
    });
  }


  //VALIDATOR & UTILITY

  /*Funzione per modificare il formato della data ritornato dallo stringify(da ISO8061 a new Date)
  per la non compatibilità col calendar*/
  private changeFormatDate(user: User) {
    if (user.clienti != null) {
      user.clienti.forEach(element => {
        element.data_inizio_validita_cliente = element.data_inizio_validita_cliente != null ? new Date(element.data_inizio_validita_cliente) : null;
        element.data_fine_validita_cliente = element.data_fine_validita_cliente != null ? new Date(element.data_fine_validita_cliente) : null;
      });
    }
  }

  private matchPasswordValidator(control: FormControl) {
    let password = control.root.value['password'] != null ? control.root.value['password'] : null;
    let confPassword = control.value;
    if (password != confPassword) {
      return { matchPassword: true }
    }
    return null;
  }

  private controlDateValidator(control: FormControl) {
    let dataInizio = control.root.value['dataInizio'] != null ? control.root.value['dataInizio'] : null;
    let dataFine = control.value;
    if (dataInizio > dataFine && dataFine != null) {
      return { controlDate: true }
    }
    return null;
  }

  private controlClientDateValidator(control: FormControl) {
    let dataInizioCliente = control.root.value['dataInizioCliente'] != null ? control.root.value['dataInizioCliente'] : null;
    let dataFineCliente = control.value;
    if (dataInizioCliente > dataFineCliente && dataFineCliente != null) {
      return { controlClientDate: true }
    }
    return null;
  }

  /*il form group non ha di per se un metodo per verificare se sul form è stato fatto il submit*/
  private checkForm(form) {
    //disabilito controlli in caso di modifica utente (psw non visibili)
    if (this.userIndex != null) {
      this.userForm.controls['password'].disable();
      this.userForm.controls['confPassword'].disable();
    }
    //disabilito controlli in caso di nessun cliente inserito (posso inserire utente senza clienti)
    if (this.newUser.clienti == null || (this.newUser.clienti != null && !(this.newUser.clienti.length > 0))){
      this.userForm.controls['idCliente'].disable();
      this.userForm.controls['profiloCliente'].disable();
      this.userForm.controls['dataInizioCliente'].disable();
      this.userForm.controls['dataFineCliente'].disable();
    }
    this.formSubmitted = true;
    return form.valid;
  }

  private abilitaValidazioni(){
    this.userForm.controls['password'].enable();
    this.userForm.controls['confPassword'].enable();
    this.userForm.controls['idCliente'].enable();
    this.userForm.controls['profiloCliente'].enable();
    this.userForm.controls['dataInizioCliente'].enable();
    this.userForm.controls['dataFineCliente'].enable();
  }

  private isValid(componentName: string) {
    if ((this.userForm.get(componentName).touched || this.formSubmitted) && this.userForm.get(componentName).errors)
      return "#a94442";
    else
      return "#898989"; //#d6d6d6
  }

  private isModifica() {
    return this.userIndex != null;
  }

<<<<<<< HEAD
  private editCliente(rowData, indexData) {
    this.CloseAllEditable();
    rowData.isEditable = true;
  }

  private CloseAllEditable() {
    for (let item of this.clientiObject) 
      if (item.isEditable) 
        item.isEditable = false;   
  }

  private abortEditCliente(rowData, indexData) {
    rowData.isEditable = false;
  }

  private saveEditCliente(rowData, indexData) {
    var clienteTrovato;
    clienteTrovato = this.newUser.clienti.find(x => x.cliente._id == rowData.cliente._id)
    
    if (clienteTrovato == null) {
      var newCliente: any = {};
      newCliente.cliente = rowData.cliente;
      newCliente.cliente._id = rowData.cliente._id;
      newCliente.profilo = rowData.profilo;
      newCliente.data_inizio_validita_cliente = rowData.data_inizio_validita_cliente;
      newCliente.data_fine_validita_cliente = rowData.data_fine_validita_cliente;
      this.newUser.clienti.push(newCliente);
    } else {
      clienteTrovato.cliente = rowData.cliente;
      clienteTrovato.cliente._id = rowData.cliente._id;
      clienteTrovato.profilo = rowData.profilo;
      clienteTrovato.data_inizio_validita_cliente = rowData.data_inizio_validita_cliente;
      clienteTrovato.data_fine_validita_cliente = rowData.data_fine_validita_cliente;
    }

    rowData.isEditable = false;
  }

  private cloneClienteField(){

  }


=======
  private abortNew() {
    this.displayDialog = false;
  }

>>>>>>> 6745e0aee3c6b745ba4e15e8e64e0cf20a29c60c
}



