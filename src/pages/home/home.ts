import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { SentimentsProvider } from '../../providers/sentiments/sentiments';
import { EntriesProvider } from '../../providers/entries/entries'
import { EntriesShowPage } from "../entries-show/entries-show";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  sentiments: any;
  entries: any;
  doughnutChartLabels:string[] = [];
  doughnutChartData:number[] = [];
  doughnutChartColors:any[] = [{
    backgroundColor:["#FCAE3B", "#89D0FF", "#69FB5F", "#F6FE5C", "#FD6153"]
  }];
  doughnutChartType:string = 'doughnut';
  isDataAvailable:boolean = false;

  constructor(public modalCtrl: ModalController,
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
        this.isDataAvailable = true;

      }
    });

    this.entriesProvider.getRecentEntries().subscribe(({data}) => {
      this.entries = data.reverse();
    })
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  presentEntryModal() {
    let entryModal = this.modalCtrl.create('EntryModalPage');
    entryModal.onDidDismiss(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    });
    entryModal.present();
  }

  navigateToEntry(entryId) {
    this.navCtrl.push(EntriesShowPage, {
      id: entryId
    });
  }

}
