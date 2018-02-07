import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EntriesProvider } from '../../providers/entries/entries';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
    public entriesProvider: EntriesProvider
  ) {
    this.entriesProvider.getWeeklyThoughts().subscribe((data) => {
      this.entries = data;
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


  chartClicked(e:any):void {
    console.log(e);
  }

  chartHovered(e:any):void {
    console.log(e);
  }

}
