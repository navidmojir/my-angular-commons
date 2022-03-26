import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { IErrorMessageHandler } from "../crud/interfaces/IErrorMessageHandler";

export class BaseService {

    protected baseUrl;  

    constructor(private httpClient: HttpClient,
        private errorMessageHandlerService: IErrorMessageHandler) {
        
    }

    private handleError(error: HttpErrorResponse) {
		return this.errorMessageHandlerService.handle(error);	
    }

    public setBaseUrl(baseUrl: string): void {
        this.baseUrl = baseUrl;
    }

    protected post(path, body) {
        return this.httpClient.post(this.baseUrl + path, body).pipe(
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
}