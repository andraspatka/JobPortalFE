import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsPortalStartComponent } from './jobs-portal-start.component';

describe('JobsPortalStartComponent', () => {
  let component: JobsPortalStartComponent;
  let fixture: ComponentFixture<JobsPortalStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsPortalStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsPortalStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
