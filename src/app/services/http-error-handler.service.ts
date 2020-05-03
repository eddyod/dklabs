import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ToastController } from '@ionic/angular';



/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
    <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {
    constructor(private toastController: ToastController) { }

    /** Create curried handleError function that already knows the service name */
    createHandleError = (serviceName = '') => <T>
        (operation = 'operation', result = {} as T) => this.handleError(serviceName, operation, result)

    /**
     * Returns a function that handles Http operation failures.
     * This error handler lets the app continue to run as if no error occurred.
     * @param serviceName = name of the data service that attempted the operation
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {

        return (error: HttpErrorResponse): Observable<T> => {
            let message: string;
            if (error['error']) {
                message = (error.error instanceof ErrorEvent) ?
                    error.error.message :
                    `server returned code ${error.status} ${error['error']['error']}`;
            } else {
                message = (error.error instanceof ErrorEvent) ?
                    error.error.message :
                    `server returned code ${error.status} ${error}`;
            }
            this.sendToast(`${serviceName}: ${operation} failed: ${message}`);
            console.log(error);
            // Let the app keep running by returning a safe result.
            return of(result);
        };

    }


      async sendToast(contents: string) {
        const toast = await this.toastController.create({
          message: contents,
          duration: 2000
        });
        toast.present();
      }

}
