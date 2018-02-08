import {Injectable} from '@angular/core';
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
    return this._tokenService.registerAccount(credentials)
  }

  signout() {
    return this._tokenService.signOut()
  }

}
