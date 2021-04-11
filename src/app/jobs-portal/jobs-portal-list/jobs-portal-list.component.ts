import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
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
  userSubcription:Subscription;
  userRole = null;
  id=null;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private authService:AuthService,
    private jobsPortalService:JobsPortalService) { }

  ngOnInit() {
    this.postingsSubscription = this.jobsPortalService.postings.subscribe(
      (postingList)=>{
        this.postings = postingList;
      }
    );
    this.userSubcription = this.authService.user.subscribe(user => {
      this.userRole = user.role;
      this.id = user.id;
    });
  }


  onDeletePosting(i:number){
   this.jobsPortalService.deletePosting(i).subscribe(()=>{
     this.jobsPortalService.fetchPostings().subscribe();
   })
  }

  ngOnDestroy() {
    if(this.postingsSubscription)
      this.postingsSubscription.unsubscribe();
    if(this.userSubcription)
      this.userSubcription.unsubscribe();
  }

  onEditPosting(id:number){
    this.router.navigate(['/edit-posting',id]);
  }
  onApply(id:number){
    this.router.navigate(['/apply-to-posting',id]);
  }
  onUnapply(id:number){

  }
  onSeeAplicationsForThisPosting(id:number){
    this.router.navigate(['applications-for-posting',id]);
  }
}
