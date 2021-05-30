import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobsPortalComponent } from './jobs-portal/jobs-portal.component';
import { JobsPortalService } from './jobs-portal/jobs-portal.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { JobsPortalListComponent } from './jobs-portal/jobs-portal-list/jobs-portal-list.component';
import { JobsPortalItemComponent } from './jobs-portal/jobs-portal-list/jobs-portal-item/jobs-portal-item.component';
import { JobsPortalEditPostingComponent } from './jobs-portal/jobs-portal-edit-posting/jobs-portal-edit-posting.component';
import { JobsPortalNewPostingComponent } from './jobs-portal/jobs-portal-new-posting/jobs-portal-new-posting.component';
import { RequestsComponent } from './requests/requests.component';
import { JobsPortalApplyToPostingComponent } from './jobs-portal/jobs-portal-apply-to-posting/jobs-portal-apply-to-posting.component';
import { JobsPortalSeeMyApplicationsComponent } from './jobs-portal/jobs-portal-see-my-applications/jobs-portal-see-my-applications.component';
import { JobsPortalSeeApplicationsForPostingComponent } from './jobs-portal/jobs-portal-see-applications-for-posting/jobs-portal-see-applications-for-posting.component';
import { JobsPortalStatisticsComponent } from './jobs-portal/jobs-portal-statistics/jobs-portal-statistics.component';
import { ChartsComponent } from './jobs-portal/jobs-portal-statistics/charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    JobsPortalComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    JobsPortalItemComponent,
    JobsPortalListComponent,
    JobsPortalEditPostingComponent,
    JobsPortalNewPostingComponent,
    RequestsComponent,
    JobsPortalApplyToPostingComponent,
    JobsPortalSeeMyApplicationsComponent,
    JobsPortalSeeApplicationsForPostingComponent,
    JobsPortalStatisticsComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [JobsPortalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
