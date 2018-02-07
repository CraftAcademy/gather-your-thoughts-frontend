import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LabelsIndexPage } from '../pages/labels-index/labels-index';
import { HistoryPage } from '../pages/history/history';
import { SentimentsIndexPage } from '../pages/sentiments-index/sentiments-index';
import { ActivityPage } from '../pages/activity/activity';
import { AuthenticationProvider } from "../providers/authentication/authentication";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any, icon: any }>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public alertCtrl: AlertController,
              public authenticationProvider: AuthenticationProvider,
              public appCtrl: App,
              public toastCtrl: ToastController) {

    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Labels', component: LabelsIndexPage, icon: 'bookmark' },
      { title: 'History', component: HistoryPage, icon: 'book' },
      { title: 'Sentiments', component: SentimentsIndexPage, icon: 'happy' },
      { title: 'Activity', component: ActivityPage, icon: 'pulse' }

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
            console.log(data);
            this.authenticationProvider.login(data)
              .subscribe(
                res => {
                  this.currentUser = res.json().data;
                  this.authenticationProvider.currentUser = true;
                  this.redirectToHome();
                  this.presentToast(`Successfully logged in as ${this.currentUser.email}`, 2200);
                },
                err => this.presentToast(err.json().errors[0], 2200)
              );
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
            this.authenticationProvider.signup(data);
          }
        }
      ]
    });
    alert.present();
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


  redirectToHome() {
    this.appCtrl.getRootNav().setRoot(HomePage);
  }

  presentToast(msg, duration) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: duration,
      position: 'top'
    });
    toast.present();
  }
}
