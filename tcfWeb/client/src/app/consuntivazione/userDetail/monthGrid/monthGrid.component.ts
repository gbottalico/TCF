import { Component, OnInit, Input } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { Consuntivo } from '../../../model/consuntivo';
import { User } from '../../../model/user';
import { ConsuntivazioneService } from '../../../service/consuntivazione.service';

@Component({
  selector: 'month-grid',
  templateUrl: './monthGrid.component.html',
  styleUrls: ['./monthGrid.component.css'],
  providers: []
})

<<<<<<< HEAD
export class MonthGridComponent{
  @Input() monthSelected : Number;
  @Input() yearSelected : Number;
  @Input() userSelected : Number;
=======
export class MonthGridComponent implements OnInit{
 

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

  constructor(private consuntivazioneService : ConsuntivazioneService) {
    this.settings.mode = 'inline';
    this.settings.actions = {};
    this.settings.actions.columnTitle = '';

    var nDays = this.daysInMonth(this.monthSelected, this.yearSelected);

    var i = 0;
    
    this.settings.columns = new Array(nDays);

    while (i < nDays){
      this.settings.columns[i] = {};      
      this.settings.columns[i].title = (i + 1);
      this.settings.columns[i].width = '5px';

      if(i == 3){
        this.settings.columns[i].editable = false; //funziona solo in modifica non in inserimento
        this.settings.columns[i].width = '5px';
      }
      
      i++;
    }
    
    var userDays: [Consuntivo];
    consuntivazioneService
                    .getMeseConsuntivoCliente(this.userSelected, this.monthSelected, this.yearSelected)
                    .subscribe(userDays => { this.userDays = userDays });
    
    this.data = this.buildData(userDays, nDays); 
    this.source = new LocalDataSource(this.data); 
    this.source.load(this.data);
      
  }

  ngOnInit(): void {
    this.source = new LocalDataSource(this.data);  
  }

  buildData( _userDays: any, _days: number) : any[] {
    //costruisce il JSON con le colonne del calendario posizionando i valori recuperati nelle corrette posizioni
       
    return [{1: '1'}];

  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  
>>>>>>> ed19fedfa993349b67adcd19ea2fd6632d0ccec5
}
