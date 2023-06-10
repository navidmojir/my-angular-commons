import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { IErrorMessageHandler } from "../crud/interfaces/IErrorMessageHandler";

export class BaseService {

    protected baseUrl;  

    constructor(private httpClient: HttpClient,
        private errorMessageHandlerService: IErrorMessageHandler,
        private resourceName: string) {
        
    }

    private handleError(error: HttpErrorResponse) {
		return this.errorMessageHandlerService.handle(error);	
    }

    public setBaseUrl(baseUrl: string): void {
        this.baseUrl = baseUrl;
    }

    protected post(path, body, options?) {
        return this.httpClient.post(this.baseUrl + path, body, options).pipe(
              catchError((error) => this.handleError(error))
        );
    }

    protected get(path) {
        return this.httpClient.get(this.baseUrl + path).pipe(
            catchError((error) => this.handleError(error))
      );
    }

    protected getAsBlob(path) {
        return this.httpClient.get(this.baseUrl + path, { responseType: 'blob' as 'json' }).pipe(
            catchError((error) => this.handleError(error))
      );
    }

    protected put(path, body) {
        return this.httpClient.put(this.baseUrl + path, body).pipe(
              catchError((error) => this.handleError(error))
        );
    }

    protected delete(path) {
        return this.httpClient.delete(this.baseUrl + path).pipe(
              catchError((error) => this.handleError(error))
        );
    }

    public create(entity) {
        return this.post('/' + this.resourceName, entity);
    }

    public retrieve(id) {
        return this.get('/' + this.resourceName + '/' + id);
    }

    public update(id, entity) {
        return this.put('/' + this.resourceName + '/' + id, entity);
    }

    public search(filters, paging, sorting) {
        let req = {filters: filters, paging: paging, sorting: sorting};
        return this.post('/' + this.resourceName + '/search', req);
    }

    public remove(id) {
        return this.delete('/' + this.resourceName + '/' + id);
    }
}