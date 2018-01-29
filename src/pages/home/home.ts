import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public modalCtrl: ModalController) {
  }

  presentThoughtModal() {
    let thoughtModal = this.modalCtrl.create('ThoughtModalPage');
    thoughtModal.present();
  }

}
