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
    JobsPortalNewPostingComponent
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
