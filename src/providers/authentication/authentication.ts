import {Injectable, ViewChild} from '@angular/core';
import {HomePage} from "../../pages/home/home";
import { App, ToastController } from 'ionic-angular';
import { Angular2TokenService } from 'angular2-token';


@Injectable()
export class AuthenticationProvider {

  currentUser: any;

  rootPage: any = HomePage;

  constructor(private _tokenService: Angular2TokenService,
              public appCtrl: App,
              public toastCtrl: ToastController) {
    this._tokenService.init({
      apiBase: 'https://gather-your-thoughts-backend.herokuapp.com/api/v1'
    });
  }

  login(credentials) {
    return this._tokenService.signIn(credentials)
  }

  signup(credentials) {
    this._tokenService
      .registerAccount(credentials)
      .subscribe(
        res => {
          this.currentUser = res.json().data;
          //this.redirectToHome();
          //this.presentToast(`Welcome ${this.currentUser.email}! You are now logged in as well.`, 2500)
        },
        err => this.presentToast(err.json().errors.full_messages.join(', '), 3000)
      );
  }

  logout() {
    this._tokenService
      .signOut()
      .subscribe(
        res => {
          this.redirectToHome();
        },
        err => console.error('error'));
    this.currentUser = undefined;
  }

}
