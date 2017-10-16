import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from '../../../../../../node_modules/ng2-smart-table';

@Component({
  template: `
    {{renderValue}}
  `,
})
export class CustomRenderComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: any;
  @Input() rowData: any;

  ngOnInit() {
    this.renderValue = this.value.ore;
  }

}