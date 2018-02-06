import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EntriesProvider } from '../../providers/entries/entries';

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {
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
  {data: [], label: 'Thoughts'}
];

  lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40]
  ];
  lineChartLabels:Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  lineChartType:string = 'line';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public entriesProvider: EntriesProvider
  ) {
    this.entriesProvider.getWeeklyThoughts().subscribe((data) => {
      this.entries = data.week;
      for (let entry of this.entries) {
        this.barChartLabels.push(this.weekdays[new Date(entry.date).getDay()]);
        this.barChartData[0].data.push(entry.amount);
      }
      this.isDataAvailable = true;
      console.log(this.barChartLabels);
    });
  }


  chartClicked(e:any):void {
    console.log(e);
  }

  chartHovered(e:any):void {
    console.log(e);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');
  }

}
