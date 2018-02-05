import { LabelsProvider } from '../../providers/labels/labels';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EntriesShowPage } from '../../pages/entries-show/entries-show';

@IonicPage()
@Component({
  selector: 'page-labels-show',
  templateUrl: 'labels-show.html',
})
export class LabelsShowPage {
  labelId :any;
  labelName: any;
  entries :any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private labelsProvider: LabelsProvider
  ) {
    if (this.navParams.get('id')) {
      this.labelId = this.navParams.get('id');
    }

    if (this.navParams.get('name')) {
      this.labelName = this.navParams.get('name');
    }

    this.labelsProvider.getLabelEntries(this.labelId).subscribe(({ data }) => {
      this.entries = data;
    });
  }

  navigateToEntry(EntryId) {
    this.navCtrl.push(EntriesShowPage, {
      id: EntryId
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LabelsShowPage');
  }

}
