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
      this.labels.sort(function(a, b) {
        var x = a.taggings_count;
        var y = b.taggings_count;

        if (x > y) {
          return -1;
        }
        if (y > x) {
          return 1;
        }
        return 0;
      });
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
