import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoryProvider } from '../../providers/history/history';
import { EntriesShowPage } from '../../pages/entries-show/entries-show';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  myDate: any;
  entries: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public historyProvider: HistoryProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  dateEntries() {
    this.historyProvider.getDateEntries(this.myDate)
      .subscribe(({ data }) => this.entries = data);
  }

  navigateToEntry(entryId) {
    this.navCtrl.push(EntriesShowPage, {
      id: entryId
    });
  }
}
