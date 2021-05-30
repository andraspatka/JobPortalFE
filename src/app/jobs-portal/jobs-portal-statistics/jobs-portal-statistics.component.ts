import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobsPortalService } from '../jobs-portal.service';
import { Statistics } from '../statistic.model';

@Component({
  selector: 'app-jobs-portal-statistics',
  templateUrl: './jobs-portal-statistics.component.html',
  styleUrls: ['./jobs-portal-statistics.component.css']
})
export class JobsPortalStatisticsComponent implements OnInit, OnDestroy {

  constructor(private jobsPortalService:JobsPortalService, private router:Router) {
  }

  statistics: Statistics[];
  statisticsSubscription: Subscription;

  ngOnDestroy(): void {
    if(this.statisticsSubscription)
      this.statisticsSubscription.unsubscribe();
  }

  ngOnInit() {
    this.statisticsSubscription = this.jobsPortalService.fetchStatistics().subscribe();
    this.jobsPortalService.statistics.subscribe(list=>{
      this.statistics = list;
    })
  }

  goBack(){
    this.router.navigate(['/jobs-portal']);
  }

  onSeeCharts(){
    this.router.navigate(['/statistics/charts'])
  }
}
