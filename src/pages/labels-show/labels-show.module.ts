import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabelsShowPage } from './labels-show';

@NgModule({
  declarations: [
    LabelsShowPage,
  ],
  imports: [
    IonicPageModule.forChild(LabelsShowPage),
  ],
})
export class LabelsShowPageModule {}
