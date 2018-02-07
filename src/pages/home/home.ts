import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { SentimentsProvider } from '../../providers/sentiments/sentiments';
import { EntriesProvider } from '../../providers/entries/entries'
import { EntriesShowPage } from "../entries-show/entries-show";
import { AuthenticationProvider} from "../../providers/authentication/authentication";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => *', animate('500ms'))
    ])
  ]
})


export class HomePage {
  visibility: string = 'hidden';
  sentiments: any;
  entries: any;
  doughnutChartLabels:string[] = [];
  doughnutChartData:number[] = [];
  doughnutChartColors:any[] = [{
    backgroundColor:[]
  }];
  doughnutChartType:string = 'doughnut';
  isDataAvailable:boolean = false;

  constructor(public modalCtrl: ModalController,
              public authenticationProvider: AuthenticationProvider,
              public sentimentsProvider: SentimentsProvider,
              public entriesProvider: EntriesProvider,
              public navCtrl: NavController,
              public navParams: NavParams,
              private toastCtrl: ToastController) {

      if (this.navParams.get('msg')) {
        let toast = this.toastCtrl.create({
          message: this.navParams.get('msg'),
          duration: 1500,
          position: 'top'
        });
        toast.present();
      }


    this.sentimentsProvider.getMonthSentiments().subscribe((data) => {
      this.sentiments = data.sentiments.map((x : any) => ({sentiment: x.name, amount: x.taggings_count}));
      for (let sentiment of this.sentiments) {
        this.doughnutChartLabels.push(sentiment.sentiment);
        this.doughnutChartData.push(sentiment.amount);
        switch(true) {
          case(sentiment.sentiment == "Happy"):
            this.doughnutChartColors[0].backgroundColor.push("#FCAE3B");
            break;
          case(sentiment.sentiment == "Sad"):
            this.doughnutChartColors[0].backgroundColor.push("#89D0FF");
            break;
          case(sentiment.sentiment == "Angry"):
            this.doughnutChartColors[0].backgroundColor.push("#FD6153");
            break;
          case(sentiment.sentiment == "Excited"):
            this.doughnutChartColors[0].backgroundColor.push("#69FB5F");
            break;
          default:
            this.doughnutChartColors[0].backgroundColor.push("#F6FE5C");
            break;
        }
        this.isDataAvailable = true;
        this.visibility = 'shown';
      }
    },err => this.visibility = 'shown');

    this.entriesProvider.getRecentEntries().subscribe(({data}) => {
      this.entries = data.reverse();
    });
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  presentEntryModal() {
    let entryModal = this.modalCtrl.create('EntryModalPage');
    entryModal.present();
  }

  navigateToEntry(entryId) {
    this.navCtrl.push(EntriesShowPage, {
      id: entryId
    });
  }

  getUser() {
    return this.authenticationProvider.currentUser;
  }

  openLogin() {
    let loginModal = this.modalCtrl.create('LoginModalPage');
    loginModal.present();
  }

  openSignup() {
    let signupModal = this.modalCtrl.create('SignupModalPage');
    signupModal.present();
  }

}
