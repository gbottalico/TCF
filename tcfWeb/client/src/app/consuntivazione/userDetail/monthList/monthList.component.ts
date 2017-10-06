import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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

export class MonthListComponent implements OnInit{
  @Input() userSelected : User;  
  @Output() monthSelect = new EventEmitter();
  years : number[] = new Array<number>();
  months = [ "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
                 "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre" ];
  diffYears : number; 
    
  ngOnInit(){
    /*Mi calcolo la differenza tra l'anno da sistema e l'anno di assunzione*/
    var today = (new Date()).getFullYear();
    var assunzione = 2013;//(new Date(this.userSelected.data_inizio_validita)).getFullYear();
    this.diffYears = today - assunzione;

    for(let i=0; i<=this.diffYears; i++)
      this.years.push(today - i);
  
      $('.date').val(today);
      $('.previusYear').hide();

    }

  /*Gestione click arrow anno*/
  changeDate(){
    $('.previusYear').slideToggle();
    $('i').toggleClass('active');
  }

  /*Gestione selezione mese da consuntivare per far appare la griglia*/
  selectMonth(monthParam){
    var year = $('.date').val();
    this.monthSelect.emit({monthParam, year}); 
  }

  /*Gestione click dell'anno nella combobox*/
  changeYear(yearParam){
    $('.date').val(yearParam);
    $('.previusYear').slideToggle();
    $('i').toggleClass('active');
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
