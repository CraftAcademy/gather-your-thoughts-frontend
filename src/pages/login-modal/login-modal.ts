import { Component } from '@angular/core';
import { App, IonicPage, NavController, ViewController, NavParams, ToastController } from 'ionic-angular'
import { AuthenticationProvider} from "../../providers/authentication/authentication";
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-modal',
  templateUrl: 'login-modal.html',
})
export class LoginModalPage {
  loginCredentials = {}

  constructor(public navCtrl: NavController,
              private view: ViewController,
              public navParams: NavParams,
              public authenticationProvider: AuthenticationProvider,
              public appCtrl: App,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginModalPage');
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

  login() {
    this.authenticationProvider.login(this.loginCredentials)
      .subscribe(
        res => {
          this.authenticationProvider.currentUser = res.json().data;
          this.presentToast(`Successfully logged in as ${this.authenticationProvider.currentUser.email}`, 2200)
        },
        err => this.presentToast(err.json().errors[0], 2200)
      );
    this.closeModal();
  }

}
