import { Component, OnInit, Input, EventEmitter, Output, OnChanges, Pipe} from '@angular/core';
import { User } from '../../../model/user';
import * as $ from 'jquery';
import 'jquery-ui';
import 'jquery-easing';
import { MeseConsuntivo } from '../../../model/meseConsuntivo';
import { MeseConsuntivoService } from '../../../service/meseConsuntivo.service';

@Component({
  selector: 'month-list',
  templateUrl: './monthList.component.html',
  styleUrls: ['./monthList.component.css'],
  providers: [MeseConsuntivoService]
})

export class MonthListComponent implements OnChanges, OnInit{
  @Input() userSelected : User;
  @Input() backToMonthEvent : boolean;
  @Output() monthSelect = new EventEmitter();

  todayYear = (new Date()).getFullYear();
  years : number[] = new Array<number>();
  months = [ "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
                 "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre" ];
  monthsOfUser: MeseConsuntivo[];
  diffYears : number; 
  assunzione;

  constructor(private meseConsuntivoService : MeseConsuntivoService) {
    /*Mi calcolo la differenza tra l'anno attuale e l'anno di assunzione*/
  }

  ngOnInit(){
  }
  
  ngOnChanges(){
    /*Da capire come gestire la popolazione della tendina anni*/
    if(this.userSelected != null){
      this.years.pop(); 
      this.assunzione = (new Date(this.userSelected.data_inizio_validita)).getFullYear();
      this.diffYears = this.todayYear - this.assunzione;

      for(let i=0; i<=this.diffYears; i++)
        this.years.push(this.todayYear - i);

      $('.date').val(this.todayYear);
      $('.previusYear').hide();

      this.meseConsuntivoService.getMesiConsuntiviUtente(this.userSelected._id, $('.date').val()).subscribe(months => this.monthsOfUser = months);  

    }
    
    if(this.backToMonthEvent){
      this.openMonths();
      $('.riassuntoMesiSection p').text('');
    }

  }

  /*Gestione click arrow anno*/
  changeDate(){
    $('.previusYear').slideToggle();
    $('i').toggleClass('active');
  }

  /*Gestione selezione mese da consuntivare per far appare la griglia*/
  selectMonth(monthParam){
    var year = $('.date').val();
    this.openMonths();
    $('.riassuntoMesiSection p').text(this.months[monthParam-1]);
    this.backToMonthEvent = false;
    this.monthSelect.emit({monthParam, year}); 
  }

  /*Gestione click dell'anno nella combobox*/
  changeYear(yearParam){
    $('.date').val(yearParam);
    $('.previusYear').slideToggle();
    $('i').toggleClass('active');
    $('.riassuntoMesiSection p').text('');
    this.meseConsuntivoService.getMesiConsuntiviUtente(this.userSelected._id, $('.date').val()).subscribe(months => this.monthsOfUser = months);  
  }

  /*Gestione click arrow per aprire sezione mesi consuntivabili*/
  openMonths(){
    if ($('.toggleRight').hasClass('active')) {
      $('.toggleRight').removeClass('active').addClass('deactive');
    } else {
      $('.toggleRight').removeClass('deactive').addClass('active');
    }
    $('.riassuntoMesi ul').slideToggle();
  }

  /*Gestione icona stato del mese*/
  monthStatus(monthParam){
    var userClass;
    var monthType : String = "";
    var consuntivo : MeseConsuntivo;

    consuntivo = this.monthsOfUser.find(mese => mese.mese_consuntivo == monthParam);
    if(consuntivo != null){
      switch(consuntivo.nome_stato){
        case 'Da Verificare':              
          userClass = "fa fa-calendar-minus-o";
          break;
        case 'Chiuso':
          userClass = "fa fa-calendar-check-o";
          break;
        case 'Aperto':
          userClass = "fa fa-calendar-plus-o";
          break;
      }
      monthType = consuntivo.nome_stato;
    } else {
      userClass = "fa fa-calendar-o";
      monthType = "Non disponibile";
    }
    return userClass;  
  }

  /*Gestione nome stato del mese*/
  setStatus(monthParam){
    var userClass;
    var monthType : String = "";
    var consuntivo : MeseConsuntivo;

    consuntivo = this.monthsOfUser.find(mese => mese.mese_consuntivo == monthParam);
    
    return consuntivo != null ? consuntivo.nome_stato : "Non disponibile";  
  }

}
