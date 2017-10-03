import {Component, Input} from '@angular/core';

@Component({
    selector: "rightsidebar",
    templateUrl: 'rightsidebar.component.html',
    styleUrls: ['rightsidebar.component.css'],
    providers: []
})

export class RightsideBarComponent{
    @Input() userLogged : any;

    public getUserLogged(){
        return this.userLogged;
    }
}