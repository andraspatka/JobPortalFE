import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Requests } from './requests.model';
import { RequestsService } from './requests.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit, OnDestroy {

  constructor(private reuqetsService:RequestsService,
    private router:Router) { }
  myrequests:Requests[];
  myRequestSubscription:Subscription;
  handleRequestSubscription:Subscription;
  ngOnInit() {
    this.myRequestSubscription = this.reuqetsService.fetchMyRequests().subscribe();
    this.reuqetsService.myrequests.subscribe(listOfRequests=>{
      this.myrequests = listOfRequests;
    })
  }

  ngOnDestroy(){
    if(this.handleRequestSubscription)
      this.handleRequestSubscription.unsubscribe();
    if(this.myRequestSubscription)
      this.myRequestSubscription.unsubscribe();
  }
  onAccept(id:number){
    this.handleRequestSubscription= this.reuqetsService.handleRequest(id,"APPROVED").subscribe(()=>{
      this.router.navigate(['/jobs-portal'])
    });
  }
  onDecline(id:number){
    this.handleRequestSubscription= this.reuqetsService.handleRequest(id,"DECLINED").subscribe(()=>{
      this.router.navigate(['/jobs-portal'])
    });
  }
  goBack(){
    this.router.navigate(['/jobs-portal']);
  }
}
