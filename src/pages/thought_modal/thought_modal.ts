import { Component } from '@angular/core';
import { IonicPage, ViewController, ToastController } from 'ionic-angular';
import { ThoughtsProvider } from '../../providers/thoughts/thoughts';


@IonicPage()
@Component({
  selector: 'page-thought_modal',
  templateUrl: 'thought_modal.html',
})

export class ThoughtModalPage {
  thought = {}

  constructor(private view: ViewController,
              public thoughtsProvider: ThoughtsProvider,
              private toastCtrl: ToastController) {
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2500,
      position: 'top'
    });

    toast.present();
  }

  closeModal() {
    this.view.dismiss();
  }

  thoughtCreate(flash_msg) {
    if (flash_msg == "Thought was successfully created.") {
      this.closeModal();
    }
    this.presentToast(flash_msg)
  }

  ionViewDidLoad() {
  }

  createThought() {
    this.thoughtsProvider.saveThought(this.thought)
    .subscribe(data => this.thoughtCreate("Thought was successfully created."),
              data => console.log(data._body))
  }

}
