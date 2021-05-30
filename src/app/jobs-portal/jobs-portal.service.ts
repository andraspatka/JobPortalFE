import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { Posting } from './posting.model';
import {environment} from '../../environments/environment';
import { map, tap,catchError, take } from 'rxjs/operators';
import { AuthResponseData, AuthService } from '../auth/auth.service';
import { Category } from './category.model';
import { PostingWithoutId } from './postingWithoutId.model';
import { PostingUpdate } from './postingUpate.model';
import { Application } from './application.model';
import { Statistics } from './statistic.model';
export interface PostingResponseData{
  postingList:Posting[]
}
export interface CategoryResponseData{
  data: []
}
@Injectable({
  providedIn: 'root'
})
export class JobsPortalService {
  constructor(private http:HttpClient,private authService:AuthService) {}

  _postings = new BehaviorSubject<Posting[]>([]);
  _categories = new BehaviorSubject<Category[]>([]);
  _myapplications = new BehaviorSubject<Application[]>([]);
  _postingsapplications = new BehaviorSubject<Application[]>([]);
  _statistics = new BehaviorSubject<Statistics[]>([]);


  header:{}
  authToken:string = "";

  get statistics(){
    return this._statistics.asObservable();
  }

  get postings(){
    return this._postings.asObservable();
  }

  get categories(){
    return this._categories.asObservable();
  }

  get myapplications(){
    return this._myapplications.asObservable();
  }
  get postingsapplications(){
    return this._postingsapplications.asObservable();
  }

  fetchStatistics(){
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
    return this.http.get<any>(`${environment.apiUrl}/statistics`, {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${bearer}`)
    })
    .pipe(
      map(resData=>{
        const statistics = [];
        if(resData){
          resData.data.map(elem=>{
            statistics.push(new Statistics(elem.attributes.type,elem.attributes.details))
          })
        }
        return statistics;
    }),
    tap(list=>{
      this._statistics.next(list);
    })
    )
  }



  fetchCategories(){
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
    console.log(bearer)
    return this.http.get<any>(`${environment.apiUrl}/category/categories`, {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${bearer}`)
    })
    .pipe(
      map(resData=>{
        console.log(resData);
        const categories = [];
        if(resData){
          var index=1;
          resData.data.map(elem=>{
            categories.push(new Category(index,elem.attributes.name))
            index++;
          })
        }

        console.log(categories);
        return categories;
    }),
    tap(categoryList=>{
      this._categories.next(categoryList);
    })
    )
  }

  fetchPostings(){
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
    return this.http.get<any>(`${environment.apiUrl}/posting/postings`, {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${bearer}`)
    })
    .pipe(
      map(resData=>{
        const postings = [];
        if(resData){
            resData.data.map(elem=>{
            postings.push(new Posting(elem.attributes.id,elem.attributes.postedById,elem.attributes.postedAt,
              elem.attributes.deadline,elem.attributes.numberOfViews,
              elem.attributes.name,elem.attributes.description,elem.attributes.categoryId,
              elem.attributes.requirements))
          })
        }
        return postings;
    }),
    tap(postings=>{
      this._postings.next(postings);
    })
    )
  }

  addPosting(posting:PostingWithoutId){
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

    return this.http.post<AuthResponseData>(`${environment.apiUrl}/posting/postings`,
    {
      "postedById":posting.postedById,
      "postedAt":posting.postedAt,
      "deadline":posting.deadline,
      "numberOfViews":0,
      "name":posting.name,
      "description":posting.description,
      "categoryId":+posting.categoryId,
      "requirements":posting.requirements
    }, {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${bearer}`)
    })
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        console.log(resData);
        //this.handleOperatio(resData);
      })
    );
  }

  updatePosting(posting:PostingUpdate){
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
    return this.http.patch<AuthResponseData>(`${environment.apiUrl}/posting/postings`,
    {
      "id":posting.id,
      "deadline":posting.deadline,
      "name":posting.name,
      "description":posting.description,
      "requirements":posting.requirements
    },{
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${bearer}`)
    })
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        console.log(resData);
        //this.handleOperatio(resData);
      })
    );
  }

  deletePosting(id:string){
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
    return this.http.delete<AuthResponseData>(`${environment.apiUrl}/posting/postings/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${bearer}`)
    })
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        console.log(resData);
        //this.handleOperatio(resData);
      })
    );
  }
  getPosting(id:string){
    let item:Posting;
    console.log(id);
    this.postings.subscribe((list:Posting[])=>{
      item = list.find(p=>p.id === id)
    })
    console.log(item);
    return item;
  }
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    return throwError(errorMessage);
  }
  private handleOperatio(authentiocationData:AuthResponseData){
    if(authentiocationData.token === ""){
      return throwError("Token is null");
    }
  }

  onApplyToPosting(application:Application){
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
    return this.http.post<any>(`${environment.apiUrl}/application/applications`,
    {
      "numberYearsExperience":application.experience,
      "workingExperience":application.work_experience,
      "education":application.education,
      "applicationDate":application.date_applied,
      "applicantId":application.user_id,
      "postingId":application.posting_id,
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

  fetchMyApplications(){

    let id='';
    this.authService.userId.pipe(
      take(1),
      map(userId=>{
        if (!userId){
          throw new Error('User not found');
        }
        id=userId;
      })
    ).subscribe();
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
    console.log('fetching applications for user with id: ' + id);
    return this.http.get<any>(`${environment.apiUrl}/application/applications/user/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${bearer}`)
    })
    .pipe(
      map(resData=>{
        console.log(resData);
        const myapplications = [];
        if(resData){
          resData.data.map(elem=>{
            myapplications.push(new Application(elem.attributes.experience,elem.attributes.work_experience,elem.attributes.education,
              elem.attributes.date_applied,elem.attributes.user_id,elem.attributes.posting_id,elem.id));
          })
        }
        console.log(myapplications);
        return myapplications;
    }),
    tap(list=>{
      this._myapplications.next(list);
    })
    )
  }
  fetchPostingsApplications(postingId:string){
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
    return this.http.get<any>(`${environment.apiUrl}/application/applications/posting/${postingId}`,{
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${bearer}`)
    })
    .pipe(
      map(resData=>{
        console.log(resData);
        const applications = [];
        if(resData){
          resData.data.map(elem=>{
          applications.push(new Application(elem.attributes.experience,elem.attributes.work_experience,elem.attributes.education,
            elem.attributes.date_applied,elem.attributes.user_id,elem.attributes.posting_id,elem.id));
          })
        }

        console.log(applications);
        return applications;
    }),
    tap(list=>{
      this._postingsapplications.next(list);
    })
    )
  }

  onDeleteApplication(id:string){
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
    console.log("want to delete application with id:"+id);
    return this.http.delete<any>(`${environment.apiUrl}/application/applications/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${bearer}`)
    })
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        console.log(resData);
        //this.handleOperatio(resData);
      })
    );
  }
}
