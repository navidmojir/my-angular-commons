import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CrudComponent } from './crud/base_component/crud.component';
import { ConfirmationDialogComponent } from './crud/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import { CrudDetailsComponent } from './crud/crud-details/crud-details.component';
import { CrudFormComponent } from './crud/crud-form/crud-form.component';
import { CrudListComponent } from './crud/crud-list/crud-list.component';
import { ErrorDialogComponent } from './crud/error-dialog/error-dialog.component';
import { SpinnerOverlayComponent } from './loading-helper/components/spinner-overlay.component';
import { JalaliPipe, JalaliTimePipe } from './pipes/jalali.pipe';
import { MaterialModule } from './utils/material.module';
import { NationalCodeValidatorDirective } from './utils/national-code-validator';



@NgModule({
  declarations: [ 
    CrudComponent,
    CrudDetailsComponent,
    CrudFormComponent,
    CrudListComponent,
    ConfirmationDialogComponent,
    SpinnerOverlayComponent,
    JalaliPipe,
    JalaliTimePipe,    
    NationalCodeValidatorDirective,
    ErrorDialogComponent
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    MaterialModule,
    CrudComponent,
    JalaliPipe,
    JalaliTimePipe,
    NationalCodeValidatorDirective
  ]
})
export class MyAngularCommonsModule { }
