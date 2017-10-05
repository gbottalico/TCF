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
  years : Number[] = new Array<Number>();
  months = [ "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
                 "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre" ];
  diffYears : Number; 

  constructor(){
  }
    
  ngOnInit(){
    /*Mi calcolo la differenza tra l'anno da sistema e l'anno di assunzione*/
    var today = (new Date()).getFullYear();
    var assunzione = (new Date(this.userSelected.data_inizio_validita)).getFullYear();
    this.diffYears = today - assunzione;

    for(let i=0; i<=this.diffYears; i++)
      this.years.push(assunzione - i);
  
      //gestione click arrow anno
      $('.date').val(today);
      $('.previusYear').hide();
      $('.date').on('click', function() {
        $('.previusYear').slideToggle();
        $('i').toggleClass('active');
      });
      $('.previusYear li').on('click', function() {
        $('.date').val(this.innerText);
        $('.previusYear').slideToggle();
        $('i').toggleClass('active');
      });

      //gestione click arrow riepilogo mesi
      $('.riassuntoMesiSection').on('click', function () {
        if ($(this).find('.toggleRight').hasClass('active')) {
          $('.toggleRight').removeClass('active').addClass('deactive');
        } else {
          $('.toggleRight').removeClass('deactive').addClass('active');
        }
        $('.riassuntoMesi ul').slideToggle();
      });

    }

  selectMonth(monthParam){
    var anno = $('.date').val();
    this.monthSelect.emit({monthParam, anno});    
  }
}
