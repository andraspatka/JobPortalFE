import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Category } from '../category.model';
import { JobsPortalService } from '../jobs-portal.service';
import { PostingWithoutId } from '../postingWithoutId.model';

@Component({
  selector: 'app-jobs-portal-new-posting',
  templateUrl: './jobs-portal-new-posting.component.html',
  styleUrls: ['./jobs-portal-new-posting.component.css']
})
export class JobsPortalNewPostingComponent implements OnInit,OnDestroy {

  constructor(
    private route:ActivatedRoute,
    private jobsPortalService:JobsPortalService,
    private authService:AuthService,
    private router:Router) { }

    jobsSubscripiton:Subscription;
    addSubscription:Subscription;
    postingForm: FormGroup;
    categories:Category[];

  ngOnInit() {
    this.jobsSubscripiton = this.jobsPortalService.fetchCategories().subscribe((categoryList)=>{
      this.categories = categoryList;
    })
    this.initForm();
  }

  onSubmit() {
    let postedBy=0;
    this.authService.userId.pipe(
      take(1),
      map(userId=>{
        if (!userId){
          throw new Error('User not found');
        }
        postedBy=+userId;
      })
    ).subscribe();
    console.log(postedBy);
    const post = new PostingWithoutId(
    postedBy,
    this.postingForm.value.postedAt,
    this.postingForm.value.deadline,
    0,
    this.postingForm.value.name,
    this.postingForm.value.description,
    this.postingForm.value.category,
    this.postingForm.value.requirements)
    console.log(post);
   this.addSubscription =  this.jobsPortalService.addPosting(post).subscribe((res)=>{
      this.onCancel();
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    this.postingForm = new FormGroup({
      name:new FormControl(null,Validators.required),
      postedAt:new FormControl(null,Validators.required),
      deadline: new FormControl(null,Validators.required),
      description:new FormControl(null,Validators.required),
      requirements: new FormControl(null,Validators.required),
      category:new FormControl(null,Validators.required)
    });
  }
  ngOnDestroy(){
    if(this.jobsSubscripiton)
      this.jobsSubscripiton.unsubscribe();
    if(this.addSubscription)
      this.addSubscription.unsubscribe();
  }
}
