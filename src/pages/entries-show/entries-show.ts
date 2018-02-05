import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ToastController } from 'ionic-angular';
import { EntriesProvider } from '../../providers/entries/entries';
import { HomePage } from '../../pages/home/home';
import { UpdateThoughtModalPage } from '../../pages/update-thought-modal/update-thought-modal';

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
  entrySentiment: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public entriesProvider: EntriesProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) {
    if (this.navParams.get('id')) {
      this.entryId = this.navParams.get('id');
    }

    if (this.navParams.get('msg')) {
      let toast = this.toastCtrl.create({
        message: this.navParams.get('msg'),
        duration: 1500,
        position: 'top'
      });
      toast.present();
    }

    this.entriesProvider.getEntry(this.entryId).subscribe(({ data }) => {
      this.entryTitle = data.attributes.title;
      this.entryBody = data.attributes.body;
      this.entryLabels = data.attributes.labels;
      this.entrySentiment = data.attributes.sentiments[0];
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

  presentUpdateModal() {
    let entry = { id: this.entryId, title: this.entryTitle, body: this.entryBody };
    let updateModal = this.modalCtrl.create('UpdateThoughtModalPage', entry);

    updateModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntriesShowPage');
  }

}
