import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { JobsPortalStartComponent } from './jobs-portal/jobs-portal-start/jobs-portal-start.component';
import { JobsPortalComponent } from './jobs-portal/jobs-portal.component';

const appRoutes: Routes = [
  {path:'',redirectTo:'/auth',pathMatch:'full'},
  {
    path:'jobs-portal',
    component: JobsPortalComponent,
    children:[
      {path:'',component:JobsPortalStartComponent}
    ]
  },
  {path:'auth',component:AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
