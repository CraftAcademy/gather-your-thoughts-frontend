import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntryModalPage } from './Entry_modal';

@NgModule({
  declarations: [
    EntryModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EntryModalPage),
  ],
})
export class EntryModalPageModule {}
