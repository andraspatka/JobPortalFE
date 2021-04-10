import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { JobsPortalService } from './jobs-portal.service';

@Component({
  selector: 'app-jobs-portal',
  templateUrl: './jobs-portal.component.html',
  styleUrls: ['./jobs-portal.component.css']
})
export class JobsPortalComponent implements OnInit {

  constructor(private jobPortalService:JobsPortalService) { }

  ngOnInit() {
    this.jobPortalService.fetchPostings().subscribe(()=>{
      console.log('S-a apelat fetchPostings');
    });
  }
}
