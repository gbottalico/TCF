import {Component, Input, OnInit} from '@angular/core';
import * as $ from 'jquery';
import 'jquery-ui';
import 'jquery-easing';

@Component({
    selector: "leftsidebar",
    templateUrl: 'leftsidebar.component.html',
    styleUrls: ['leftsidebar.component.css'],
    providers: []
})

export class LeftsideBarComponent implements OnInit{
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
        $('.subSection li').on('click', function() {
            $('.subSection li').removeClass('active').addClass('deactive');
            $(this).addClass('active');
        });
    }
}