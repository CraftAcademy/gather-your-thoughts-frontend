import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, ToastController } from 'ionic-angular';
import { EntriesProvider } from '../../providers/entries/entries';
import { LabelsProvider } from '../../providers/labels/labels';

@IonicPage()
@Component({
  selector: 'page-entry_modal',
  templateUrl: 'entry_modal.html',
})

export class EntryModalPage {
  entry = { label_list: undefined };
  inputVal :any;
  labels :any;
  count :any;
  label :boolean;

  constructor(private view: ViewController,
              public navCtrl: NavController,
              public entriesProvider: EntriesProvider,
              public labelsProvider: LabelsProvider,
              private toastCtrl: ToastController) {

  this.labelsProvider.getLabels().subscribe((data) => {
    this.labels = data.labels;
    this.count = this.labels.length;
  });

  }

  newLabelSet(val) {
    this.entry.label_list = val;
    if (!this.inputVal) {
      this.entry.label_list = undefined;
    }
  }

  previousLabelSet() {
    if (this.entry.label_list && !this.inputVal) {
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
  }

  getErrorMessageFrom(error) {
    return error.json().error[0];
  }

  createEntry() {
    this.entriesProvider.saveEntry(this.entry)
    .subscribe(
      data => {
        this.presentToast("Entry was successfully created.");
        this.closeModal();
    },
      error => this.presentToast(this.getErrorMessageFrom(error))
    )
  }

}
