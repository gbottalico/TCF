import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'month-grid',
  templateUrl: './monthGrid.component.html',
  styleUrls: ['./monthGrid.component.css'],
  providers: []
})

export class MonthGridComponent{
  @Input() monthSelected : Number;
  @Input() yearSelected : Number;
  @Input() userSelected : Number;
}
