import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SentimentsIndexPage } from './sentiments-index';

@NgModule({
  declarations: [
    SentimentsIndexPage,
  ],
  imports: [
    IonicPageModule.forChild(SentimentsIndexPage),
  ],
})
export class SentimentsIndexPageModule {}
