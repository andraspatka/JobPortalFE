import { Component, Input, OnInit } from '@angular/core';
import { Posting } from '../../posting.model';

@Component({
  selector: 'app-jobs-portal-item',
  templateUrl: './jobs-portal-item.component.html',
  styleUrls: ['./jobs-portal-item.component.css']
})
export class JobsPortalItemComponent implements OnInit {

  @Input() index:number;
  @Input() posting:Posting;
  constructor() { }

  ngOnInit() {
  }

}
