import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Cell, DefaultEditor, Editor } from '../../../../../../node_modules/ng2-smart-table';

@Component({
  template: `
    <input [ngClass]="inputClass"
            #name
            class="form-control short-input"
            [name]="cell.getId()"
            [disabled]="!cell.isEditable()"
            [placeholder]=""
            (click)="onClick.emit($event)"
            (keyup)="updateValue()"
            (keydown.enter)="onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()">
  `,
})
export class CustomEditorComponent extends DefaultEditor implements AfterViewInit {

  @ViewChild('name') name: ElementRef;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    if (this.cell.getValue()){
      this.name.nativeElement.value = this.cell.getValue().ore;
      if(this.cell.getValue().id){
        alert("ngAfterViewInit_cell_id:"+this.cell.getValue().id);
      }
    }else{
      this.name.nativeElement.value = '';
    }
  }

  updateValue() {
    const newore = this.name.nativeElement.value;
    if(this.cell.getValue().id){
      alert("updateValue_cell_id:"+this.cell.getValue().id);
    }
    this.cell.newValue = {"id":this.cell.getValue().id , "ore":newore};
    //his.cell.newValue.ore = newore;
  }
}