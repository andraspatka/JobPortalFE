import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobsPortalComponent } from './jobs-portal/jobs-portal.component';
import { JobsPortalStartComponent } from './jobs-portal/jobs-portal-start/jobs-portal-start.component';
import { JobsPortalService } from './jobs-portal/jobs-portal.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    JobsPortalComponent,
    JobsPortalStartComponent,
    LoadingSpinnerComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [JobsPortalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
