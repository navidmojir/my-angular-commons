import { Component, OnInit, Input} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CrudParams } from '../dto/crud-params';
import { FieldConfig } from '../dto/field-config';
import { FieldType } from '../enums/field-type';
import { DataService } from '../services/data-service/data.service';
import { FormService } from '../services/form-service/form.service';

@Component({
  selector: 'app-crud-form',
  templateUrl: './crud-form.component.html',
  styleUrls: ['./crud-form.component.css']
})
export class CrudFormComponent implements OnInit {

  fieldType = FieldType;

  createSuccess: boolean = false;
  updateSuccess: boolean = false;

  @Input() params: CrudParams = {} as any; 

  //@Input() entity: any = []; 
  @Input() entity: any = []; 

  form: UntypedFormGroup = {} as any;

  constructor(private formService: FormService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.form = this.formService.generateFormGroup(this.params.fieldConfigs, this.entity);
    this.dataService.setBaseUrl(this.params.baseUrl);
    this.dataService.setErrorMsgHandler(this.params.errorMessageHandler);
  }

  onSubmit(): void {    
    this.createSuccess = false;
    this.updateSuccess = false;

    if(this.entity['id'] == undefined)
    {
      this.dataService.create(this.form.value).subscribe(
        (result: any) => {
          this.createSuccess = true;
          this.entity = result;
        }
      );      
    }
    else
    {
      this.dataService.update(this.entity['id'], this.form.value).subscribe(
        (result: any) => 
        {
          this.updateSuccess = true;
          this.entity = result;
        }
      );
    }    
  }

}
