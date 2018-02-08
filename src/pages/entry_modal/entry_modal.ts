import { Component } from '@angular/core';
import { App, IonicPage, NavController, ViewController, ToastController } from 'ionic-angular';
import { EntriesProvider } from '../../providers/entries/entries';
import { LabelsProvider } from '../../providers/labels/labels';
import { AnalyticsProvider} from "../../providers/analytics/analytics";
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-entry_modal',
  templateUrl: 'entry_modal.html',
})

export class EntryModalPage {
  entry = { label_list: undefined, body: undefined };
  inputVal :any;
  labels :any;
  count :any;
  label :boolean;
  suggestedLabels :any;

  constructor(private view: ViewController,
              public navCtrl: NavController,
              public entriesProvider: EntriesProvider,
              public labelsProvider: LabelsProvider,
              public analyticsProvider: AnalyticsProvider,
              private toastCtrl: ToastController,
              public appCtrl: App) {

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

  presentToast(msg, duration) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: duration,
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

  createEntry() {
    this.entriesProvider.saveEntry(this.entry)
    .subscribe(
      data => {
        this.presentToast("Entry was successfully created.", 2000);
        this.closeModal();
    },
      err => {
        if (err.json().status == 400 || err.json().error.length == 4) {
          this.presentToast("No fields can't be blank", 2000)
        }
        else {
          this.presentToast(err.json().error.join(', '), 2500)
        }
      }
    )
  }

  blur() {
    if(this.entry.body) {
      this.analyticsProvider.getLabels(this.entry.body)
        .subscribe(
          data => this.suggestedLabels = (data.documents[0].keyPhrases)
        )
    }
  }

}
