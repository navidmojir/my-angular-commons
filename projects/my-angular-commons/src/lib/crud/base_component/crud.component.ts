import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CrudListComponent } from '../crud-list/crud-list.component';
import { CrudParams } from '../dto/crud-params';
import { FieldConfig } from '../dto/field-config';
import { Operation } from '../enums/operations';
import { PanelType } from '../enums/panel-type';
import { DataService } from '../services/data-service/data.service';
//import { ResourceService } from '../base_service/resource.service';
//import {CrudDetailsComponent} from '../crud-details/crud-details.component'

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  operationType = Operation;

  @Input() params: CrudParams = {} as any;

  @Input() filters: any;

  @ViewChild(CrudListComponent) crudListComponent: CrudListComponent;

  constructor() {  
  }

  ngOnInit(): void {    
  }

  operationEnabled(operation: Operation): boolean {
    return this.params.operations.includes(operation);
  }

  reload() {
    this.crudListComponent.reload();
  }

  reloadFromPageZero() {
    this.crudListComponent.reloadFromPageZero();
  }

}
