import { Component, Input, Output, EventEmitter, OnChanges, OnInit, Injectable, ViewEncapsulation } from '@angular/core';

import { SelectItem } from 'primeng/primeng';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from '../../model/cliente';
import { ConfirmationService } from 'primeng/primeng';
import { AuthenticationService } from '../../service/authentication.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Attivita } from '../../model/attivita';
import { SystemService } from '../../service/system.service';
import { CommessaCliente } from '../../model/commessaCliente';
import { CommessaClienteService } from '../../service/commessaCliente.service';
import { AttivitaService } from '../../service/attivita.service';
import { AmbitoService } from '../../service/ambito.service';
// import { AttivitaService } from '../../service/attivita.service';

@Component({
    selector: 'gestioneAttivita',
    templateUrl: './gestioneAttivita.component.html',
    styleUrls: ['./gestioneAttivita.component.css'],
    providers: [AmbitoService, CommessaClienteService, FormBuilder, AuthenticationService, ClienteService, ConfirmationService],
    // encapsulation: ViewEncapsulation.None
})

export class GestioneAttivitaComponent implements OnInit {
    activities: Attivita[];
    newActivity: Attivita;
    commessaCliente: CommessaCliente[];
    headerAttivita: string;
    btnDialog: string;
    activityIndex: any;
    displayDialog: boolean;
    activityForm: FormGroup;
    formSubmitted: boolean = false;
    lst_clienti: SelectItem[] = [];
    lst_ambiti: SelectItem[] = [];
    lst_macro_aree: SelectItem[] = [];
    lst_commesse_clienti: SelectItem[] = [];
    lst_stati: SelectItem[] = [{ label: 'Aperto', value: 'OPEN' }, { label: 'In Verifica', value: 'CHECK' }, { label: 'Chiuso', value: 'CLOSE' }];

    constructor(private formBuilder: FormBuilder,
        private clienteService: ClienteService,
        private systemService: SystemService,
        private confirmationService: ConfirmationService,
        private commessaClienteService: CommessaClienteService,
        private attivitaService: AttivitaService,
        private ambitoService: AmbitoService) {

        this.newActivity = new Attivita();
        this.activities = new Array<Attivita>();

        this.activityForm = this.formBuilder.group({
            cliente: new FormControl('', Validators.required),
            ambito: new FormControl('', Validators.required),
            macro_area: new FormControl('', Validators.required),
            nome_attivita: new FormControl('', Validators.required),
            commessa_cliente: new FormControl('', Validators.required),
            cod_attivita: new FormControl('', Validators.required),
            stato: new FormControl('', Validators.required),
            data_inizio: new FormControl('', Validators.required),
            data_fine: new FormControl('', this.controlDateValidator),
        });
    }

    ngOnInit() {
        this.getInformations();
    }

    getInformations() {
        this.attivitaService.getAttivita().subscribe(attivita => {
            this.activities = attivita;
        });

        this.clienteService.getClienti().subscribe(clienti => {
            clienti.forEach(clienti => {
                this.lst_clienti.push({ label: clienti.nome_cliente, value: clienti._id });
            });
        });

        this.systemService.getAree().subscribe(aree => {
            aree.forEach(element => {
                this.lst_macro_aree.push({ label: element.label, value: element.value });
            });
        });
    }

    addNewActivity() {
        this.newActivity = new Attivita();
        this.formSubmitted = false;
        this.headerAttivita = "Aggiungi Attivita";
        this.btnDialog = "Aggiungi";
        this.activityIndex = null;
        this.displayDialog = true;
        this.activityForm.reset();
        this.newActivity.data_inizio_validita = new Date();
        this.newActivity.stato_attivita = this.lst_stati[0].value;
    }

    /*il form group non ha di per se un metodo per verificare se sul form è stato fatto il submit*/
    private checkForm(form) {
        this.formSubmitted = true;
        return form.valid;
    }

    saveNew() {
        if (this.activityIndex == null) { //aggiunta
            this.attivitaService.addAttivita(this.newActivity).subscribe(event => {
                this.activities.push(this.newActivity);
                this.activities = JSON.parse(JSON.stringify(this.activities)); //deepcopy
                this.changeFormatDate(this.activities);
            });
        }
        else { //modifica
            var selCriteria;
            selCriteria = new Object();
            selCriteria.codice_attivita = this.newActivity.codice_attivita;
            this.attivitaService.updateAttivita(this.newActivity, selCriteria).subscribe(event => {
                this.activities[this.activityIndex] = this.newActivity;
                this.activities = JSON.parse(JSON.stringify(this.activities)); //deepcopy
                this.changeFormatDate(this.activities);
            });
        }
        this.displayDialog = false;
    }

