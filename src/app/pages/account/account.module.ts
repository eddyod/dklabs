import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login.component';
import { UserinfoComponent } from './userinfo.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'userinfo', component: UserinfoComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent,
    UserinfoComponent
  ]
})
export class AccountModule { }
