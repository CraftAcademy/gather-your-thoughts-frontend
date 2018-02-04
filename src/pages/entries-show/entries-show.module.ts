import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntriesShowPage } from './Entries-show';

@NgModule({
  declarations: [
    EntriesShowPage,
  ],
  imports: [
    IonicPageModule.forChild(EntriesShowPage),
  ],
})
export class EntriesShowPageModule {}
