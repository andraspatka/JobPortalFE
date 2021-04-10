import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { JobsPortalEditPostingComponent } from './jobs-portal/jobs-portal-edit-posting/jobs-portal-edit-posting.component';
import { JobsPortalListComponent } from './jobs-portal/jobs-portal-list/jobs-portal-list.component';
import { JobsPortalNewPostingComponent } from './jobs-portal/jobs-portal-new-posting/jobs-portal-new-posting.component';
import { JobsPortalComponent } from './jobs-portal/jobs-portal.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/jobs-portal', pathMatch: 'full' },
  {
    path:'jobs-portal',
    canLoad:[AuthGuard],
    component: JobsPortalComponent
  },
  {
    path:'new-posting',
    canLoad:[AuthGuard],
    component:JobsPortalNewPostingComponent

  },
  {
    path:'edit-posting/:id',
    canLoad:[AuthGuard],
    component:JobsPortalEditPostingComponent
  },
  {
    path:'auth',
    component:AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
