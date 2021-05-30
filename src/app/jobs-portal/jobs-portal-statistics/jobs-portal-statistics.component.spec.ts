import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsPortalStatisticsComponent } from './jobs-portal-statistics.component';

describe('JobsPortalStatisticsComponent', () => {
  let component: JobsPortalStatisticsComponent;
  let fixture: ComponentFixture<JobsPortalStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsPortalStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsPortalStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
