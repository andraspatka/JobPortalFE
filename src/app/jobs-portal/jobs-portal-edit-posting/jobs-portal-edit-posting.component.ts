import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobsPortalService } from '../jobs-portal.service';
import { PostingUpdate } from '../postingUpate.model';

@Component({
  selector: 'app-jobs-portal-edit-posting',
  templateUrl: './jobs-portal-edit-posting.component.html',
  styleUrls: ['./jobs-portal-edit-posting.component.css']
})
export class JobsPortalEditPostingComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    private jobsPortalService:JobsPortalService,
    private router:Router) { }

    id: number;
    postingForm: FormGroup;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
    this.initForm();
  }

  onSubmit() {
    const post = new PostingUpdate(
      this.id,
    this.postingForm.value.deadline,
    this.postingForm.value.name,
    this.postingForm.value.description,
    this.postingForm.value.requirements);

    console.log(post);
    this.jobsPortalService.updatePosting(post).subscribe(()=>{
      this.onCancel();
    });
  }

  onCancel() {
    this.router.navigate(['/jobs-portal']);
  }

  private initForm() {
    const posting = this.jobsPortalService.getPosting(this.id);
    this.postingForm = new FormGroup({
      name:new FormControl(posting.name,Validators.required),
      deadline: new FormControl(posting.deadline,Validators.required),
      description:new FormControl(posting.description,Validators.required),
      requirements: new FormControl(posting.requirements,Validators.required),
    });
  }
}
