import { LabelsProvider } from '../../providers/labels/labels';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LabelsShowPage } from './../labels-show/labels-show';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";

@IonicPage()
@Component({
  selector: 'page-labels-index',
  templateUrl: 'labels-index.html',
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => *', animate('500ms'))
    ])
  ]
})
export class LabelsIndexPage {
  visibility: string = 'hidden';
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
      this.visibility = 'shown';
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
