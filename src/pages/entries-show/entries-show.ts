import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EntriesProvider } from '../../providers/entries/entries';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-entries-show',
  templateUrl: 'entries-show.html',
})
export class EntriesShowPage {
  entryId :any;
  entryTitle :any;
  entryBody :any;
  entryLabels :any;
  entriesSentiment: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public entriesProvider: EntriesProvider,
    public alertCtrl: AlertController
  ) {
    if (this.navParams.get('id')) {
      this.entryId = this.navParams.get('id');
    }

    this.entriesProvider.getEntry(this.entryId).subscribe(({ data }) => {
      this.entryTitle = data.attributes.title;
      this.entryBody = data.attributes.body;
      this.entryLabels = data.attributes.labels;
      this.entriesSentiment = data.attributes.sentiments[0];
    });
  }

  deletePopup() {
    let alert = this.alertCtrl.create({
      title: 'Confirm deletion',
      message: `Do you wish to delete ${this.entryTitle} entry?`,
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
            this.entriesProvider.deleteEntry(this.entryId).subscribe((data) => {
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
    console.log('ionViewDidLoad EntriesShowPage');
  }

}
