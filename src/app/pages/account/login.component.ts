import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  FB_APP_ID = 1018221955051401;

  constructor(
    // private fb: Facebook,
    public loadingController: LoadingController,
    private router: Router,
    public authService: AuthService,
    public toastController: ToastController
  ) { }

  ngOnInit() { }

  async presentLoading(loading) {
    return await loading.present();
  }

  async showToast(messageResponse: string) {
    const toast = await this.toastController.create({
      message: messageResponse,
      duration: 2000
    });
    toast.present();
  }


}