    private selectFromCliente(componentName) {
        var selCriteria;
        selCriteria = new Object();
        selCriteria.id_cliente = this.newActivity.id_cliente;
        switch (componentName) {
            case 'ambito':
                this.lst_ambiti = [];
                this.ambitoService.getAmbitoByCliente(selCriteria).subscribe(commesse => {
                    commesse.forEach(element => {
                      this.lst_ambiti.push({ label: element.nome_ambito, value: element._id });
                    });
                  })
                break;
            case 'commessa_cliente':
                this.lst_commesse_clienti = [];
                this.commessaClienteService.getCommessaByCliente(selCriteria).subscribe(commesse => {
                    commesse.forEach(element => {
                        this.lst_commesse_clienti.push({ label: element.nome_commessa, value: element._id });
                    });
                })
                break;
        }
    }

    private deleteRow(rowData, rowIndex) {
        var selCriteria;
        selCriteria = new Object();
        selCriteria.codice_attivita = rowData.codice_attivita;
        this.confirmationService.confirm({
            message: "Sei sicuro di voler eliminare l'attività '" + rowData.nome_attivita + "' ?",
            header: 'Elimina attività',
            icon: 'fa fa-trash',
            accept: () => {
                this.attivitaService.deleteAttivita(selCriteria).subscribe(event => {
                    this.activities.splice(rowIndex, 1);
                    this.activities = JSON.parse(JSON.stringify(this.activities)); //deepcopy
                    this.changeFormatDate(this.activities);
                });
            }
        });
    }


    private editRow(rowData, rowIndex) {
        this.newActivity = rowData;
        this.newActivity.data_inizio_validita = new Date(rowData.data_inizio_validita);
        this.newActivity.data_fine_validita = rowData.data_fine_validita != null ? new Date(rowData.data_fine_validita) : null;
        this.headerAttivita = "Modifica attività - " + this.newActivity.nome_attivita;
        this.btnDialog = "Modifica";
        this.activityIndex = rowIndex;
        this.displayDialog = true;
        this.formSubmitted = false;
    }

    private changeFormatDate(activities: Attivita[]) {
        activities.forEach(activity => {
            if (activity != null) {
                activity.data_inizio_validita = activity.data_inizio_validita != null ? new Date(activity.data_inizio_validita) : null;
                activity.data_fine_validita = activity.data_fine_validita != null ? new Date(activity.data_fine_validita) : null;
            }
        });
    }

    private getLabelFromValue(value, listName) {
        var label;
        switch (listName) {
            case 'ambito':
                if (this.lst_ambiti != null)
                    label = this.lst_ambiti.find(element => element.value == value).label;
                break;
            case 'macroarea':
                if (this.lst_macro_aree != null)
                    label = this.lst_macro_aree.find(element => element.value == value).label;
                break;
            case 'cliente':
                if (this.lst_clienti != null)
                    label = this.lst_clienti.find(element => element.value == value).label;
                break;
            case 'stato':
                if (this.lst_stati != null)
                    label = this.lst_stati.find(element => element.value == value).label;
                break;
        }
        return label;
    }

    private controlDateValidator(control: FormControl) {
        let dataInizio = control.root.value['data_inizio'] != null ? control.root.value['data_inizio'] : null;
        let dataFine = control.value;
        if (dataInizio > dataFine && dataFine != null) {
            return { controlDate: true }
        }
        return null;
    }

    private isDisabled(componentName): boolean {
        var disabled = false;

        switch (componentName) {
            case 'ambito': disabled = this.newActivity.id_cliente == null;
                break;
            case 'macroArea': disabled = this.newActivity.id_cliente == null;
                break;
            case 'commessaCliente': disabled = this.newActivity.id_cliente == null || this.newActivity.id_macro_area == null;
                break;
        }

        return disabled;
    }

    private isValid(componentName: string) {
        if ((this.activityForm.get(componentName).touched || this.formSubmitted) && this.activityForm.get(componentName).errors)
            return "#a94442";
        else
            return "#898989"; //#d6d6d6
    }
}