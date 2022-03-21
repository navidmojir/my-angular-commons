import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldConfig } from '../../dto/field-config';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  generateFormGroup(fieldConfigs: FieldConfig[], entity: any): FormGroup
  {
    let group: any = {};

    fieldConfigs.forEach(fc => {
      group[fc.name] = new FormControl(entity[fc.name], fc.validators);
    })

    return new FormGroup(group);
  }
}
