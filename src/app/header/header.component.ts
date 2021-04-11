import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;
  private userSub: Subscription;
  user = null;
  userRole = null
  constructor(
    private authService: AuthService,
    private router:Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      console.log(user);
      this.user = user;
      this.userRole = user.role;
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
}
