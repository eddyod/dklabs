import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { SchedulesComponent } from './schedules.component';

const routes: Routes = [
  { path: '', component: SchedulesComponent },
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SchedulesComponent],
  providers: []
})
export class ScheduleModule { }
