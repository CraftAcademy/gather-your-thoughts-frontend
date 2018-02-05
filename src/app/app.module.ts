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
import { EntriesShowPage } from '../pages/entries-show/entries-show';
import { ChartsModule } from 'ng2-charts';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EntriesProvider } from '../providers/entries/entries';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { LabelsProvider } from '../providers/labels/labels';
import { HistoryProvider } from '../providers/history/history';
import { SentimentsProvider } from '../providers/sentiments/sentiments';
import { AuthenticationProvider } from '../providers/authentication/authentication';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LabelsIndexPage,
    LabelsShowPage,
    HistoryPage,
    SentimentsIndexPage,
    SentimentsShowPage,
    EntriesShowPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RouterModule,
    HttpModule,
    ChartsModule
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
    EntriesShowPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EntriesProvider,
    Angular2TokenService,
    LabelsProvider,
    HistoryProvider,
    SentimentsProvider,
    AuthenticationProvider
  ]
})
export class AppModule {}
