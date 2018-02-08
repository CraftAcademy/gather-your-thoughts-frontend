import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoryProvider } from '../../providers/history/history';
import { EntriesShowPage } from '../../pages/entries-show/entries-show';
import { trigger, state, style, animate, transition } from '@angular/animations';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => *', animate('500ms'))
    ]),

    trigger('historyEntries', [
      state('shown', style({ opacity: 1})),
      state('hidden', style({ opacity: 0.65})),
      transition('* => *', animate('700ms'))
    ])
  ]
})
export class HistoryPage {
  visibility: string = 'hidden'
  history: string = 'shown';
  text: string;
  myDate: any;
  entries: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public historyProvider: HistoryProvider) {
    this.visibility = 'shown';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  dateEntries() {
    this.historyProvider.getDateEntries(this.myDate)
      .subscribe(({ data }) => {
      this.history = 'hidden';
      setTimeout(() =>
        {
          this.entries = data;
        },
        800);
        if (data.length == 0) {
          setTimeout(() =>
            {
              this.text = "No entries were created on this day."
            },
          800);
        }
        else {
          setTimeout(() =>
            {
              this.text = undefined;
            },
            800);
        }
      }
    )
  }

  navigateToEntry(entryId) {
    this.navCtrl.push(EntriesShowPage, {
      id: entryId
    });
  }
}
