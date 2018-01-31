import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabelsIndexPage } from './labels-index';

@NgModule({
  declarations: [
    LabelsIndexPage,
  ],
  imports: [
    IonicPageModule.forChild(LabelsIndexPage),
  ],
})
export class LabelsIndexPageModule {}
