import { Component, OnInit,  ElementRef, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobsPortalService } from '../../jobs-portal.service';
import { Statistics } from '../../statistic.model';
import { TypesEvents } from '../types.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit,OnDestroy {

  constructor(private jobsPortalService:JobsPortalService,private router:Router,
    private elementRef:ElementRef) { }


  myChart:any;
  statistics: Statistics[];
  statisticsSubscription: Subscription;
  type:TypesEvents;
  labels = [
  {"label":"USER_FIND_ID","app":0},
  {"label":"USER_LOGGED_IN","app":0},
  {"label":"USER_LOGGED_OUT","app":0},
  {"label":"USER_REGISTERED","app":0},
  {"label":"COMPANIES_GET","app":0},
  {"label":"APPLICATION_DELETED","app":0},
  {"label":"APPLICATION_ADDED","app":0},
  {"label":"APPLICATIONS_OF_POSTING","app":0},
  {"label":"APPLICATIONS_OF_USER","app":0},
  {"label": "APPLICATIONS_FIND_ALL","app":0},
  {"label":"CATEGORIES_FIND_ALL", "app":0},
  {"label":"POSTINGS_FIND_ALL","app":0},
  {"label":"POSTING_DELETE", "app":0},
  {"label":"POSTING_UPDATE","app":0},
  {"label":"POSTING_ADD","app":0}];

  ngOnInit() {
    this.statisticsSubscription = this.jobsPortalService.fetchStatistics().subscribe();
    this.jobsPortalService.statistics.subscribe(list=>{
      this.statistics = list;
    })
    console.log(this.statistics)
    this.createChart()

  }

  ngOnDestroy(): void {
    if(this.myChart)
      this.myChart.destroy();
    if(this.statisticsSubscription)
      this.statisticsSubscription.unsubscribe();
  }

  createChart(){

    console.log(this.labels[0])
    this.labels.forEach(element => {
      var appearence = this.statistics.filter(value => value.type === element.label).length
      element.app = appearence;
    });

    // let htmlRef = this.elementRef.nativeElement.querySelector('#yourCavasId');
    // this.myChart = new Chart(htmlRef, {
    //     type:'line',
    //     data: {
    //       labels:this.labels,
    //       datasets:[
    //         {
    //           data: [user_logged_in, user_logged_out,user_register, companies_get,
    //             companies_get,application_deleted, application_added,application_posting,
    //             application_user, application_find_all,categories_find_all, posting_find_all,
    //             posting_delete, posting_update, posting_add],
    //           borderColor: "#ff99dd"
    //         }]
    //     },
    //     options:{
    //       scales: {
    //         x: {
    //           beginAtZero: true
    //         },
    //         y: {
    //             beginAtZero: true
    //         }
    //     }
    //     }
    // })
    //this.myChart.destroy()
  }
  goBack(){
    this.router.navigate(['/statistics']);
  }

}
