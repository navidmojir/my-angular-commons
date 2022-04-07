import { NgModule } from "@angular/core";
import {  DateAdapter,  MAT_DATE_FORMATS,  MAT_DATE_LOCALE } from "@angular/material/core";
import { MatTabsModule } from "@angular/material/tabs";
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from "./material.persian-date.adapter";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatNativeDateModule} from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule, } from '@angular/material/datepicker';
import { getPersianPaginatorIntl } from "../crud/utils/persian-paginator-intl";
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTreeModule} from '@angular/material/tree';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';

@NgModule({
  exports: [
    MatTabsModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSortModule, 
    MatPaginatorModule,
    MatRadioModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatToolbarModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatMenuModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatTreeModule,
    MatBottomSheetModule,
    MatListModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS },
    MatDatepickerModule,
    { provide: MatPaginatorIntl, useValue: getPersianPaginatorIntl()},
  ]
})
export class MaterialModule {
}