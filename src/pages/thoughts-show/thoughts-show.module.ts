import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThoughtsShowPage } from './thoughts-show';

@NgModule({
  declarations: [
    ThoughtsShowPage,
  ],
  imports: [
    IonicPageModule.forChild(ThoughtsShowPage),
  ],
})
export class ThoughtsShowPageModule {}
