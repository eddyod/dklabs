import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()

export class InterceptService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  // intercept request and add token
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // check url if we should check or not
    if (new RegExp('register|login|app-login').test(request.url)) {
      console.log('matched');
    } else {
      const token = this.authService.person.token;
      request = request.clone({ setHeaders: { Authorization: `JWT ${token}` } });
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) { }
      }, error => {
        // http response status code
        console.log(error.message);
        if (error.status === 401) {
          this.authService.logout();
          console.log('Your session has expired.');
        }

      })
    );
  }
}
