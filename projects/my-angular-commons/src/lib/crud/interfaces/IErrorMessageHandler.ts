import { HttpErrorResponse } from "@angular/common/http";

export interface IErrorMessageHandler {
    handle(error: HttpErrorResponse);
    translate(error: HttpErrorResponse): string;
}