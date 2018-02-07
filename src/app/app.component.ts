import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform } from 'ionic-angular';
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
              public authenticationProvider: AuthenticationProvider,
              public appCtrl: App) {

    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Labels', component: LabelsIndexPage, icon: 'bookmark' },
      { title: 'Sentiments', component: SentimentsIndexPage, icon: 'happy' },
      { title: 'History', component: HistoryPage, icon: 'book' },
      { title: 'Activity', component: ActivityPage, icon: 'pulse' }

    ];

  }

  logout() {
    this.authenticationProvider.signout()
      .subscribe(
        res => {
          this.redirectToHome();
          this.authenticationProvider.currentUser = undefined;
        },
        err => console.error('error'));
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
}
