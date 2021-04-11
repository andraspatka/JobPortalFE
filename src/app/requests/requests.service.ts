import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, map, take, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthResponseData, AuthService } from "../auth/auth.service";
import { Requests } from "./requests.model";
export interface RequestResponseData {
  status: string,
  body: string
}
@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http:HttpClient,private authService:AuthService) { }

  _myrequets = new BehaviorSubject<Requests[]>([]);

  get myrequests (){
    return this._myrequets.asObservable();
  }

  fetchMyRequests(){
    let email='';
    this.authService.username.pipe(
      take(1),
      map(username=>{
        if (!username){
          throw new Error('User not found');
        }
        email=username;
      })
    ).subscribe();
    console.log(email);
    return this.http.get<Requests[]>(`${environment.apiUrl}/request/${email}`)
    .pipe(
      map(resData=>{
        console.log(resData);
        const myrequests = [];
        resData.map(elem=>{
          myrequests.push(new Requests(elem.id,elem.requestedByFirstName,elem.requestedByLastName,
            elem.requestedByEmail,elem.status))
        })
        console.log(myrequests);
        return myrequests;
    }),
    tap(list=>{
      this._myrequets.next(list);
    })
    )
  }

  handleRequest(id:number,status:string){
      return this.http.patch<RequestResponseData>(`${environment.apiUrl}/request`,
      {
        "id":id,
        "status":status
      })
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          console.log(resData);
        })
      );
  }

  sendRequestToBecomeEmployer(){
    let email='';
    this.authService.username.pipe(
      take(1),
      map(username=>{
        if (!username){
          throw new Error('User not found');
        }
        email=username;
      })
    ).subscribe();
    console.log(email + " vrea sa devina employer");
    return this.http.post<AuthResponseData>(`${environment.apiUrl}/request/${email}`,{})
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        console.log(resData);
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
}
