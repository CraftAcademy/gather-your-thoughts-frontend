import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { EntriesProvider } from '../../providers/entries/entries';
import { EntriesShowPage } from '../../pages/entries-show/entries-show';

@IonicPage()
@Component({
  selector: 'page-update-thought-modal',
  templateUrl: 'update-thought-modal.html',
})
export class UpdateThoughtModalPage {
  entry = { title: this.navParams.get('title'), body: this.navParams.get('body') };

  constructor(
    private view: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public entriesProvider: EntriesProvider,
    public appCtrl: App
  ) {
  }

  closeModal() {
    this.view.dismiss();
  }

  presentToast(msg) {
    this.appCtrl.getRootNav().setRoot(EntriesShowPage, {
      id: this.navParams.get('id'), msg: msg
    });
  }

  updateEntry() {
    this.entriesProvider.updateEntry(this.navParams.get('id'), this.entry)
    .subscribe(
      data => {
        this.closeModal();
        this.presentToast(data.json().message);
    },
      error => this.presentToast(error.json().error.join(', '))
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateThoughtModalPage');
  }

}
