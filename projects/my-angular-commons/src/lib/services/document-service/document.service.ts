import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { catchError } from 'rxjs/operators';
import { ErrorMessageHandlerService } from '../error-message-handler/error-message-handler.service';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends BaseService{

  constructor(httpClient: HttpClient,
		errorMessageHandlerService: ErrorMessageHandlerService,
    private domSanitizer: DomSanitizer
    ) 
  { 
    super(httpClient, errorMessageHandlerService);
    this.setBaseUrl(environment.documentManagerBaseUrl);
  }

  public download(docId) {
    return this.getAsBlob('/download/' + docId);
  }

  public getDocument(docId) {
    return this.get('/documents/' + docId);
  }

  // /**
  //  * Downloads and url encode downloaded image
  //  */
  // public downloadImage(docId) {
  //   this.download(docId).subscribe(
  //     (imageBlob) => this.createImageFromBlob(imageBlob, )
  //   );
  // }

  

 

    

}
