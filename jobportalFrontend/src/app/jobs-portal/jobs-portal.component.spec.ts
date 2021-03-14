import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsPortalComponent } from './jobs-portal.component';

describe('JobsPortalComponent', () => {
  let component: JobsPortalComponent;
  let fixture: ComponentFixture<JobsPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
