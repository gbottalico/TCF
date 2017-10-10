import { Component, OnChanges, Input, OnInit, AfterViewChecked } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { Consuntivo } from '../../../model/consuntivo';
import { User } from '../../../model/user';
import { ConsuntivazioneService } from '../../../service/consuntivazione.service';
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

  settings: any = {};
  userDays: [Consuntivo];


  data = [];

  source: LocalDataSource;

  static FRONT_COLUMNS_COUNT = 1; // mi rappresentano le colonne iniziali che non fanno parte dei gironi del mese
  nDays: number;
  beforeOnInit : boolean = true;

  activityList = [];

  testCoulmnsCount: number =5;

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
    this.settings.add = {};
    this.settings.add.addButtonContent = 'Aggiungi';
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

    this.settings.columns[0] = {};
    this.settings.columns[0].title = 'Attività';
    this.settings.columns[0].width = '100px';
    this.settings.columns[0].filter = {
      type: 'list',
      config: {
        selectText: 'Select...',
        list: this.activityList
      }
    };
    this.settings.columns[0].editor = {
      type: 'list',
      config: {
        selectText: 'Select...',
        list: this.activityList
      }
    }


    var i = MonthGridComponent.FRONT_COLUMNS_COUNT;

    while (i < this.nDays + MonthGridComponent.FRONT_COLUMNS_COUNT) {
      this.settings.columns[i] = {};
      this.settings.columns[i].title = ((i-MonthGridComponent.FRONT_COLUMNS_COUNT)+1);
      //this.settings.columns[i].width = '30px';
      this.settings.columns[i].sort = false;
      this.settings.columns[i].filter = false; // pare non funzionare
      //this.settings.columns[i].editable = true;

      //  if(i == 3){
      //    this.settings.columns[i].editable = false; //funziona solo in modifica non in inserimento
      //    this.settings.columns[i].width = '5px';
      //  }

      i++;
    }


  }

  ngOnChanges() {

    if(this.beforeOnInit){
      this.nDays = this.daysInMonth(this.monthSelected, this.yearSelected);
    }

    this.data = this.getTestBasicTable();
    

    var userDays = this.getSomeTestLocalData();
    // this.consuntivazioneService
    //                     .getMeseConsuntivoCliente(this.userSelected, this.monthSelected, this.yearSelected)
    //                     .subscribe(userDays => { this.userDays = userDays }); 

    this.data = this.buildData(userDays, this.nDays);

    this.activityList = [
      { value: 'a1', title: 'Attività 1' },
      { value: 'a2', title: 'Attività 2' },
      { value: 'a3', title: 'Attività 3' },
    ]

    this.source.load(this.data);
  }

  ngAfterViewChecked(){
    $( "tr[ng-reflect-create-confirm] td" ).css("padding", ".2em 0em");
    $( "tr[ng-reflect-create-confirm] input" ).removeAttr('placeholder');
  }


  buildData(_userDays: Consuntivo[], _days: number): any[] {
    //costruisce il JSON con le colonne del calendario posizionando i valori recuperati nelle corrette posizioni

    //ordino la _userDays per attività, data.

    const consuntivoComparator_AttivitaData = function (a: Consuntivo, b: Consuntivo): number {

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
    for (let current_cons of _userDays) {
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
      row[0] = _userDays[userDaysIndex].id_attivita; //nella prima colonna ci va l'attività;

      for (let j = 0; j < _days; j++) {

        let consuntivoDayOfMonth = -1;
        if (userDaysIndex < _userDays.length) {
          let consuntivoDateFull = _userDays[userDaysIndex].data_consuntivo;
          consuntivoDayOfMonth = consuntivoDateFull.getDate();
        } else {
          consuntivoDayOfMonth = -1;
        }

        if ((j + 1) == consuntivoDayOfMonth) { //aggiungo 1 visto che l'indice parte da 0;
          row[j + MonthGridComponent.FRONT_COLUMNS_COUNT] = _userDays[userDaysIndex].ore;
          userDaysIndex++; //scorro la slista, potrei fare un pop dalla testa.
        } else {
          row[j + MonthGridComponent.FRONT_COLUMNS_COUNT] = 0;
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
    let newRow: Consuntivo = event.newData;
    this.consuntivazioneService
      .addConsuntivo(newRow)
      .subscribe(userDays => {
        alert('Riga inserita..');
        this.userDays = userDays;
        event.confirm.resolve();
        },
        err => alert(err)
      );

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

  //TEST ___________________________________________________________________________________________

  private getTestBasicTable(): any[] {
     var rowCount = 1;
     var rowsCollection: any[] = new Array(rowCount);
    for(let j = 0; j <rowCount; j++){
      var row = new Object();
      for(let i = 0; i< this.nDays; i++){
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
        var d = new Date();
        d.setDate(15);
        c1.data_consuntivo = d;
        c1.ore = 4;
        dataCollection.push(c1);
    
        c1 = new Consuntivo();
        c1.id_attivita = 'a2';
        var d = new Date();
        d.setDate(1);
        c1.data_consuntivo = d;
        c1.ore = 4;
        dataCollection.push(c1);
    
        c1 = new Consuntivo();
        c1.id_attivita = 'a1';
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

  //    this.settings.columns[0] = {};
  //    this.settings.columns[0].title = 'attività';    
  //    this.settings.columns[0].width = '50px';
  //    this.settings.columns[0].filter = {
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
