import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Application } from '../application.model';
import { JobsPortalService } from '../jobs-portal.service';

@Component({
  selector: 'app-jobs-portal-see-my-applications',
  templateUrl: './jobs-portal-see-my-applications.component.html',
  styleUrls: ['./jobs-portal-see-my-applications.component.css']
})
export class JobsPortalSeeMyApplicationsComponent implements OnInit {

  constructor(private jobsPortalServie:JobsPortalService,
    private router:Router) { }
  myApplications:Application[];
  myApplicationsSubscription:Subscription;
  deleteSubscription:Subscription;

  ngOnInit() {
    this.myApplicationsSubscription = this.jobsPortalServie.fetchMyApplications().subscribe();
    this.jobsPortalServie.myapplications.subscribe(listOfApplications=>{
      this.myApplications = listOfApplications;
    })
  }

  ngOnDestroy(){
    if(this.myApplicationsSubscription)
      this.myApplicationsSubscription.unsubscribe();
    if(this.deleteSubscription)
      this.deleteSubscription.unsubscribe();
  }
  onDeleteApplication(id:number){
    this.deleteSubscription= this.jobsPortalServie.onDeleteApplication(id).subscribe(()=>{
      this.router.navigate(['/jobs-portal']);
    });
  }
  goBack(){
    this.router.navigate(['/jobs-portal']);
  }
}
