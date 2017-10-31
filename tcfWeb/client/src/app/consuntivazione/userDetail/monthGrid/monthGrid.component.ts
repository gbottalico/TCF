import { Component, OnChanges, Input, Inject } from '@angular/core';

import { Consuntivo } from '../../../model/consuntivo';
import { User } from '../../../model/user';
import { ConsuntivazioneService } from '../../../service/consuntivazione.service';
import { SystemService } from '../../../service/system.service';
import { AttivitaService } from '../../../service/attivita.service';
import { SelectItem } from 'primeng/primeng';

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

  newRowConsuntivo: any;
  blankConsuntivo: Consuntivo;
  

  lst_clienti: SelectItem[];
  lst_ambiti: SelectItem[];
  lst_aree: SelectItem[];
  lst_attivita: SelectItem[];
  lst_deliverable: SelectItem[];


  constructor(
    private consuntivazioneService: ConsuntivazioneService,
    private attivitaService: AttivitaService,
    private systemService: SystemService) {
    
    this.newRowConsuntivo = new Object();
    this.blankConsuntivo = new Consuntivo()
    this.resetConsuntivo(this.newRowConsuntivo);
    
    //POPOLAMENTO LISTE
    //this.clientiService.().subscribe(domain=>{this.lst_clienti=domain});
    this.lst_attivita = new Array<SelectItem>();
    this.attivitaService.getAttivita().subscribe(attivitas => {
      attivitas.forEach((item, index) => {
        this.lst_attivita.push({ label: item.nome_attivita, value: item._id });
      });

    });

    this.systemService.getTipiDeliverable().subscribe(domain => {
      this.lst_deliverable = domain;
    });

    this.systemService.getAree().subscribe(domain => {
      this.lst_aree = domain;
    });

    this.systemService.getAmbiti().subscribe(domain => {
      this.lst_ambiti = domain;
    });


  }


  ngOnChanges() {


    if (this.beforeOnInit) {
      this.nDays = this.daysInMonth(this.monthSelected, this.yearSelected);
      //this.consuntivi = null;
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

  //Inizializzazione header colonne dinamiche (giorni del mese)
  private initializeColumns() {
    this.consuntivi = null;
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

      row.id_cliente = _userDays[userDaysIndex].id_cliente;
      row.nome_cliente = _userDays[userDaysIndex].nome_cliente;
      row.id_ambito = _userDays[userDaysIndex].id_ambito;
      row.nome_ambito = _userDays[userDaysIndex].nome_ambito;
      row.id_macro_area = _userDays[userDaysIndex].id_macro_area;
      row.nome_macro_area = _userDays[userDaysIndex].nome_macro_area;
      row.id_attivita = _userDays[userDaysIndex].id_attivita;
      row.nome_attivita = _userDays[userDaysIndex].nome_attivita;
      row.id_tipo_deliverable = _userDays[userDaysIndex].id_tipo_deliverable;
      row.nome_tipo_deliverable = _userDays[userDaysIndex].nome_tipo_deliverable;
      row.id_utente = this.userSelected._id;
      row.isEditable = false;

      this.cloneConsuntivoField(row, this.blankConsuntivo);
      this.blankConsuntivo.ore = 0;
      

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

          row[j] = _userDays[userDaysIndex];
          userDaysIndex++; //scorro la lista, potrei fare un pop dalla testa.
        } else {
          var blankItem = JSON.parse(JSON.stringify(this.blankConsuntivo));
          blankItem.data_consuntivo = new Date(this.yearSelected, this.monthSelected-1, j+1 ,0, 0, 0, 0);
          
          row[j] = blankItem;
        }
      }
      rowsCollection[i] = row;
    }

    console.log(rowsCollection);
    return rowsCollection;

  }


  //GRID - ACTION

  //NEW ROW
  private showDialogToAdd() {
    //Inizializzazione dei parametri di input
    this.resetConsuntivo(this.newRowConsuntivo);
    this.newRowConsuntivo.id_utente = this.userSelected._id;
    
    this.displayDialog = true;

  }

  private abortNew() {
    this.displayDialog = false;
  }

  //SAVE NEW ROW
  private saveNew() {
    //Inserisco solo il primo giorno 0 per effettuare lo store dell'activity su DB 
    
    this.newRowConsuntivo.nome_cliente = this.lst_clienti.find(x=> x.value == this.newRowConsuntivo.id_cliente).label ;
    this.newRowConsuntivo.nome_ambito = this.lst_ambiti.find(x=> x.value == this.newRowConsuntivo.id_ambito).label ;
    this.newRowConsuntivo.nome_macro_area = this.lst_aree.find(x=> x.value == this.newRowConsuntivo.id_macro_area).label ;
    this.newRowConsuntivo.nome_attivita = this.lst_attivita.find(x=> x.value == this.newRowConsuntivo.id_attivita).label ;
    this.newRowConsuntivo.nome_deliverable = this.lst_deliverable.find(x=> x.value == this.newRowConsuntivo.id_tipo_deliverable).label ;
    
    this.consuntivazioneService.addConsuntivo(this.newRowConsuntivo).subscribe
      (obj => {
        var newCons: any = JSON.parse(JSON.stringify(obj));

        //inizializzo la nuova riga con 0 ore su tutti i gg 
        this.cloneConsuntivoField(this.newRowConsuntivo, this.blankConsuntivo);
        this.blankConsuntivo.ore = 0;
        this.blankConsuntivo.data_consuntivo = new Date(this.yearSelected, this.monthSelected - 1, 1 ,0, 0, 0, 0);
        //inizializzo la table
        for (let i = 0; i < this.nDays; i++) {
          var blankItem = JSON.parse(JSON.stringify(this.blankConsuntivo));  
          blankItem.data_consuntivo = new Date(this.yearSelected, this.monthSelected - 1, i + 1 ,0, 0, 0, 0);
          newCons[i] = blankItem;
        }
        //var deepCopyObj = JSON.parse(JSON.stringify(this.newConsuntivo));
        this.consuntivi = this.consuntivi.concat(newCons);
        this.displayDialog = false;
      },
      err=>{
        alert(err);
      }
    );

  }


  //EDIT ROW (INLINE)
  private edit(r, i) {
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
  private saveEdit(editRowConsuntivo, index) {
    //editRowConsuntivo.nome_cliente = this.lst_clienti.find(x=> x.value == editRowConsuntivo.id_cliente).label ;
    //editRowConsuntivo.nome_ambito = this.lst_ambiti.find(x=> x.value == editRowConsuntivo.id_ambito).label ;
    //editRowConsuntivo.nome_macro_area = this.lst_aree.find(x=> x.value == editRowConsuntivo.id_macro_area).label ;
    editRowConsuntivo.nome_attivita = this.lst_attivita.find(x=> x.value == editRowConsuntivo.id_attivita).label ;
    editRowConsuntivo.nome_deliverable = this.lst_deliverable.find(x=> x.value == editRowConsuntivo.id_tipo_deliverable).label ;
   
    var consuntiviToAdd: Consuntivo[] = new Array<Consuntivo>();

    for (let i = 0; i < this.nDays; i++) {
      if (editRowConsuntivo[i]._id != null || editRowConsuntivo[i].ore > 0) {
        consuntiviToAdd.push(editRowConsuntivo[i]);
      }
    }
      if (consuntiviToAdd.length > 0) {
        this.consuntivazioneService
          .addUpdateConsuntivi(consuntiviToAdd)
          .subscribe(msg => {
            alert(msg.body);            
          },
          err => alert(err)
          );
      }
      editRowConsuntivo.isEditable = false;    
  }

  private abortEdit(r, i) {
    //TODO: logica di annullo modifiche (annullo modifiche parziali e ripristino riga precedente)
    r.isEditable = false;
  }

  //DELETE ROW
  private delete(r, i) {
    
    var delCriteria;
    delCriteria = new Object();
    delCriteria.id_utente= r.id_utente;
    delCriteria.id_macro_area= r.id_macro_area;
    delCriteria.id_ambito= r.id_ambito;
    delCriteria.id_attivita= r.id_attivita;
    delCriteria.id_tipo_deliverable= r.id_tipo_deliverable;

    this.consuntivazioneService
      //.deleteConsuntivi(r.id_user, r.id_macro_area, r.id_ambito, r.id_attivita, r.id_tipo_deliverable)
      .deleteConsuntivi(delCriteria)
      .subscribe(msg => {
        this.consuntivi.splice(i, 1);
        this.consuntivi = Object.create(this.consuntivi); //deepcopy    
        alert("deleted " + msg);
      },
      err => alert(err)
      );

  }

  //UTILITY
  private daysInMonth(month, year) {
    return new Date(year, month, 0).getUTCDate();
  }

  private resetConsuntivo(consuntivo: any){
    consuntivo.id_utente = null;
    consuntivo.id_cliente = null;
    consuntivo.id_ambito = null;
    consuntivo.id_macro_area = null;
    consuntivo.id_attivita = null;
    consuntivo.id_tipo_deliverable = null;
    consuntivo.data_consuntivo = new Date(this.yearSelected, this.monthSelected-1, 1, 0, 0, 0, 0);

  }


  private cloneConsuntivoField(consuntivoSource: any, consuntivoTarget: any){
    consuntivoTarget.id_utente = consuntivoSource.id_utente;
    consuntivoTarget.id_cliente = consuntivoSource.id_cliente;
    consuntivoTarget.id_ambito = consuntivoSource.id_ambito;
    consuntivoTarget.id_macro_area = consuntivoSource.id_macro_area;
    consuntivoTarget.id_attivita = consuntivoSource.id_attivita;
    consuntivoTarget.id_tipo_deliverable = consuntivoSource.id_tipo_deliverable;
    consuntivoTarget.data_consuntivo = consuntivoSource.data_consuntivo;
  }
}
