import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
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
    let bearer='';
    this.authService.token.pipe(
      take(1),
      map(token=>{
        if (!token){
          throw new Error('Token not found');
        }
        bearer=token;
      })
    ).subscribe();
    console.log(bearer);
    return this.http.get<any>(`${environment.apiUrl}/requests`,{
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${bearer}`)
    })
    .pipe(
      map(resData=>{
        console.log(resData);
        const myrequests = [];
        if(resData){
          resData.data.map(elem=>{
            console.log(elem.id)
            console.log(elem.attributes)
            myrequests.push(new Requests(elem.id, elem.attributes.requested_by, elem.attributes.company,
              elem.attributes.created_at, elem.attributes.status))
          })
        }
        console.log(myrequests);
        return myrequests;
    }),
    tap(list=>{
      this._myrequets.next(list);
    })
    )
  }

  handleRequest(id:string,status:string){
    let bearer='';
    this.authService.token.pipe(
      take(1),
      map(token=>{
        if (!token){
          throw new Error('Token not found');
        }
        bearer=token;
      })
    ).subscribe();
    return this.http.patch<any>(`${environment.apiUrl}/requests`,
    {
      "id":id,
      "status":status
    },{
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${bearer}`)
    })
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        console.log(resData);
      })
    );
  }

  sendRequestToBecomeEmployer(){
    let bearer=''
    this.authService.token.pipe(
      take(1),
      map(token=>{
        if (!token){
          throw new Error('Token not found');
        }
        bearer=token
      })
    ).subscribe();
    console.log(bearer);
    return this.http.post<any>(`${environment.apiUrl}/requests`,{},{
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${bearer}`)
    })
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
