import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoryProvider } from '../../providers/history/history';
import { ThoughtsShowPage } from '../../pages/thoughts-show/thoughts-show';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  myDate: any;
  thoughts: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public historyProvider: HistoryProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  dateThoughts() {
    this.historyProvider.getDateThoughts(this.myDate)
      .subscribe(({ data }) => this.thoughts = data);
  }

  navigateToThought(thoughtId) {
    this.navCtrl.push(ThoughtsShowPage, {
      id: thoughtId
    });
  }
}
