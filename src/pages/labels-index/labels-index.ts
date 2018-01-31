import { LabelsProvider } from '../../providers/labels/labels';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LabelsShowPage } from './../labels-show/labels-show';

@IonicPage()
@Component({
  selector: 'page-labels-index',
  templateUrl: 'labels-index.html',
})
export class LabelsIndexPage {
  labels: any;

  constructor(
    public labelsProvider: LabelsProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.labelsProvider.getLabels().subscribe((data) => {
      this.labels = data.labels;
    });
  }

  navigateToLabel(labelId, labelName) {
    this.navCtrl.push(LabelsShowPage, {
      id: labelId, name: labelName
    });
  }

  ionViewDidLoad() {

  }

}
