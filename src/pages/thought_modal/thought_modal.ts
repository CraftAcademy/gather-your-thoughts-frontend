import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ThoughtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-thought_modal',
  templateUrl: 'thought_modal.html',
})
export class ThoughtModalPage {

  constructor(private navParams: NavParams, private view: ViewController) {
  }

  closeModal() {
    this.view.dismiss();
  }

  ionViewDidLoad() {
  }

}
