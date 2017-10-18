import { Component, OnChanges, Input, OnInit, AfterViewChecked, EventEmitter, Output } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { Consuntivo } from '../../../model/consuntivo';
import { User } from '../../../model/user';
import { ConsuntivazioneService } from '../../../service/consuntivazione.service';
import { CustomRenderComponent } from './customRender/customRender.component';
import { CustomEditorComponent } from './customEditor/customEditor.component';
import * as $ from 'jquery';
import 'jquery-ui';
import 'jquery-easing';

@Component({
  selector: 'month-grid',
  templateUrl: './monthGrid.component.html',
  styleUrls: ['./monthGrid.component.css'],
  providers: []
})

export class MonthGridComponent implements OnInit, OnChanges {


  @Input()
  monthSelected: number = 1;
  @Input()
  yearSelected: number = 2017;
  @Input()
  userSelected: User;
  @Output() 
  backToMonthEvent = new EventEmitter();
  @Input()
  yearSelection : boolean;
  
  settings: any = {};
  userDays: [Consuntivo];


  data = [];

  source: LocalDataSource;

  static FRONT_COLUMNS_COUNT: number = 2; // mi rappresentano le colonne iniziali che non fanno parte dei gironi del mese
  static FRONT_COLUMNS_IDX = {
    COMMESSA: 2,
    ATTIVITA: 0,
    DELIVERABLE: 1
  }

  nDays: number;
  beforeOnInit: boolean = true;

  activityList = [];
  deliverableList = [];

  testCoulmnsCount: number = 5;

  constructor(private consuntivazioneService: ConsuntivazioneService) {
    this.source = new LocalDataSource(this.data);
  }

  ngOnInit() {

    this.beforeOnInit = false;

    this.settings = {};

    this.settings.mode = 'inline';
    this.settings.actions = {};
    this.settings.actions.columnTitle = '';
    this.settings.edit = {};
    this.settings.edit.editButtonContent = 'Modifica';
    this.settings.edit.saveButtonContent = "Salva";
    this.settings.edit.cancelButtonContent = "Annulla";
    this.settings.edit.confirmSave = true;
    this.settings.add = {};
    this.settings.add.addButtonContent = 'Aggiungi';
    this.settings.add.createButtonContent = 'Crea';
    this.settings.add.cancelButtonContent = 'Annulla';
    this.settings.add.confirmCreate = true;
    this.settings.delete = {};
    this.settings.delete.deleteButtonContent = 'Elimina';
    this.settings.delete.confirmDelete = true;



    //TEST
    // this.settings.columns = new Array(this.testCoulmnsCount);
    // for(let j =0 ;j< this.testCoulmnsCount; j++){
    //   this.settings.columns[j] = {}
    //   this.settings.columns[j].title = 'd' +(j+1);

    // }


    this.settings.columns = new Array(this.nDays + MonthGridComponent.FRONT_COLUMNS_COUNT);

    //COLONNA ATTIVITA
    this.settings.columns[MonthGridComponent.FRONT_COLUMNS_IDX.ATTIVITA] = {};
    this.settings.columns[MonthGridComponent.FRONT_COLUMNS_IDX.ATTIVITA].title = 'Attività';
    this.settings.columns[MonthGridComponent.FRONT_COLUMNS_IDX.ATTIVITA].width = '100px';
    this.settings.columns[MonthGridComponent.FRONT_COLUMNS_IDX.ATTIVITA].filter = {
      type: 'list',
      config: {
        selectText: 'Select...',
        list: this.activityList
      }
    };
    this.settings.columns[MonthGridComponent.FRONT_COLUMNS_IDX.ATTIVITA].editor = {
      type: 'list',
      config: {
        selectText: 'Select...',
        list: this.activityList
      }
    }

    //COLONNA DELIVERABLE
    this.settings.columns[MonthGridComponent.FRONT_COLUMNS_IDX.DELIVERABLE] = {};
    this.settings.columns[MonthGridComponent.FRONT_COLUMNS_IDX.DELIVERABLE].title = 'Deliverable';
    this.settings.columns[MonthGridComponent.FRONT_COLUMNS_IDX.DELIVERABLE].width = '100px';
    this.settings.columns[MonthGridComponent.FRONT_COLUMNS_IDX.DELIVERABLE].class = 'xxxx'
    this.settings.columns[MonthGridComponent.FRONT_COLUMNS_IDX.DELIVERABLE].filter = {
      type: 'list',
      config: {
        selectText: 'Select...',
        list: this.deliverableList
      }
    };
    this.settings.columns[MonthGridComponent.FRONT_COLUMNS_IDX.DELIVERABLE].editor = {
      type: 'list',
      config: {
        selectText: 'Select...',
        list: this.deliverableList
      }
    }


    var i = MonthGridComponent.FRONT_COLUMNS_COUNT;

    while (i < this.nDays + MonthGridComponent.FRONT_COLUMNS_COUNT) {
      this.settings.columns[i] = {};
      this.settings.columns[i].title = ((i - MonthGridComponent.FRONT_COLUMNS_COUNT) + 1);
      //this.settings.columns[i].width = '30px';
      this.settings.columns[i].sort = false;
      this.settings.columns[i].filter = false;
      this.settings.columns[i].type = 'custom';
      this.settings.columns[i].renderComponent= CustomRenderComponent;
      this.settings.columns[i].editor = {};
      this.settings.columns[i].editor.type = 'custom';
      this.settings.columns[i].editor.component = CustomEditorComponent;
      //this.settings.columns[i].editable = true;

      //  if(i == 3){
      //    this.settings.columns[i].editable = false; //funziona solo in modifica non in inserimento
      //    this.settings.columns[i].width = '5px';
      //  }

      i++;
    }


  }

