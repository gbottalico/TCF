import { Component, OnChanges, Input } from '@angular/core';

import { Consuntivo } from '../../../model/consuntivo';
import { User } from '../../../model/user';
import { ConsuntivazioneService } from '../../../service/consuntivazione.service';


@Component({
  selector: 'month-grid',
  templateUrl: './monthGrid.component.html',
  styleUrls: ['./monthGrid.component.css'],
  providers: []
})

export class MonthGridComponent implements OnChanges {


  @Input()
  monthSelected: number = 1;
  @Input()
  yearSelected: number = 2017;
  @Input()
  userSelected: User;

  settings: any = {};
  userDays: [Consuntivo];
  data = [];
  loading: boolean;
  cols: any[];

  static FRONT_COLUMNS_COUNT = 1; // mi rappresentano le colonne iniziali che non fanno parte dei gironi del mese
  nDays: number;
  beforeOnInit : boolean = true;

  activityList = [];

  testCoulmnsCount: number = 5;

  constructor(private consuntivazioneService: ConsuntivazioneService) {
    
  }

  ngOnChanges() {

    if(this.beforeOnInit){
      this.nDays = this.daysInMonth(this.monthSelected, this.yearSelected);
    }
    this.initializeColumns();

    var userDays = this.getSomeTestLocalData();
    
   

    this.activityList = [
      { value: 'a1', title: 'Attività 1' },
      { value: 'a2', title: 'Attività 2' },
      { value: 'a3', title: 'Attività 3' },
    ];

    this.loading = true;
    
    setTimeout(() => {
        //this.carService.getCarsSmall().then(cars => this.cars = cars);
        this.data = this.buildData(userDays, this.nDays);
        this.loading = false;
    }, 1000);
    


    //this.source.load(this.data);
  }




  private buildData(_userDays: Consuntivo[], _days: number): any[] {
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

  private daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  private createRow(event) {
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

  private deleteRow(event) {
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

  private initializeColumns(){
 
    this.cols = new Array(this.nDays + MonthGridComponent.FRONT_COLUMNS_COUNT);
    this.cols[0] = {};
    this.cols[0].field = 'Attività';
    this.cols[0].header = 'Attività';

    var i = MonthGridComponent.FRONT_COLUMNS_COUNT;

    while (i < this.nDays + MonthGridComponent.FRONT_COLUMNS_COUNT) {
      this.cols[i] = {};
      this.cols[i].field = ((i-MonthGridComponent.FRONT_COLUMNS_COUNT)+1);
      this.cols[i].header = ((i-MonthGridComponent.FRONT_COLUMNS_COUNT)+1);
              
      i++;
    }
  } 


}
