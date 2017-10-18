import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import * as $ from 'jquery';
import 'jquery-ui';
import 'jquery-easing';
import { Sede } from '../../../model/sede';
import { SedeService } from '../../../service/sede.service';

@Component({
  selector: 'userForm',
  templateUrl: './userForm.component.html',
  styleUrls: ['./userForm.component.css'],
  providers: [SedeService]
})

export class UserFormComponent implements OnInit, OnChanges{
    sedi : Sede[];
    @Output() showClientGrid = new EventEmitter();
    @Output() dismissClientGrid = new EventEmitter();
    @Input() showUserSection : boolean;
    @Input() saved : boolean;
    constructor(private sedeService : SedeService) {
    }

    ngOnInit(){        
        this.getSedi();
        $('.closePanelClienteBtn').hide();
        $('.allList').hide();
        $('.addClienteBtn').show();
        //$('.aggiungiUtenteContainer').slideToggle();
    }

    ngOnChanges(){
        if(this.showUserSection != null)
            this.showClientGrid && this.showUserSection ? $('.aggiungiUtenteContainer').fadeIn("slow").show() : $('.aggiungiUtenteContainer').fadeOut("slow").hide();
        else
            $('.aggiungiUtenteContainer').slideToggle().hide();

        if(this.saved){
            $('.closePanelClienteBtn').hide();
            $('.addClienteBtn').show();
        }
    }

    getSedi(){
        this.sedeService.getSedi().subscribe( sedi => this.sedi = sedi);
    }

    /*Gestione click ARROW "Aggiungi Utente" - tutta la sezione User Form*/
    showUserForm(){
        if ($('.aggiungiUtenteTitle').find('.toggleRight').hasClass('active')) {
            $('.toggleRight.utenteAdd').removeClass('active').addClass('deactive');
        } else {
            $('.toggleRight.utenteAdd').removeClass('deactive').addClass('active');
        }
        $('.aggiungiUtenteBodyContainer').slideToggle();
    }

    /*Gestione BOTTONE "Aggiungi Cliente"*/
    openClientGrid(){
        $('.addClienteBtn').hide();
        $('.closePanelClienteBtn').fadeIn().show();
        this.showClientGrid.emit();
    }

    /*Gestione bottone "Chiudi Aggiunta Cliente"*/
    closeClientGrid(){        
        $('.closePanelClienteBtn').hide();
        $('.addClienteBtn').fadeIn().show();
        this.dismissClientGrid.emit();
    }

    chooseAdmin(event){        
        $('#adminInput').val(event.target.id);    
        this.showAdminList();
    }

    showAdminList(){
        $('#adminInput').parent().find('.allList').slideToggle();
        $('#adminInput').parent().find('i').toggleClass('active'); 
    }

    chooseSede(sedeParam){
        $('#sedeInput').val(sedeParam);
        this.showSedeList(); 
    }

    showSedeList(){        
        $('#sedeInput').parent().find('.allList').slideToggle();
        $('#sedeInput').parent().find('i').toggleClass('active'); 
    }
    
}
