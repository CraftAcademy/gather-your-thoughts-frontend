import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SentimentsShowPage } from './sentiments-show';

@NgModule({
  declarations: [
    SentimentsShowPage,
  ],
  imports: [
    IonicPageModule.forChild(SentimentsShowPage),
  ],
})
export class SentimentsShowPageModule {}
