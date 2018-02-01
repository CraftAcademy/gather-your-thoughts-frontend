import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThoughtsProvider } from '../../providers/thoughts/thoughts';


@IonicPage()
@Component({
  selector: 'page-thoughts-show',
  templateUrl: 'thoughts-show.html',
})
export class ThoughtsShowPage {
  thoughtId :any;
  thoughtTitle :any;
  thoughtBody :any;
  thoughtLabels :any;
  char = '-';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public thoughtsProvider: ThoughtsProvider
  ) {
    if (this.navParams.get('id')) {
      this.thoughtId = this.navParams.get('id');
    }

    this.thoughtsProvider.getThought(this.thoughtId).subscribe(({ data }) => {
      this.thoughtTitle = data.attributes.title;
      this.thoughtBody = data.attributes.body;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThoughtsShowPage');
  }

}
