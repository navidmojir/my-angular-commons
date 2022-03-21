import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import { CrudParams } from '../dto/crud-params';
import { FieldConfig } from '../dto/field-config';
import { FieldType } from '../enums/field-type';
import { Operation } from '../enums/operations';
import { PanelType } from '../enums/panel-type';
import { DataService } from '../services/data-service/data.service';

@Component({
  selector: 'app-crud-list',
  templateUrl: './crud-list.component.html',
  styleUrls: ['./crud-list.component.css']
})
export class CrudListComponent implements OnInit {

  @Input() filters: any;

  currentPanel: PanelType = PanelType.LIST;

  panelType = PanelType;
  
  entities: any[] = [];

  entity: any = {};

  currentEntityId: any = 0;

  operationType = Operation;
  
  displayedCols: String[] = [];

  sorting: any = {};

  paging: any = {};

  onInitSort: boolean = false;

  queryParams: any = {};

  @Input() params: CrudParams= {} as any; 

  dialogRef: MatDialogRef<ConfirmationDialogComponent> = {} as any;

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as any;

  constructor(private dataService: DataService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute) {        
  }

  ngOnInit(): void {
    // this.displayedCols = ['front', 'back'];

    this.dataService.setBaseUrl(this.params.baseUrl);
    this.dataService.setResourceName(this.params.resourceName);
    this.dataService.setErrorMsgHandler(this.params.errorMessageHandler);
    this.dataService.setSearchMethod(this.params.searchMethod);
    if(this.entities.length == 0)
      this.getDataFromBackend();
    
    for(var fc of this.params.fieldConfigs)
    {
      if(fc.showOnList == true)
        this.displayedCols.push(fc.name);
    }
    this.displayedCols.push("operations");
  }

  reload(): void {
    this.getDataFromBackend();
  }

  reloadFromPageZero(): void {
    this.paging['pageNumber'] = 0;
    this.paginator.pageIndex = 0;
    this.reload();
  }

  private getDataFromBackend(): void {
    this.dataService.list(this.filters, this.paging, this.sorting).subscribe(
      (result: any) => {
        // console.log(result);
        this.entities = result.body;        
        this.paginator.length = +result.headers.get(this.params.totalPagesHeaderName);	      
    }
    );
    
  }

  operationEnabled(operation: Operation): boolean {
    return this.params.operations.includes(operation);
  }

  showDetails(id: any): void{
    this.currentEntityId = id;
    this.changePanel(PanelType.DETAILS);
  }

  changePanel(panel: PanelType) {
    this.currentPanel = panel;
    if(panel == PanelType.LIST)
      this.reload();
  }

  create(): void {
    this.entity = {};
    this.changePanel(PanelType.CREATE);
  }

  edit(element: any): void {
    this.entity = element;
    this.changePanel(PanelType.CREATE);
  }

  delete(id: any): void 
	{	
		this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			disableClose: false
		});
		this.dialogRef.componentInstance.confirmMessage = "آیا عملیات حذف را تایید می کنید؟"

		this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dataService.delete(id).subscribe(
          (result: any) => this.reload()
        );
      }
			this.dialogRef = {} as any;
		});
			
  }
  
  applySorting(ev: any): void {
    //console.log('sorting triggered!');
    console.log(ev);
		if(ev.direction == '')
		{
			this.sorting = null;
			this.removeQueryParam('sortField');
			this.removeQueryParam('direction');
		}
		else
		{
			this.sorting = {
				sortField: ev.active,
				ascending: (ev.direction == 'asc' ? true : false)
			};
			this.addQueryParam('sortField', this.sorting['sortField']);
			this.addQueryParam('direction', ev.direction);
		}

		if(this.onInitSort == true)  //to prevent calling backend twice on page load when setting sort fields
			this.onInitSort = false;
		else
			this.getDataFromBackend();
  }
  
  addQueryParam(name: string, value: string): void {
		let param: any = {};
		param[name]=value;
		
		let newData = Object.assign({}, this.queryParams, param);
		this.queryParams = newData;
		this.router.navigate(
			[], {
				relativeTo: this.activatedRoute,
				queryParams: this.queryParams
			}
		);
	}
	
	removeQueryParam(name: string): void {
		let param: any = {};
		param[name]=null;
		
		let newData = Object.assign({}, this.queryParams, param);
		this.queryParams = newData;
		this.router.navigate([], {queryParams: this.queryParams});
  }
  
  applyPaging(pageEvent: PageEvent): void {
	
		this.paging['pageNumber'] = pageEvent.pageIndex;
		this.paging['pageSize'] = pageEvent.pageSize;
		
		this.addQueryParam('pageNumber', this.paging['pageNumber']);
		this.addQueryParam('pageSize', this.paging['pageSize']);
		
		this.getDataFromBackend();
	}

  get(element, fieldConf) {
    let names = fieldConf.name.split('.');
    if(names.length == 1)
      return element[names[0]];
    if(names.length == 2)
      return element[names[0]][names[1]];
    if(names.length == 3)
      return element[names[0]][names[1]][names[2]];
    return "unsupported field name";
  }

}
