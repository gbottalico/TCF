import { Component, OnInit, Input, EventEmitter, Output, OnChanges} from '@angular/core';
import { User } from '../../../model/user';
import * as $ from 'jquery';
import 'jquery-ui';
import 'jquery-easing';

@Component({
  selector: 'month-list',
  templateUrl: './monthList.component.html',
  styleUrls: ['./monthList.component.css'],
  providers: []
})

export class MonthListComponent implements OnChanges, OnInit{
  @Input() userSelected : User;
  @Input() backToMonthEvent : boolean;
  @Output() monthSelect = new EventEmitter();
  todayYear = (new Date()).getFullYear();
  years : number[] = new Array<number>();
  months = [ "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
                 "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre" ];
  diffYears : number; 
    
  ngOnInit(){
    /*Mi calcolo la differenza tra l'anno da sistema e l'anno di assunzione*/
    this.years.pop();
    var assunzione = (new Date(this.userSelected.data_inizio_validita)).getFullYear();
    this.diffYears = this.todayYear - assunzione;

    for(let i=0; i<=this.diffYears; i++)
      this.years.push(this.todayYear - i);
    
  }
  
  ngOnChanges(){
    $('.date').val(this.todayYear);
    $('.previusYear').hide();

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
    if ($('.toggleRight').hasClass('active')) {
      $('.toggleRight').removeClass('active').addClass('deactive');
    }
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

}
