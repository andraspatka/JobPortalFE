import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Company} from "./company.model";

export interface AuthResponseData {
  status: string,
  body: string
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  message: string = null;
  companies: Array<Company>;

  ngOnInit() {
    this.getCompanies();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  public getCompanies() {
    this.companies = new Array<Company>();
    this.authService.loadCompanies().subscribe((data) => {
      this.companies = data;
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const firstname = form.value.firstname;
    const lastname = form.value.lastname;
    const company = form.value.selectedCompany;
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
      authObs.subscribe(
        resData => {
          if (resData.status !== "OK") {
            this.error = resData.body;
          } else {
            this.message = resData.body;
          }
          this.isLoading = false;
          this.router.navigate(['/jobs-portal']);
        },
        errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    } else {
      authObs = this.authService.signup(email, password, firstname, lastname, company);
      authObs.subscribe(
        resData => {
          if (resData.status !== "OK") {
            this.error = resData.body;
          } else
            this.message = resData.body;
          this.isLoading = false;
          this.router.navigate(['/auth']);
        },
        errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    }
    form.reset();
  }
}
