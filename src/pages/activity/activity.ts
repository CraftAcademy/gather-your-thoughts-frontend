import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { EntriesProvider } from '../../providers/entries/entries';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => *', animate('500ms'))
    ])
  ]
})
export class ActivityPage {
  top_sentiments: any;
  sentiment_img: any;
  visibility: string = 'hidden';
  entries: any;
  weekdays:string[] = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  isDataAvailable: boolean = false;
  barChartOptions:any = {
  scaleShowVerticalLines: true,
  responsive: true
};
  barChartLabels:string[] = [];
  barChartType:string = 'bar';
  barChartLegend:boolean = true;
  barChartColors: any [] =[{ backgroundColor:'#89D0FF' }];
  barChartData:any[] = [
  {data: [], label: 'Entries'}
];

  lineChartData:any[] = [
    {data: [], label: 'Entries'}
  ];
  lineChartLabels:Array<any> = [];
  lineChartType:string = 'line';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public entriesProvider: EntriesProvider
  ) {
    this.entriesProvider.getWeeklyThoughts().subscribe((data) => {
      this.entries = data;
      this.top_sentiments = data.sentiment_week;
      for (let sentiment of this.top_sentiments) {
        sentiment.imagePath = `assets/icon/${sentiment.name.toLowerCase()}.ico`
      }
      for (let day of this.entries.week) {
        this.barChartLabels.push(this.weekdays[new Date(day.date).getDay()]);
        this.barChartData[0].data.push(day.amount);
      }
      for (let month of this.entries.months) {
        this.lineChartLabels.push(month.month);
        this.lineChartData[0].data.push(month.amount);
      }
      this.isDataAvailable = true;
      this.visibility = 'shown';
    });
  }

  sentimentPopup(name, amount) {
    let alert = this.alertCtrl.create({
    title: `Sentiment: ${name}`,
    subTitle: `Thoughts: ${amount}`,
    buttons: ['Dismiss'],
    cssClass: 'alertCustomCss'
  });
  alert.present();
}

  chartClicked(e:any):void {
    console.log(e);
  }

  chartHovered(e:any):void {
    console.log(e);
  }

}
