import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LabelsIndexPage } from '../pages/labels-index/labels-index';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ThoughtsProvider } from '../providers/thoughts/thoughts';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { LabelsProvider } from '../providers/labels/labels';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LabelsIndexPage

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
    LabelsIndexPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ThoughtsProvider,
    Angular2TokenService,
    LabelsProvider
  ]
})
export class AppModule {}
