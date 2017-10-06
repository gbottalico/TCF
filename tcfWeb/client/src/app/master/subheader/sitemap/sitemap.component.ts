import {Component, Input} from '@angular/core';

@Component({
    selector: "sitemap",
    templateUrl: 'sitemap.component.html',
    styleUrls: ['sitemap.component.css'],
    providers: []
})

export class SitemapComponent{
    @Input() userLogged : any;
}