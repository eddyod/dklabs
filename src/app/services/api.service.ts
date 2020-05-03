import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

import { Person } from '../models/person';
import { Location } from '../models/location';
import { environment } from '../../environments/environment';
import { Schedule } from '../models/schedule';


@Injectable({
  providedIn: 'root'
})
export class APIService {

  API_URL = environment.apiEndpoint;
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    public httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('Authentication Service');
  }

  // persons, employees
  getPersonById(id: number): Observable<Person> {
    return this.http.get<Person>(this.API_URL + '/person/' + id);
  }

  updateEmployee(person: Person) {
    return this.http.put<Person>(this.API_URL + '/person/' + person.id, person)
      .pipe(
        catchError(this.handleError('updating employee', []))
      );
  }

  getEmployees(): Observable<Person[]> {
    return this.http.get<Person[]>(this.API_URL + '/employees')
      .pipe(
        catchError(this.handleError('fetching employees', []))
      );
  }

  // locations
  getLocationById(id: number): Observable<Location> {
    return this.http.get<Location>(this.API_URL + '/location/' + id);
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.API_URL + '/locations')
      .pipe(
        catchError(this.handleError('fetching schools', []))
      );
  }

  // schedules
  getScheduleById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(this.API_URL + '/schedule/' + id);
  }

  // set completed to true
  updateSchedule(schedule: Schedule) {
    return this.http.put<Schedule>(this.API_URL + '/schedule/completed/' + schedule.id, schedule)
      .pipe(
        catchError(this.handleError('updating schedule', []))
      );
  }

  deleteSchedule(id: number) {
    return this.http.delete(this.API_URL + '/schedules/' + id);
  }

  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.API_URL + '/schedules')
      .pipe(
        catchError(this.handleError('fetching schedules', []))
      );
  }

  getTodaySchedules(): Observable<Schedule[]> {
    const id = this.authService.person.id;
    return this.http.get<Schedule[]>(this.API_URL + '/schedules/today/' + id)
      .pipe(
        catchError(this.handleError('fetching todays schedules', []))
      );
  }

  getMySchedules(): Observable<Schedule[]> {
    const id = this.authService.person.id;
    return this.http.get<Schedule[]>(this.API_URL + '/schedules/employee/' + id)
      .pipe(
        catchError(this.handleError('fetching your schedules', []))
      );
  }

  findPagedSchedules(filter = '', ordering = '', limit = 20, offset = 0) {
    const params = new HttpParams()
      .set('search', filter)
      .set('ordering', ordering)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get(this.API_URL + '/schedules/paged', { params });
  }


}
