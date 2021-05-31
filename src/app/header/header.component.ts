import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RequestsService } from '../requests/requests.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;
  private userSub: Subscription;
  user = null;
  userRole = null;
  userId = null;
  constructor(
    private authService: AuthService,
    private requestService:RequestsService,
    private router:Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      console.log(user);
      if(user){
        this.userId = user.id;
        this.user = user;
        this.userRole = user.role;
      }

      this.isAuthenticated = !!user;

    });
  }

  onNewPosting() {
    this.router.navigate(['/new-posting']);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  onSeeMyRequests() {
    this.router.navigate(['/requests']);

  }
  onSendRequestToBecomeEmployer() {
    this.requestService.sendRequestToBecomeEmployer().subscribe(()=>{
      this.router.navigateByUrl('/jobs-portal', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/jobs-portal']);
    });
    })
  }
  onSendSeeMyApplications(){
    this.router.navigate(['/myapplications',this.userId]);
  }
  onSendSeeStatistics(){
    this.router.navigate(['/statistics']);
  }
}
