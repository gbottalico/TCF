import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import * as $ from 'jquery';
import 'jquery-ui';
import 'jquery-easing';
import { SystemService } from '../../service/system.service';

@Component({
    selector: "leftsidebar",
    templateUrl: 'leftsidebar.component.html',
    styleUrls: ['leftsidebar.component.css'],
    providers: [SystemService]
})

export class LeftsideBarComponent implements OnInit{

    menuEntries : any;
    selectedMenu : any;

    constructor(
        private systemService: SystemService
    ) {
   
    }


    ngOnInit(){ //DA GESTIRE CON ANGULAR2
        // $('.btnConsuntivazione').addClass('active');
        // $('.subSection').hide();
        
        // $('.consuntivazioneContainer').show();
        // $('.amministrazioneContainer').hide();
        // $('.reportisticaContainer').hide();
        
        // $('.btnConsuntivazione').on('click', function() {
        //     if ($('.navigation').hasClass('active')) {
        //         $('.navigation').removeClass('active');
        //     }
        //     $(this).addClass('active');
        //     $('.consuntivazione').fadeIn().show();
        //     $('.consuntivazioneContainer').fadeIn().show();
        //     $('.amministrazione').hide();
        //     $('.amministrazioneContainer').hide();
        //     $('.reportistica').hide();
        //     $('.reportisticaContainer').hide();
        
        //     $('.subSection').slideUp();
        // });
        // $('.btnAmministrazione').on('click', function() {
        //     if ($('.navigation').hasClass('active')) {
        //         $('.navigation').removeClass('active');
        //     }
        //     $(this).addClass('active');
        //     $('.consuntivazione').hide();
        //     $('.consuntivazioneContainer').hide();
        //     $('.amministrazione').fadeIn().show();
        //     $('.amministrazioneContainer').fadeIn().show();
        //     $('.reportistica').hide();
        //     $('.reportisticaContainer').hide();
        
        //     $('.subSection').slideDown();
        // });
        // $('.btnReportistica').on('click', function() {
        //     if ($('.navigation').hasClass('active')) {
        //         $('.navigation').removeClass('active');
        //     }
        //     $(this).addClass('active');
        //     $('.consuntivazione').hide();
        //     $('.consuntivazioneContainer').hide();
        //     $('.amministrazione').hide();
        //     $('.amministrazioneContainer').hide();
        //     $('.reportistica').fadeIn().show();
        //     $('.reportisticaContaia te buona er').fadeIn().show();
        
        //     $('.subSection').slideUp();
        // });
       
        $('.sidebarToggle').on('click', function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active').hide().fadeIn().addClass('deactive');
                $('.leftSidebar').removeClass('active').hide().fadeIn().addClass('deactive');
                $('.rightSidebar').removeClass('deactive').hide().fadeIn().addClass('active');
            } else if ($(this).hasClass('deactive')) {
                $(this).removeClass('deactive').hide().fadeIn().addClass('active');
                $('.leftSidebar').removeClass('deactive').hide().fadeIn().addClass('active');
                $('.rightSidebar').removeClass('active').hide().fadeIn().addClass('deactive');
            } 
        });
    
        this.systemService.getMenu(null).subscribe(
            menulist => this.menuEntries = menulist,
            error    => alert(error)
        );
    }

    select(event, item){
        this.selectedMenu = (this.selectedMenu === item ? null : item);
        var target = event.target || event.srcElement || event.currentTarget;
        var menuElement = target.closest( "li" );
        //$(xxx).fadeIn().show();
        if(this.selectedMenu){
            $(menuElement).children("ul").slideDown(500);
        }else{
            $(menuElement).children("ul").slideUp(500);
        }

        /*
        $(".sectionHead" ).each(function( index ) {
           if( this.id != target.id ){
               $(this.parentElement).children("ul").slideUp(1000);
           }
        });*/

        $(".navigation" ).each(function( index ) {
            if($(this).hasClass('active')){
                if( this.id != target.id ){
                    $('.navigation').removeClass('active');
                    $(this).children("ul").slideUp(500);
                }
            }
        });

    }

    @Input()
    set ready(isReady: boolean) {
        if (isReady) {
            $('.subSection').hide();
        }
    }

    isActive(item){
        return this.selectedMenu === item;
    }

}