import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LabelsIndexPage } from '../pages/labels-index/labels-index';
import { LabelsShowPage } from '../pages/labels-show/labels-show';
import { HistoryPage } from '../pages/history/history';
import { SentimentsIndexPage } from '../pages/sentiments-index/sentiments-index';
import { SentimentsShowPage } from '../pages/sentiments-show/sentiments-show';
import { ThoughtsShowPage } from '../pages/thoughts-show/thoughts-show';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ThoughtsProvider } from '../providers/thoughts/thoughts';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { LabelsProvider } from '../providers/labels/labels';
import { HistoryProvider } from '../providers/history/history';
import { SentimentsProvider } from '../providers/sentiments/sentiments';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LabelsIndexPage,
    LabelsShowPage,
    HistoryPage,
    SentimentsIndexPage,
    SentimentsShowPage,
    ThoughtsShowPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RouterModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LabelsIndexPage,
    LabelsShowPage,
    HistoryPage,
    SentimentsIndexPage,
    SentimentsShowPage,
    ThoughtsShowPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ThoughtsProvider,
    Angular2TokenService,
    LabelsProvider,
    HistoryProvider,
    SentimentsProvider
  ]
})
export class AppModule {}
