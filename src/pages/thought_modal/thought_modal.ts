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
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  closeModal() {
    this.view.dismiss();
  }

  getErrorMessageFrom(error) {
    return error.json().error[0];
  }

  ionViewDidLoad() {
  }

  createThought() {
    this.thoughtsProvider.saveThought(this.thought)
    .subscribe(
      data => {
        this.presentToast("Thought was successfully created.");
        this.closeModal();
    },
      error => this.presentToast(this.getErrorMessageFrom(error))
    )
  }

}
