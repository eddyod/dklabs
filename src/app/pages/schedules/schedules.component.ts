import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Schedule } from '../../models/schedule';
import * as moment from 'moment';

const timezoneOffset = new Date().getTimezoneOffset();
const hoursOffset = String(Math.floor(Math.abs(timezoneOffset / 60))).padStart(2, '0');
const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
const direction = timezoneOffset > 0 ? '-' : '+';
const timezoneOffsetString = `${direction}${hoursOffset}${minutesOffset}`;

@Component({
  selector: 'app-schedule',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  public schedules: Schedule[] = [];
  public loading = false;
  public displayImHere = false;


  constructor(private apiService: APIService,
    public authService: AuthService) {
  }

  ngOnInit() {
    this.getTodaySchedule();
  }

  setShowedUp(schedule: Schedule) {
    this.apiService.updateSchedule(schedule).subscribe(() => {
      this.getTodaySchedule();
    }
    );
  }

  getMySchedules() {
    this.displayImHere = false;
    this.loading = true;
    this.apiService.getMySchedules()
      .subscribe(schedules => {
        for (let schedule of schedules) {
          // do something to update each schedule
        }
        this.schedules = schedules;
        this.loading = false;
      });
  }

  getTodaySchedule() {
    this.displayImHere = true;
    this.loading = true;
    let now = moment(new Date());
    this.apiService.getTodaySchedules()
      .subscribe(schedules => {
        for (const schedule of schedules) {
          let start = moment(schedule.start).utc();
          now = moment(now.format('YYYY-MM-DD HH:mm'));
          start = moment(start.format('YYYY-MM-DD HH:mm'));
          const diff = Math.abs(now.diff(start, 'minutes'));
        }
        this.schedules = schedules;
        this.loading = false;
      });
  }


}
