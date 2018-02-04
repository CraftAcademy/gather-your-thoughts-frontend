import { Component } from '@angular/core';
import { App, IonicPage, NavController, ViewController, ToastController } from 'ionic-angular';
import { ThoughtsProvider } from '../../providers/thoughts/thoughts';
import { LabelsProvider } from '../../providers/labels/labels';
import { HomePage } from '../../pages/home/home'; 

@IonicPage()
@Component({
  selector: 'page-thought_modal',
  templateUrl: 'thought_modal.html',
})

export class ThoughtModalPage {
  thought = { label_list: undefined };
  inputVal :any;
  labels :any;
  count :any;
  label :boolean;

  constructor(private view: ViewController,
              public navCtrl: NavController,
              public thoughtsProvider: ThoughtsProvider,
              public labelsProvider: LabelsProvider,
              private toastCtrl: ToastController,
              public appCtrl: App) {

  this.labelsProvider.getLabels().subscribe((data) => {
    this.labels = data.labels;
    this.count = this.labels.length;
  });

  }

  newLabelSet(val) {
    this.thought.label_list = val;
    if (!this.inputVal) {
      this.thought.label_list = undefined;
    }
  }

  previousLabelSet() {
    if (this.thought.label_list && !this.inputVal) {
      this.label = true;
    }
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
    this.appCtrl.getRootNav().setRoot(HomePage);
  }

  getErrorMessageFrom(error) {
    return error.json().error[0];
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
