import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { FieldConfig } from '../../dto/field-config';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  generateFormGroup(fieldConfigs: FieldConfig[], entity: any): UntypedFormGroup
  {
    let group: any = {};

    fieldConfigs.forEach(fc => {
      group[fc.name] = new UntypedFormControl(entity[fc.name], fc.validators);
    })

    return new UntypedFormGroup(group);
  }
}
