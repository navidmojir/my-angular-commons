import { HttpErrorResponse } from "@angular/common/http";

export class ErrorDto {
    message;
    details;
}

export interface IErrorMessageHandler {
    handle(error: HttpErrorResponse);
    translate(error: HttpErrorResponse): ErrorDto;
}