import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { StatsPieChart } from '../../data/data';
import { SentimentsProvider } from '../../providers/sentiments/sentiments';

import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  title: string = 'D3 Pie Chart in Ionic 3';

  margin = {top: 20, right: 20, bottom: 30, left: 50};
  width: number;
  height: number;
  radius: number;

  arc: any;
  labelArc: any;
  labelPer: any;
  pie: any;
  color: any;
  svg: any;
  sentiments: any;

  constructor(public modalCtrl: ModalController, public labelsProvider: SentimentsProvider) {
    this.labelsProvider.getSentiments().subscribe((data) => {
      console.log(data);
      this.sentiments = data.sentiments.map((x : any) => ({sentiment: x.name, amount: x.taggings_count}));
      this.initSvg();
      this.drawPie();
    });
    this.width = 900 - this.margin.left - this.margin.right ;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  presentThoughtModal() {
    let thoughtModal = this.modalCtrl.create('ThoughtModalPage');
    thoughtModal.present();
  }

  initSvg() {
    this.color = d3Scale.scaleOrdinal()
      .range(["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "grey", "#00FA9A"]);
    this.arc = d3Shape.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(100);
    this.labelArc = d3Shape.arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);

    this.labelPer = d3Shape.arc()
      .outerRadius(this.radius -80)
      .innerRadius(this.radius -80);


    this.pie = d3Shape.pie()
      .sort(null)
      .value((d: any) => d.amount);

    this.svg = d3.select("#pieChart")
      .append("svg")
      .attr("width", '100%')
      .attr("height", '100%')
      .attr('viewBox','0 0 '+Math.min(this.width,this.height)+' '+Math.min(this.width,this.height))
      .append("g")
      .attr("transform", "translate(" + Math.min(this.width,this.height) / 2 + "," + Math.min(this.width,this.height) / 2 + ")");
  }

  drawPie() {
    let g = this.svg.selectAll(".arc")
      .data(this.pie(this.sentiments))
      .enter().append("g")
      .attr("class", "arc");
    g.append("path").attr("d", this.arc)
      .style("fill", (d: any) => this.color(d.data.sentiment) );
    g.append("text").attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
      .attr("dy", ".35em")
      .text((d: any) => d.data.sentiment);

    g.append("text").attr("transform", (d: any) => "translate(" + this.labelPer.centroid(d) + ")")
      .attr("dy", ".35em")
      .text((d: any) => d.data.amount);
  }


}
