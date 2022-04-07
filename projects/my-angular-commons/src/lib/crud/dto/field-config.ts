import { ValidatorFn, Validators } from '@angular/forms';
import { FieldType } from '../enums/field-type';

export class FieldConfig {
    name = "";
    displayText = "";
    type: FieldType = FieldType.TEXT;
    showOnList: boolean = false;
    validators: ValidatorFn[] = [];
    sortHeader: boolean = false;
    values: any[] = [];
    valueTransformer = (value) => { return value };
    style = (value) => {return {}};
}