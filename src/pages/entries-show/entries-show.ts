import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EntriesProvider } from '../../providers/Entries/entries';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-Entries-show',
  templateUrl: 'entries-show.html',
})
export class EntriesShowPage {
  entryId :any;
  entryTitle :any;
  entryBody :any;
  entryLabels :any;
  Entriesentiment: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public EntriesProvider: EntriesProvider,
    public alertCtrl: AlertController
  ) {
    if (this.navParams.get('id')) {
      this.entryId = this.navParams.get('id');
    }

    this.EntriesProvider.getentry(this.entryId).subscribe(({ data }) => {
      this.entryTitle = data.attributes.title;
      this.entryBody = data.attributes.body;
      this.entryLabels = data.attributes.labels;
      this.Entriesentiment = data.attributes.sentiments[0];
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
            this.EntriesProvider.deleteentry(this.entryId).subscribe((data) => {
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
