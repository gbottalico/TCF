import {Component, Input} from '@angular/core';

@Component({
    selector: "subheader",
    templateUrl: 'subheader.component.html',
    styleUrls: ['subheader.component.css'],
    providers: []
})

export class SubHeaderComponent{
    @Input() userLogged : any;
    @Input() menuSelected : any;
}