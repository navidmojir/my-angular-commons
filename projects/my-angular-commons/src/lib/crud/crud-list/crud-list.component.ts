import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import { CrudParams } from '../dto/crud-params';
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

  @Input() prefix: string = "1";

  dialogRef: MatDialogRef<ConfirmationDialogComponent> = {} as any;

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as any;

  sort;

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

    this.initializeSorting();
    this.initializePaging();    

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
    this.setToLocalStorage('sorting', this.sorting);
    this.setToLocalStorage('paging', this.paging);
    this.setToLocalStorage('filters', this.filters);
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
		if(ev.direction == '')
		{
			this.sorting = null;
		}
		else
		{
			this.sorting = {
				sortField: ev.active,
				ascending: (ev.direction == 'asc' ? true : false)
			};
		}

    this.setToLocalStorage('sorting', this.sorting);

		if(this.onInitSort == true)  //to prevent calling backend twice on page load when setting sort fields
			this.onInitSort = false;
		else
			this.getDataFromBackend();
  }
  
  applyPaging(pageEvent: PageEvent): void {
	
		this.paging['pageNumber'] = pageEvent.pageIndex;
		this.paging['pageSize'] = pageEvent.pageSize;
		
    this.setToLocalStorage("paging", this.paging);
		
		this.getDataFromBackend();
	}

  get(element, fieldConf) {
    let names = fieldConf.name.split('.');
    if(names.length == 1)
      return element[names[0]];
    if(names.length == 2) {
      if(element[names[0]] == null)
        return null;
      return element[names[0]][names[1]];
    }
    if(names.length == 3) {
      if(element[names[0]] == null || element[names[0]][names[1]] == null)
        return null;
      return element[names[0]][names[1]][names[2]];
    }
    return "unsupported field name";
  }

  private setToLocalStorage(key: string, value): void {
    localStorage.setItem(this.prefix + key, JSON.stringify(value));
  }

  private getFromLocalStorage(key: string): any {
    return JSON.parse(localStorage.getItem(this.prefix + key));
  }

  private initializeSorting() {
    this.sorting = this.getFromLocalStorage("sorting");
    if(this.sorting == null)
    {
      this.sort = {
        direction: '',
        active: ''
      };
      return;
    }

    this.sort = {
      direction: this.sorting['ascending'] ? 'asc' : 'desc',
      active: this.sorting['sortField']
    };
  }

  private initializePaging() {
    this.paging = this.getFromLocalStorage("paging");
    if(this.paging == null)
    {
      this.paging = {};
      return;
    }
  }

  
}



