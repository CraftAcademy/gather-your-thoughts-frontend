import { SentimentsProvider } from '../../providers/sentiments/sentiments';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SentimentsShowPage } from '../sentiments-show/sentiments-show';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";

@IonicPage()
@Component({
  selector: 'page-sentiments-index',
  templateUrl: 'sentiments-index.html',
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => *', animate('500ms'))
    ])
  ]
})
export class SentimentsIndexPage {
  sentiments :any;
  visibility: string = 'hidden';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sentimentsProvider: SentimentsProvider) {

    this.sentimentsProvider.getSentiments().subscribe((data) => {
      this.sentiments = data.sentiments;
      this.sentiments.sort(function(a, b) {
        var x = a.taggings_count;
        var y = b.taggings_count;

        if (x > y) {
          return -1;
        }
        if (y > x) {
          return 1;
        }
        return 0;
      });
      this.visibility = 'shown';
    });
  }

  navigateToSentiment(sentimentId, sentimentName) {
    this.navCtrl.push(SentimentsShowPage, {
      id: sentimentId, name: sentimentName
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SentimentsIndexPage');
  }

}
