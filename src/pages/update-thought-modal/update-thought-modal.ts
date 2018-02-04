import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ThoughtsProvider } from '../../providers/thoughts/thoughts';
import { ThoughtsShowPage } from '../../pages/thoughts-show/thoughts-show';

@IonicPage()
@Component({
  selector: 'page-update-thought-modal',
  templateUrl: 'update-thought-modal.html',
})
export class UpdateThoughtModalPage {
  entry = { title: this.navParams.get('title'), body: this.navParams.get('body') };
  msg :any;

  constructor(
    private view: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public thoughtsProvider: ThoughtsProvider,
    public appCtrl: App
  ) {
  }

  closeModal() {
    this.view.dismiss();
    this.appCtrl.getRootNav().setRoot(ThoughtsShowPage, {
      id: this.navParams.get('id'), msg: this.msg
    });
  }

  updateThought() {
    this.thoughtsProvider.updateThought(this.navParams.get('id'), this.entry).subscribe((data) => {
      if (data.json().message) {
        this.msg = data.json().message;
      }
      if (data.json().error) {
        this.msg = data.json().error;
      }
      this.closeModal();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateThoughtModalPage');
  }

}
