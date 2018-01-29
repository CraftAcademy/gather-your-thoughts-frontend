import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThoughtModalPage } from './thought_modal';

@NgModule({
  declarations: [
    ThoughtModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ThoughtModalPage),
  ],
})
export class ThoughtModalPageModule {}
