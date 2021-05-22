import {Injectable} from '@angular/core';
import {throwError, BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from './user.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
import {Company} from "./company.model";

export interface AuthResponseData {
  status: string,
  body: string
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  helper = new JwtHelperService();
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json'});
  options = { headers: this.headers };
  get role(){
    return this.user.asObservable().pipe(
      map(user=>{
        if(user)
          return user.role;
        else
          return null;
      })
    );
  }
  get username(){
    return this.user.asObservable().pipe(
      map(user=>{
        if(user)
          return user.username;
        else
          return null;
      })
    );
  }
  get userId() {
    return this.user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }

  get userIsAuthenticated() {
    return this.user.asObservable().pipe(
      map(user => {
        if (user) {
          return user;
        } else {
          return false;
        }
      })
    );
  }
  signup(email: string, password: string,firstname:string,lastname:string,company:string) {
    return this.http
      .post<AuthResponseData>(
        `${environment.apiUrl}/auth/register`,
        {
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname,
          role: 'EMPLOYEE',
          company: company,
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
        `${environment.apiUrl}/auth/login`,
        {
          email: email,
          password: password
        },this.options
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          console.log(resData);
          this.handleLogin(resData);
        })
      );
  }

  loadCompanies(): Observable<Array<Company>> {
    return this.http.get<Array<Company>>(`${environment.apiUrl}/auth/companies`);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    return throwError(errorMessage);
  }

  private handleLogin(authentiocationDate: AuthResponseData) {
    if (authentiocationDate.status === "OK") {
      const jwtToken = authentiocationDate.body;
      const decodedToken = this.helper.decodeToken(jwtToken);
      const expirationDate = new Date(new Date().getTime() + decodedToken.exp * 1000);
      const user = new User(decodedToken.id, decodedToken.username, decodedToken.role);
      console.log(expirationDate);
      this.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
    } else {
      console.log(authentiocationDate.body);
      return throwError(authentiocationDate.body);
    }
  }

  private handleRegister(authentiocationData: AuthResponseData) {
    if (authentiocationData.status !== "OK") {
      return throwError(authentiocationData.body);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
  }

  autoLogin() {
    const userData: {
      id: string;
      username: string;
      role: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.id,
      userData.username,
      userData.role
    );

    if (loadedUser) {
      this.user.next(loadedUser);
    }
  }
}
