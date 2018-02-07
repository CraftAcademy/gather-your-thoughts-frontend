import { Component } from '@angular/core';
import { App, IonicPage, NavController, ViewController, NavParams, ToastController } from 'ionic-angular'
import { AuthenticationProvider} from "../../providers/authentication/authentication";
import {HomePage} from "../home/home";


@IonicPage()
@Component({
  selector: 'page-signup-modal',
  templateUrl: 'signup-modal.html',
})
export class SignupModalPage {
  signupCredentials = {}
  constructor(public navCtrl: NavController,
              private view: ViewController,
              public navParams: NavParams,
              public authenticationProvider: AuthenticationProvider,
              public appCtrl: App,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupModalPage');
  }

  closeModal() {
    this.view.dismiss();
    this.appCtrl.getRootNav().setRoot(HomePage);
  }

  presentToast(msg, duration) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: duration,
      position: 'top'
    });
    toast.present();
  }

  redirectToHome() {
    this.appCtrl.getRootNav().setRoot(HomePage);
  }

  signup() {
    this.authenticationProvider.signup(this.signupCredentials)
      .subscribe(
        res => {
          this.authenticationProvider.currentUser = res.json().data;
          this.redirectToHome();
          this.presentToast(`Welcome ${this.authenticationProvider.currentUser.email}! You are now logged in as well.`, 2500)
        },
        err => this.presentToast(err.json().errors.full_messages.join(', '), 3000)
      );
    this.closeModal();
  }

}
