import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ThoughtsProvider } from '../../providers/thoughts/thoughts';
import { HomePage } from '../../pages/home/home';

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
  thoughtSentiment: any;
  msg: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public thoughtsProvider: ThoughtsProvider,
    public alertCtrl: AlertController
  ) {
    if (this.navParams.get('id')) {
      this.thoughtId = this.navParams.get('id');
    }

    this.thoughtsProvider.getThought(this.thoughtId).subscribe(({ data }) => {
      this.thoughtTitle = data.attributes.title;
      this.thoughtBody = data.attributes.body;
      this.thoughtLabels = data.attributes.labels;
      this.thoughtSentiment = data.attributes.sentiments[0];
    });
  }

  deletePopup() {
    let alert = this.alertCtrl.create({
      title: 'Confirm deletion',
      message: `Do you wish to delete ${this.thoughtTitle} thought?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked!');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.thoughtsProvider.deleteThought(this.thoughtId).subscribe((data) => {
              this.navCtrl.setRoot(HomePage, {
                msg: data.message
              });
            });

          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThoughtsShowPage');
  }

}
