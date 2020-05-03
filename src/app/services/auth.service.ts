import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { Person } from '../models/person';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // active session
  private sessionActive = new BehaviorSubject<boolean>(this.tokenAvailable());
  // the  logged in person
 public person: Person = new Person();
  // url for rest data
  API_URL = environment.apiEndpoint;
  private handleError: HandleError;
  private httpOptions: any;
  // the actual JWT token
  public token: string;
  // the token expiration date
  public token_expires: Date;
  // the username of the logged in user
  public username: string;
  // error messages received from the login attempt
  public errors: any = [];

constructor(
  private http: HttpClient,
  private router: Router,
  public httpErrorHandler: HttpErrorHandler) {
  this.handleError = httpErrorHandler.createHandleError('Authentication Service');
  this.httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
}

// Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(person) {
    this.http.post('/api-token-auth/', JSON.stringify(person), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    this.http.post('/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
    this.person = null;
    this.router.navigate(['/account/login']);
  }

  private updateData(token) {
    this.token = token;
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
    this.sessionActive.next(true);
  }

  public socialLogin(person: Person) {
    return this.http.post<Person>(this.API_URL + '/app-login', person, httpOptions)
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data && data['token']) {
          // store person details and jwt token in local storage to keep person logged in between page refreshes
          this.person = data;
          this.updateData(data['token']);
        } else {
          console.log('No data returned from login.');
        }
        return data;
      }, err => console.error('Error=', err)
      ));
  }

  public get isLoggedIn() {
    return this.sessionActive.asObservable();
  }

  private tokenAvailable(): boolean {
    return true;
  }


}
