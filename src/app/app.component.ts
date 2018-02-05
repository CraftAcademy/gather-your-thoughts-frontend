import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Angular2TokenService } from 'angular2-token';
import { HomePage } from '../pages/home/home';
import { LabelsIndexPage } from '../pages/labels-index/labels-index';
import { HistoryPage } from '../pages/history/history';
import { SentimentsIndexPage } from '../pages/sentiments-index/sentiments-index';
import { ActivityPage } from '../pages/activity/activity';
import {AuthenticationProvider} from "../providers/authentication/authentication";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;
  currentUser: any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private _tokenService: Angular2TokenService,
              public alertCtrl: AlertController,
              public authenticationProvider: AuthenticationProvider) {

    this.initializeApp();

    this._tokenService.init({
      apiBase: 'https://gather-your-thoughts-backend.herokuapp.com/api/v1'
    });
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Labels', component: LabelsIndexPage },
      { title: 'History', component: HistoryPage },
      { title: 'Sentiments', component: SentimentsIndexPage },
      { title: 'Activity', component: ActivityPage }

    ];

  }

  loginPopup() {
    console.log('popup');
    let confirm = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
        {
          name: 'password',
          placeholder: 'password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            this.login(data);
          }
        }
      ]
    });
    confirm.present();
  }

  signupPopup() {
    let alert = this.alertCtrl.create({
      title: 'Sign up',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        },
        {
          name: 'password_confirmation',
          placeholder: 'Confirm Password',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked!');
          }
        },
        {
          text: 'Sign up',
          handler: data => {
            this.signup(data);
          }
        }
      ]
    });
    alert.present();
  }

  login(credentials) {
    this._tokenService
      .signIn(credentials)
      .subscribe(
        res => {
          this.currentUser = res.json().data;
          this.authenticationProvider.currentUser = true;
        },
        err => console.error('error')
      );
  }

  signup(credentials) {
    this._tokenService
      .registerAccount(credentials)
      .subscribe(
        res => {
          this.currentUser = res.json().data;
          this.authenticationProvider.currentUser = true;
        },
        err => console.error('error')
      );
  }

  logout() {
    this._tokenService
      .signOut()
      .subscribe(res => this.authenticationProvider.currentUser = false,
        err => console.error('error'));
    this.currentUser = undefined;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
