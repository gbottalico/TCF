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


  displayDialog: boolean;
  settings: any = {};
  userDays: [Consuntivo];
  consuntivi: any;
  loading: boolean;
  cols: any[];


  nDays: number;
  beforeOnInit: boolean = true;

  newConsuntivo: any;


  constructor(private consuntivazioneService: ConsuntivazioneService) {
    this.newConsuntivo = new Object();

    this.newConsuntivo.client = '';
    this.newConsuntivo.ambito = '';
    this.newConsuntivo.area = '';
    this.newConsuntivo.activity = '';
    this.newConsuntivo.deliverable = '';
    this.newConsuntivo.isEditable = false;

  }

  ngOnChanges() {

    if (this.beforeOnInit) {
      this.nDays = this.daysInMonth(this.monthSelected, this.yearSelected);
    }
    this.initializeColumns();

    this.loading = true;

    setTimeout(() => {
      this.consuntivazioneService
        .getMeseConsuntivoUtente(this.userSelected._id, this.monthSelected, this.yearSelected)
        .subscribe(userDays => {
          this.userDays = userDays;
          this.consuntivi = this.buildData(this.userDays, this.nDays);
        });
      this.loading = false;
    }, 1000);

  }


  //GRID - LOAD
  private initializeColumns() {

    this.cols = new Array(this.nDays);

    var i = 0;

    while (i < this.nDays) {
      this.cols[i] = {};
      this.cols[i].field = (i).toString();
      this.cols[i].header = ((i) + 1).toString();
      this.cols[i].isFrozen = false;
      i++;
    }
  }


  //costruisce il JSON con le colonne del calendario posizionando i valori recuperati nelle corrette posizioni
  private buildData(_userDays: Consuntivo[], _days: number): any[] {

    //ordino la _userDays per attività, data.

    const consuntivoComparator_AttivitaData = function (a: Consuntivo, b: Consuntivo): number {

      if (a.id_attivita == b.id_attivita) {
        return a.data_consuntivo > b.data_consuntivo ? 1 : a.data_consuntivo < b.data_consuntivo ? -1 : 0;
      }

      return a.id_attivita > b.id_attivita ? 1 : -1;
    }

    _userDays.sort(consuntivoComparator_AttivitaData);


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
      row.isEditable = false;
      row.client = 'STATICO';//_userDays[userDaysIndex].id_cliente;
      row.ambito = _userDays[userDaysIndex].nome_ambito;
      row.area = _userDays[userDaysIndex].nome_macro_area;
      row.activity = _userDays[userDaysIndex].nome_attivita;
      row.deliverable = _userDays[userDaysIndex].nome_tipo_deliverable;

      //ciclo sulle colonne
      for (let j = 0; j < _days; j++) {

        let consuntivoDayOfMonth = -1;

        if (userDaysIndex < _userDays.length) {
          let consuntivoDateFull = _userDays[userDaysIndex].data_consuntivo;
          consuntivoDayOfMonth = new Date(consuntivoDateFull).getUTCDate();
        } else {
          consuntivoDayOfMonth = -1;
        }

        if ((j + 1) == consuntivoDayOfMonth) { //aggiungo 1 visto che l'indice parte da 0;

          row[j] = _userDays[userDaysIndex].ore;
          userDaysIndex++; //scorro la lista, potrei fare un pop dalla testa.
        } else {
          row[j] = 0;
        }
      }
      rowsCollection[i] = row;
    }

    return rowsCollection;

  }


  //GRID - ACTION

  //NEW ROW
  showDialogToAdd() {

    this.newConsuntivo.client = '';
    this.newConsuntivo.ambito = '';
    this.newConsuntivo.area = '';
    this.newConsuntivo.activity = '';
    this.newConsuntivo.deliverable = '';
    this.displayDialog = true;

  }



  //SAVE NEW ROW
  private saveNew() {
    //Inserisco solo il primo giorno a0 per effettuare lo store su DB 
    for (let i = 0; i < this.nDays; i++) {
      this.newConsuntivo[i]=0;
    }
    
    this.consuntivi = this.consuntivi.concat(this.newConsuntivo);
    this.displayDialog = false;

  }

  //EDIT ROW (INLINE)
  private edit(r,i) {
    console.log(r);
    this.CloseAllEditable();
    r.isEditable = true;
  }
  private CloseAllEditable() {
    for (let item of this.consuntivi) {
      if (item.isEditable) {
        item.isEditable = false;
      }
    }
  }

  //SAVE ROW (INLINE)
  private saveEdit(r,i) {
    //TODO: logica di salvataggio dei nuovi dati di row
    r.isEditable = false;
  }

  private abortEdit(r,i) {
    //TODO: logica di annullo modifiche
    r.isEditable = false;
  }

  //DELETE ROW
  private delete(r, i) {
    alert('Sto eliminando la riga..');
    let delRow: Consuntivo = r;
    this.consuntivazioneService
      .deleteConsuntivo(delRow)
      .subscribe(userDays => {
        alert('Riga eliminata..');
        this.userDays = userDays;
      },
      err => alert(err)
      );

  }



  //UTILITY
  private daysInMonth(month, year) {
    return new Date(year, month, 0).getUTCDate();
  }



}
