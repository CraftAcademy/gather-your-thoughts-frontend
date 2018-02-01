import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SentimentsProvider } from '../../providers/sentiments/sentiments';


@IonicPage()
@Component({
  selector: 'page-sentiments-show',
  templateUrl: 'sentiments-show.html',
})
export class SentimentsShowPage {
  sentimentId :any;
  sentimentName :any;
  thoughts :any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sentimentsProvider: SentimentsProvider
  ) {
    if (this.navParams.get('id')) {
      this.sentimentId = this.navParams.get('id');
    }

    if (this.navParams.get('name')) {
      this.sentimentName = this.navParams.get('name');
    }

    this.sentimentsProvider.getSentimentThoughts(this.sentimentId).subscribe(({ data }) => {
      this.thoughts = data;
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SentimentsShowPage');
  }

}
