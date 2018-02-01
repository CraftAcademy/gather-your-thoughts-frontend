import { SentimentsProvider } from '../../providers/sentiments/sentiments';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sentiments-index',
  templateUrl: 'sentiments-index.html',
})
export class SentimentsIndexPage {
  sentiments :any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sentimentsProvider: SentimentsProvider) {

    this.sentimentsProvider.getSentiments().subscribe((data) => {
      this.sentiments = data.sentiments;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SentimentsIndexPage');
  }

}
