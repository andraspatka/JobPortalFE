import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobsPortalService } from '../jobs-portal.service';
import { Posting } from '../posting.model';

@Component({
  selector: 'app-jobs-portal-list',
  templateUrl: './jobs-portal-list.component.html',
  styleUrls: ['./jobs-portal-list.component.css']
})
export class JobsPortalListComponent implements OnInit,OnDestroy {

  postings:Posting[];
  postingsSubscription:Subscription;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private jobsPortalService:JobsPortalService) { }

  ngOnInit() {
    this.postingsSubscription = this.jobsPortalService.postings.subscribe(
      (postingList)=>{
        this.postings = postingList;
      }
    );
  }


  onDeletePosting(i:number){
   this.jobsPortalService.deletePosting(i).subscribe(()=>{
     this.jobsPortalService.fetchPostings().subscribe();
   })
  }

  ngOnDestroy() {
    this.postingsSubscription.unsubscribe();
  }

  onEditPosting(id:number){
    this.router.navigate(['/edit-posting',id]);
  }
}
