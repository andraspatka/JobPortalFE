import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobsPortalService } from './jobs-portal.service';

@Component({
  selector: 'app-jobs-portal',
  templateUrl: './jobs-portal.component.html',
  styleUrls: ['./jobs-portal.component.css']
})
export class JobsPortalComponent implements OnInit,OnDestroy {

  constructor(private jobPortalService:JobsPortalService) { }

  postingsSubscription:Subscription;
  ngOnInit() {
    this.postingsSubscription = this.jobPortalService.fetchPostings().subscribe(()=>{
      console.log('S-a apelat fetchPostings');
    });
  }
  ngOnDestroy(){
    if(this.postingsSubscription)
      this.postingsSubscription.unsubscribe();
  }
}