  ngOnChanges() {

    if (this.beforeOnInit) {
      this.nDays = this.daysInMonth(this.monthSelected, this.yearSelected);
    }
    //this.data = this.getTestBasicTable();
    if(this.yearSelection)
      $('.attivitaTable').hide();
    else if(!$('.attivitaTable').is(":visible"))
      $('.attivitaTable').show();

    //var userDays = this.getSomeTestLocalData();
    this.consuntivazioneService
      .getMeseConsuntivoCliente(this.userSelected._id, this.monthSelected, this.yearSelected)
      .subscribe(userDays => {
        this.userDays = userDays;
        this.data = this.buildData(this.userDays, this.nDays);
        alert('load');
        this.source.load(this.data);
      });



    this.activityList = [
      { value: '1', title: 'Attività 1' },
      { value: '2', title: 'Attività 2' },
      { value: '3', title: 'Attività 3' },
    ];

    this.deliverableList = [
      { value: '1', title: 'Deliverable 1' },
      { value: '2', title: 'Deliverable 2' },
      { value: '3', title: 'Deliverable 3' },
    ]


  }

  ngAfterViewChecked() {
    $("tr[ng-reflect-create-confirm] td").css("padding", ".2em 0em");
    $("tr[ng-reflect-create-confirm] input").removeAttr('placeholder');
  }


