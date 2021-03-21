import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import {User} from './user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface AuthResponseData {
  loggedUsers: [];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string,firstname:string,lastname:string,company:string,role:string) {
    return this.http
      .post<AuthResponseData>(
        'http://localhost:2222/register',
        {
          email: email,
          password: password,
          firstname:firstname,
          lastname:lastname,
          role:role,
          company:company,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'http://localhost:2222/login',
        {
          email: email,
          password: password
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          console.log(resData);
          this.handleAuthentication(
            resData
          );
        })
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(loggedUsers)
  {
    const loggedUser = [...loggedUsers];
    const jwtToken = loggedUser[0].body;
    const decodedToken = this.helper.decodeToken(jwtToken);
    console.log(decodedToken);
    const user = new User(decodedToken.id,decodedToken.username,decodedToken.role);
    const expirationDate = new Date(new Date().getTime() + decodedToken.exp * 1000);
    console.log(expirationDate);
    this.user.next(user);
  }
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }
}
