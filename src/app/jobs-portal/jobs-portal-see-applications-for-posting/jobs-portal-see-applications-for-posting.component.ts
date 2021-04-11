import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Application } from '../application.model';
import { JobsPortalService } from '../jobs-portal.service';

@Component({
  selector: 'app-jobs-portal-see-applications-for-posting',
  templateUrl: './jobs-portal-see-applications-for-posting.component.html',
  styleUrls: ['./jobs-portal-see-applications-for-posting.component.css']
})
export class JobsPortalSeeApplicationsForPostingComponent implements OnInit {

  constructor(private jobsPortalServie:JobsPortalService,
    private router:Router,
    private route:ActivatedRoute) { }

  applications:Application[];
  applicationsSubscription:Subscription;
  deleteSubscription:Subscription;
  postingId=null;
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.postingId = +params['id'];
    });
    this.applicationsSubscription = this.jobsPortalServie.fetchPostingsApplications(this.postingId).subscribe();
    this.jobsPortalServie.postingsapplications.subscribe(listOfApplications=>{
      this.applications = listOfApplications;
    })
  }

  ngOnDestroy(){
    if(this.applicationsSubscription)
      this.applicationsSubscription.unsubscribe();
    if(this.deleteSubscription)
      this.deleteSubscription.unsubscribe();
  }

  goBack(){
    this.router.navigate(['/jobs-portal']);
  }
}