  buildData(_userDays: any[], _days: number): any[] {
    //costruisce il JSON con le colonne del calendario posizionando i valori recuperati nelle corrette posizioni

    //ordino la _userDays per attività, data.
    alert('build_data');

    const consuntivoComparator_AttivitaData = function (a_: any, b_: any): number {

      var a = a_.doc;
      var b = b_.doc;

      if (a.id_attivita == b.id_attivita) {
        return a.data_consuntivo > b.data_consuntivo ? 1 : a.data_consuntivo < b.data_consuntivo ? -1 : 0;
      }

      return a.id_attivita > b.id_attivita ? 1 : -1;
    }

    _userDays.sort(consuntivoComparator_AttivitaData);

    //return [{1: '1'}];

    var rowCount: number = 0;
    var last: Consuntivo;
    //conto il numero di attività (righe della tabella) --> come fare un distinct su id_attivita
    for (let xxx of _userDays) {
      let current_cons = xxx.doc;
      if (!last) {
        //primo elemento;
        last = current_cons;
        rowCount++;
        continue;
      }

      if (current_cons.id_attivita != last.id_attivita) {
        rowCount++;
      } else {
        last = current_cons;
      }
    }

    var userDaysIndex: number = 0;

    var rowsCollection: any[] = new Array(rowCount);
    var row: any;

    for (let i = 0; i < rowCount; i++) {

      row = new Object();
      row[MonthGridComponent.FRONT_COLUMNS_IDX.ATTIVITA] = _userDays[userDaysIndex].doc.id_attivita; //nella prima colonna ci va l'attività;
      row[MonthGridComponent.FRONT_COLUMNS_IDX.DELIVERABLE] = _userDays[userDaysIndex].doc.id_tipo_deliverable;

      for (let j = 0; j < _days; j++) {

        let consuntivoDayOfMonth = -1;
        if (userDaysIndex < _userDays.length) {
          let consuntivoDateFull = _userDays[userDaysIndex].doc.data_consuntivo;
          consuntivoDayOfMonth = new Date(consuntivoDateFull).getUTCDate();
        } else {
          consuntivoDayOfMonth = -1;
        }

        if ((j + 1) == consuntivoDayOfMonth) { //aggiungo 1 visto che l'indice parte da 0;
          row[j + MonthGridComponent.FRONT_COLUMNS_COUNT] = {"id":_userDays[userDaysIndex].doc.ore , "ore":_userDays[userDaysIndex].doc.ore};
          userDaysIndex++; //scorro la slista, potrei fare un pop dalla testa.
        } else {
          row[j + MonthGridComponent.FRONT_COLUMNS_COUNT] = {"id":undefined , "ore":0};
        }
      }
      rowsCollection[i] = row;
    }

    return rowsCollection;


  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  createRow(event) {
    alert('Sto inserendo una nuova riga..');
    let newRow: any = event.newData;
    var attivita = newRow[MonthGridComponent.FRONT_COLUMNS_IDX.ATTIVITA];
    var deliverable = newRow[MonthGridComponent.FRONT_COLUMNS_IDX.DELIVERABLE];

    var consuntiviToAdd: Consuntivo[] = new Array<Consuntivo>();

    for (var key in newRow) {
      if (newRow.hasOwnProperty(key)) {
        if (parseInt(key) < MonthGridComponent.FRONT_COLUMNS_COUNT) {
          continue;
        } else {
          var valueInserted: number = 0;
          try {
            valueInserted = newRow[key];
          } catch (error) {
          }

          if (valueInserted > 0) {

            let dayOfMonth = (parseInt(key) - MonthGridComponent.FRONT_COLUMNS_COUNT) + 1;
            let dateOfConsuntivo = new Date();
            dateOfConsuntivo.setDate(dayOfMonth);
            dateOfConsuntivo.setMonth(this.monthSelected);
            dateOfConsuntivo.setFullYear(this.yearSelected);

            let newConsuntivo: Consuntivo = new Consuntivo();
            newConsuntivo.data_consuntivo = dateOfConsuntivo;
            newConsuntivo.id_utente = this.userSelected._id;
            newConsuntivo.nome_utente = this.userSelected.nome;
            newConsuntivo.id_ambito = 1;
            newConsuntivo.nome_ambito = "Financial Service";
            newConsuntivo.id_macro_area = '1';
            newConsuntivo.nome_macro_area = "Insurance";
            newConsuntivo.id_attivita = attivita;
            newConsuntivo.nome_attivita = "Attività" + attivita;
            newConsuntivo.id_tipo_deliverable = deliverable;
            newConsuntivo.nome_tipo_deliverable = "Analisi";
            newConsuntivo.note = "prove note";
            newConsuntivo.ore = valueInserted;

            consuntiviToAdd.push(newConsuntivo);

          }
        }
      }
    }

    if (consuntiviToAdd.length > 0) {
      this.consuntivazioneService
        .addConsuntivi(consuntiviToAdd)
        .subscribe(userDays => {
          alert('Riga inserita..');
          this.userDays = userDays;
          event.confirm.resolve();
        },
        err => alert(err)
        );
    } else {
      alert("Nussun dato inserito");
    }

  }

  modifyRow(event) {
    alert('Sto modificando una nuova riga.. TODO');
    let originalRow: any = event.data;
    let modifiedRow: any = event.newData;
    var attivita = modifiedRow[MonthGridComponent.FRONT_COLUMNS_IDX.ATTIVITA];
    var deliverable = modifiedRow[MonthGridComponent.FRONT_COLUMNS_IDX.DELIVERABLE];

  }

  deleteRow(event) {
    alert('Sto eliminando una nuova riga..');
    let newRow: Consuntivo = event.data;
    this.consuntivazioneService
      .deleteConsuntivo(newRow)
      .subscribe(userDays => {
        alert('Riga eliminata..');
        this.userDays = userDays;
        event.confirm.resolve();
      },
      err => alert(err)
      );

  }

  /*Gestione pulsante "Indietro" sopra la griglia"*/
  backToMonth(){
    $('.attivitaTable').hide();
    this.backToMonthEvent.emit(); 
  }

  //TEST ___________________________________________________________________________________________

  private getTestBasicTable(): any[] {
    var rowCount = 1;
    var rowsCollection: any[] = new Array(rowCount);
    for (let j = 0; j < rowCount; j++) {
      var row = new Object();
      for (let i = 0; i < this.nDays; i++) {
        row[i] = 1;

      }
      rowsCollection.push(row);
    }

    return rowsCollection;
  }

  private getSomeTestLocalData(): Array<Consuntivo> {

    let dataCollection = new Array()

    var c1: Consuntivo = new Consuntivo();
    c1.id_attivita = 'a1';
    c1.id_tipo_deliverable = 'd1';
    var d = new Date();
    d.setDate(15);
    c1.data_consuntivo = d;
    c1.ore = 4;
    dataCollection.push(c1);

    c1 = new Consuntivo();
    c1.id_attivita = 'a2';
    c1.id_tipo_deliverable = 'd1';
    var d = new Date();
    d.setDate(1);
    c1.data_consuntivo = d;
    c1.ore = 4;
    dataCollection.push(c1);

    c1 = new Consuntivo();
    c1.id_attivita = 'a1';
    c1.id_tipo_deliverable = 'd1';
    var d = new Date();
    d.setDate(8);
    c1.data_consuntivo = d;
    c1.ore = 4;
    dataCollection.push(c1);

    return dataCollection;
  }


  // ngOnChanges(): void {

  //   this.settings = {};
  //    /* General configuration*/
  //    this.settings.mode = 'external';
  //    this.settings.actions = {};
  //    this.settings.actions.columnTitle = '';
  //    this.settings.edit = {};
  //    this.settings.edit.editButtonContent = 'Modifica';
  //    this.settings.add = {};
  //    this.settings.add.addButtonContent = 'Aggiungi';

  //    alert(this.monthSelected); 
  //    /* Specific Month configuration */
  //    var nDays = this.daysInMonth(this.monthSelected, this.yearSelected);


  //    this.settings.columns = new Array(nDays+MonthGridComponent.FRONT_COLUMNS_COUNT);

  //    this.settings.columns[MonthGridComponent.FRONT_COLUMNS_IDX.ATTIVITA] = {};
  //    this.settings.columns[MonthGridComponent.FRONT_COLUMNS_IDX.ATTIVITA].title = 'attività';    
  //    this.settings.columns[MonthGridComponent.FRONT_COLUMNS_IDX.ATTIVITA].width = '50px';
  //    this.settings.columns[MonthGridComponent.FRONT_COLUMNS_IDX.ATTIVITA].filter = {
  //     type: 'list',
  //     config: {
  //       selectText: 'Select...',
  //       list: [
  //         { value: 'a1', title: 'Attività 1' },
  //         { value: 'a2', title: 'Attività 2' },
  //         { value: 'a3', title: 'Attività 3' },
  //       ],
  //     },
  //   };


  //    var i = MonthGridComponent.FRONT_COLUMNS_COUNT;

  //    while (i < nDays + MonthGridComponent.FRONT_COLUMNS_COUNT){
  //      this.settings.columns[i] = {};      
  //      this.settings.columns[i].title = (i);
  //      this.settings.columns[i].width = '10px';
  //      this.settings.columns[i].sort = false;
  //      this.settings.columns[i].editable = true;

  //     //  if(i == 3){
  //     //    this.settings.columns[i].editable = false; //funziona solo in modifica non in inserimento
  //     //    this.settings.columns[i].width = '5px';
  //     //  }

  //      i++;
  //    }

  //    var userDays = this.getSomeTestLocalData();

  //    /*this.consuntivazioneService
  //                    .getMeseConsuntivoCliente(this.userSelected, this.monthSelected, this.yearSelected)
  //                    .subscribe(userDays => { this.userDays = userDays }); */




  //    this.data = this.buildData(userDays, nDays); 
  //    //this.source = new LocalDataSource(this.data); 
  //    this.source.load(this.data);

  // }


}
