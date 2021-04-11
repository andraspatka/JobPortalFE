import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { JobsPortalApplyToPostingComponent } from './jobs-portal/jobs-portal-apply-to-posting/jobs-portal-apply-to-posting.component';
import { JobsPortalEditPostingComponent } from './jobs-portal/jobs-portal-edit-posting/jobs-portal-edit-posting.component';
import { JobsPortalListComponent } from './jobs-portal/jobs-portal-list/jobs-portal-list.component';
import { JobsPortalNewPostingComponent } from './jobs-portal/jobs-portal-new-posting/jobs-portal-new-posting.component';
import { JobsPortalSeeApplicationsForPostingComponent } from './jobs-portal/jobs-portal-see-applications-for-posting/jobs-portal-see-applications-for-posting.component';
import { JobsPortalSeeMyApplicationsComponent } from './jobs-portal/jobs-portal-see-my-applications/jobs-portal-see-my-applications.component';
import { JobsPortalComponent } from './jobs-portal/jobs-portal.component';
import { RequestsComponent } from './requests/requests.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/jobs-portal', pathMatch: 'full' },
  {
    path:'jobs-portal',
    canActivate:[AuthGuard],
    component: JobsPortalComponent
  },
  {
    path:'new-posting',
    canActivate:[AuthGuard],
    component:JobsPortalNewPostingComponent

  },
  {
    path:'edit-posting/:id',
    canActivate:[AuthGuard],
    component:JobsPortalEditPostingComponent
  },
  {
    path:'apply-to-posting/:id',
    canActivate:[AuthGuard],
    component:JobsPortalApplyToPostingComponent
  },
  {
    path:'myapplications/:id',
    canActivate:[AuthGuard],
    component:JobsPortalSeeMyApplicationsComponent
  },
  {
    path:'applications-for-posting/:id',
    canActivate:[AuthGuard],
    component:JobsPortalSeeApplicationsForPostingComponent
  },
  {
    path:'auth',
    component:AuthComponent
  },
  {
    path:'requests',
    component:RequestsComponent,
    canActivate:[AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
