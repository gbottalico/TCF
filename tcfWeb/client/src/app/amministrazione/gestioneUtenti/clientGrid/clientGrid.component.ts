import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import * as $ from 'jquery';
import 'jquery-ui';
import 'jquery-easing';
import { ClienteService } from '../../../service/cliente.service';
import { Cliente } from '../../../model/cliente';

@Component({
  selector: 'clientGrid',
  templateUrl: './clientGrid.component.html',
  styleUrls: ['./clientGrid.component.css'],
  providers: [ClienteService]
})

export class ClientGridComponent implements OnChanges{
    clienti : Cliente[];
    @Input() userLogged : User;
    @Input() showUserSection : boolean;
    @Input() showClientGrid : boolean;

    constructor(private clienteService : ClienteService) {
        this.getClienti();
    }

    ngOnChanges(){
        if(this.showClientGrid != null && this.showUserSection != null){
            this.showClientGrid && this.showUserSection ? $('.clientiContainer').fadeIn("slow").show() : $('.clientiContainer').fadeOut("slow").hide();
        }
        else
            $('.clientiContainer').slideToggle().hide();
    }

    getClienti(){
        this.clienteService.getClienti().subscribe( clienti => this.clienti = clienti);
    }

    /*Gestione click su arrow "Gestione Aggiungi Cliente"*/ 
    openClientGrid(){
        if ($('.clientiAssociabiliCustomTitle').find('.toggleRight').hasClass('active')) {
            $('.toggleRight.gestioneClienteAss').removeClass('active').addClass('deactive');
        } else {
            $('.toggleRight.gestioneClienteAss').removeClass('deactive').addClass('active');
        }
        $('.listaClientiAssociabili ul').slideToggle(); 
    }
}
