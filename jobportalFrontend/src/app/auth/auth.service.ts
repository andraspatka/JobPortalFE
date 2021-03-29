import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import {User} from './user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
export interface AuthResponseData {
  status:string,
  body:string
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  helper = new JwtHelperService();
  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string,firstname:string,lastname:string,company:string) {
    return this.http
      .post<AuthResponseData>(
        'http://localhost:2222/users',
        {
          email: email,
          password: password,
          firstname:firstname,
          lastname:lastname,
          role:'EMPLOYEE',
          company:company,
        })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleRegister(resData);
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
          this.handleLogin(resData);
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

  private handleLogin(authentiocationDate:AuthResponseData)
  {
    if(authentiocationDate.status === "OK"){
      const jwtToken = authentiocationDate.body;
      const decodedToken = this.helper.decodeToken(jwtToken);
      const user = new User(decodedToken.id,decodedToken.username,decodedToken.role);
      const expirationDate = new Date(new Date().getTime() + decodedToken.exp * 1000);
      console.log(expirationDate);
      this.user.next(user);
    }else{
      console.log(authentiocationDate.body);
      return throwError(authentiocationDate.body);
    }
  }

  private handleRegister(authentiocationData:AuthResponseData){
    if(authentiocationData.status !== "OK"){
      return throwError(authentiocationData.body);
    }
  }
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }
}
