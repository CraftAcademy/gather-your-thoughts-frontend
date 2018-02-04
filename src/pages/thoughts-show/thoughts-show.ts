import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { ThoughtsProvider } from '../../providers/thoughts/thoughts';
import { HomePage } from '../../pages/home/home';
import { UpdateThoughtModalPage } from '../../pages/update-thought-modal/update-thought-modal';

@IonicPage()
@Component({
  selector: 'page-thoughts-show',
  templateUrl: 'thoughts-show.html',
})
export class ThoughtsShowPage {
  entryId :any;
  entryTitle :any;
  entryBody :any;
  thoughtLabels :any;
  thoughtSentiment: any;
  thought = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public thoughtsProvider: ThoughtsProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController

  ) {
    if (this.navParams.get('id')) {
      this.entryId = this.navParams.get('id');
    }

    if (this.navParams.get('msg')) {
      let toast = this.toastCtrl.create({
        message: this.navParams.get('msg'),
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }

    this.thoughtsProvider.getThought(this.thoughtId).subscribe(({ data }) => {
      this.entryTitle = data.attributes.title;
      this.entryBody = data.attributes.body;
      this.thoughtLabels = data.attributes.labels;
      this.thoughtSentiment = data.attributes.sentiments[0];
    });
  }

  deletePopup() {
    let alert = this.alertCtrl.create({
      title: 'Confirm deletion',
      message: `Do you wish to delete ${this.entryTitle} thought?`,
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
            this.thoughtsProvider.deleteThought(this.entryId).subscribe((data) => {
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
    let entry = { id: this.entryId, title: this.entrytTitle, body: this.entryBody };
    let updateModal = this.modalCtrl.create('UpdateThoughtModalPage', entry);

    updateModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThoughtsShowPage');
  }

}
