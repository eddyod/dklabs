import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  fbSignOut() {
        console.log('No facebook_user found, redirecting to login.');
  }


}
