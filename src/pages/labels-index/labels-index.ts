import { LabelsProvider } from '../../providers/labels/labels';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-labels-index',
  templateUrl: 'labels-index.html',
})
export class LabelsIndexPage {
  labels: any;

  constructor(public labelsProvider: LabelsProvider) {
    this.labelsProvider.getLabels().subscribe((data) => {
      console.log(data);
    });
  }

  ionViewDidLoad() {

  }

}
