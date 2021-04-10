import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Requests } from './requests.model';
import { RequestsService } from './requests.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(private reuqetsService:RequestsService,
    private router:Router) { }
  myrequests:Requests[];
  ngOnInit() {
    this.reuqetsService.fetchMyRequests().subscribe();
    this.reuqetsService.myrequests.subscribe(listOfRequests=>{
      this.myrequests = listOfRequests;
    })
  }

  onAccept(id:number){
    this.reuqetsService.handleRequest(id,"APPROVED").subscribe(()=>{
      this.router.navigate(['/jobs-portal'])
    });
  }
  onDecline(id:number){
    this.reuqetsService.handleRequest(id,"DECLINED").subscribe(()=>{
      this.router.navigate(['/jobs-portal'])
    });

  }

}
