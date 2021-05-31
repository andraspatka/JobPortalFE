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
  token: string
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  _companies = new BehaviorSubject<Company[]>([]);
  helper = new JwtHelperService();
  userRole:string= "";
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

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
  get token(){
    return this.user.asObservable().pipe(
      map(user =>{
        if(user)
          return user.token
        else
          return null
      })
    )
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
          "email": email,
          "password": password,
          "firstname": firstname,
          "lastname": lastname,
          "role": "0",
          "company": company,
        })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          console.log(resData);
        })
      );
  }

  login(email: string, password: string) {

    return this.http
      .post<AuthResponseData>(
        `${environment.apiUrl}/auth/login`,
        { "email": email, "password": password}
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          console.log(resData);
          this.handleLogin(resData);
        })
      );
  }

  loadCompanies() {
    return this.http.get<any>(`${environment.apiUrl}/auth/companies`)
    .pipe(
      map(resData=>{
        console.log(resData);
        const companies = [];
        if(resData){
          resData.data.map(elem=>{
            companies.push(new Company(elem.attributes.name))
          })
        }

        console.log(companies);
        return companies;
    }),
    tap(list=>{
      this._companies.next(list);
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

  private handleLogin(authentiocationDate: AuthResponseData) {

      const decodedToken = this.helper.decodeToken(authentiocationDate.token);
      const expirationDate = new Date(new Date().getTime() + decodedToken.exp * 1000);
      console.log(decodedToken.role)
      var role = decodedToken.role;
      if(typeof role === "string" || role instanceof String){
        if(role === "2")
          this.userRole = "ADMIN";
        else if(role === "0")
          this.userRole = "EMPLOYEE";
        else if(role === "1")
          this.userRole = "EMPLOYER";
      }else{
        if(role === 2)
          this.userRole = "ADMIN";
        else if(role === 0)
          this.userRole = "EMPLOYEE";
        else if(role === 1)
          this.userRole = "EMPLOYER";
        }

      console.log(this.userRole)
      const user = new User(decodedToken.uuid, decodedToken.email, this.userRole, authentiocationDate.token);
      console.log(user)
      this.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));

      return throwError("LOGIN ERROR");
  }

  // private handleRegister(authentiocationData: AuthResponseData) {
  //   if (authentiocationData.status !== "OK") {
  //     return throwError(authentiocationData.body);
  //   }
  // }

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
      token: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.id,
      userData.username,
      userData.role,
      userData.token
    );

    if (loadedUser) {
      this.user.next(loadedUser);
    }
  }
}
