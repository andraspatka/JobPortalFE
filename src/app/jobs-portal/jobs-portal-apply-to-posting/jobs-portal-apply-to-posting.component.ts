import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Application } from '../application.model';
import { JobsPortalService } from '../jobs-portal.service';

@Component({
  selector: 'app-jobs-portal-apply-to-posting',
  templateUrl: './jobs-portal-apply-to-posting.component.html',
  styleUrls: ['./jobs-portal-apply-to-posting.component.css'],
  providers: [DatePipe]
})
export class JobsPortalApplyToPostingComponent implements OnInit,OnDestroy {

  constructor(
    private route:ActivatedRoute,
    private jobsPortalService:JobsPortalService,
    private authService:AuthService,
    private datePipe: DatePipe,
    private router:Router) { }

    postinId: number;
    applicantId:number;
    applicationForm: FormGroup;
    userSubscription:Subscription;
    applySubscription:Subscription;
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.postinId = +params['id'];
    });
    this.initForm();
    this.userSubscription= this.authService.user.subscribe(user => {
      this.applicantId = +user.id;
    });
  }

  ngOnDestroy(){
    if(this.userSubscription)
      this.userSubscription.unsubscribe();
    if(this.applySubscription)
      this.applySubscription.unsubscribe();
  }

  onSubmit() {
    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const application = new Application(
    this.applicationForm.value.numberYearsExperience,
    this.applicationForm.value.workingExperience,
    this.applicationForm.value.education,
    currentDate,
    this.applicantId,
    this.postinId);

    this.applySubscription = this.jobsPortalService.onApplyToPosting(application).subscribe(()=>{
      this.onCancel();
    });
  }

  onCancel() {
    this.router.navigate(['/jobs-portal']);
  }

  private initForm() {
    this.applicationForm = new FormGroup({
      numberYearsExperience:new FormControl(null,Validators.required),
      workingExperience: new FormControl(null,Validators.required),
      education:new FormControl(null,Validators.required),
    });
  }

}
