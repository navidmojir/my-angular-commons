import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudParams } from '../dto/crud-params';
import { FieldConfig } from '../dto/field-config';
import { FieldType } from '../enums/field-type';
import { DataService } from '../services/data-service/data.service';

@Component({
  selector: 'app-crud-details',
  templateUrl: './crud-details.component.html',
  styleUrls: ['./crud-details.component.css']
})
export class CrudDetailsComponent implements OnInit {

  //@Input() entity: any;

  entity: any;

  //@Input() fieldConfigs: FieldConfig[] = []; 

  @Input() currentEntityId: any;

  @Input() params: CrudParams = {} as any; 

  constructor(private dataService: DataService,
    private route: ActivatedRoute) { }

  fieldType = FieldType;

  ngOnInit(): void {
    this.dataService.setBaseUrl(this.params.baseUrl);
    this.dataService.setErrorMsgHandler(this.params.errorMessageHandler);
    // const id = this.route.snapshot.paramMap.get('id');
    // if(id == null)
    //   console.error("id was not found in url params");
    // else
    this.dataService.retrieve(this.currentEntityId).subscribe(
      (entity: any) => this.entity = entity
    );
  }

  valueToText(values: any[], value: string): string {
    if(value == null || values == null)
      return "-";
    let result = values.find(x => x.value == value);
    if(result == undefined)
    {
      console.error("Failed to find value ", value, " in the list of values");
      return "?";
    }
    return result.text;
  }

}
