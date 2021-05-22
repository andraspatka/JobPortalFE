import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { Posting } from './posting.model';
import {environment} from '../../environments/environment';
import { map, tap,catchError, take } from 'rxjs/operators';
import { AuthResponseData, AuthService } from '../auth/auth.service';
import { Category } from './category.model';
import { PostingWithoutId } from './postingWithoutId.model';
import { PostingUpdate } from './postingUpate.model';
import { Application } from './application.model';
export interface PostingResponseData{
  postingList:Posting[]
}
@Injectable({
  providedIn: 'root'
})
export class JobsPortalService {
  constructor(private http:HttpClient,private authService:AuthService) { }

  _postings = new BehaviorSubject<Posting[]>([]);
  _categories = new BehaviorSubject<Category[]>([]);
  _myapplications = new BehaviorSubject<Application[]>([]);
  _postingsapplications = new BehaviorSubject<Application[]>([]);
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
  fetchCategories(){
    return this.http.get<any>(`${environment.apiUrl}/posting/categories`)
    .pipe(
      map(resData=>{
        console.log(resData);
        const categories = [];
        var index=1;
        resData.map(elem=>{
          categories.push(new Category(index,elem.name))
          index++;
        })
        console.log(categories);
        return categories;
    }),
    tap(categoryList=>{
      this._categories.next(categoryList);
    })
    )
  }
  fetchPostings(){
    return this.http.get<any>(`${environment.apiUrl}/posting/postings`)
    .pipe(
      map(resData=>{
        console.log(resData);
        const postings = [];
        resData.map(elem=>{
          postings.push(new Posting(elem.id,elem.postedById,elem.postedAt,
            elem.deadline,elem.numberOfViews,elem.name,elem.description,elem.categoryId,elem.requirements))
        })
        console.log(postings);
        return postings;
    }),
    tap(postings=>{
      this._postings.next(postings);
    })
    )
  }

  addPosting(posting:PostingWithoutId){
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
    })
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        console.log(resData);
        this.handleOperatio(resData);
      })
    );
  }

  updatePosting(posting:PostingUpdate){
    return this.http.patch<AuthResponseData>(`${environment.apiUrl}/posting/postings`,
    {
      "id":posting.id,
      "deadline":posting.deadline,
      "name":posting.name,
      "description":posting.description,
      "requirements":posting.requirements
    })
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        console.log(resData);
        this.handleOperatio(resData);
      })
    );
  }

  deletePosting(id:number){
    return this.http.delete<AuthResponseData>(`${environment.apiUrl}/posting/postings/${id}`)
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        console.log(resData);
        this.handleOperatio(resData);
      })
    );
  }
  getPosting(id:number){
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
    if(authentiocationData.status !== "OK"){
      return throwError(authentiocationData.body);
    }
  }

  onApplyToPosting(application:Application){
    return this.http.post<AuthResponseData>(`${environment.apiUrl}/posting/applications`,
    {
      "numberYearsExperience":application.numberYearsExperience,
      "workingExperience":application.workingExperience,
      "education":application.education,
      "applicationDate":application.applicationDate,
      "applicantId":application.applicantId,
      "postingId":application.postingId,
    })
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        console.log(resData);
        this.handleOperatio(resData);
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
    console.log('fetching applications for user with id: ' + id);
    return this.http.get<Application[]>(`${environment.apiUrl}/posting/applications/user/${id}`)
    .pipe(
      map(resData=>{
        console.log(resData);
        var index=1;
        const myapplications = [];
        resData.map(elem=>{
          myapplications.push(new Application(elem.numberYearsExperience,elem.workingExperience,elem.education,
            elem.applicationDate,elem.applicantId,elem.postingId,index));
            index++;
        })
        console.log(myapplications);
        return myapplications;
    }),
    tap(list=>{
      this._myapplications.next(list);
    })
    )
  }
  fetchPostingsApplications(postingId:number){
    return this.http.get<Application[]>(`${environment.apiUrl}/posting/applications/posting/${postingId}`)
    .pipe(
      map(resData=>{
        console.log(resData);
        var index=1;
        const applications = [];
        resData.map(elem=>{
          applications.push(new Application(elem.numberYearsExperience,elem.workingExperience,elem.education,
            elem.applicationDate,elem.applicantId,elem.postingId,index));
            index++;
        })
        console.log(applications);
        return applications;
    }),
    tap(list=>{
      this._postingsapplications.next(list);
    })
    )
  }

  onDeleteApplication(id:number){
    console.log("want to delete application with id:"+id);
    return this.http.delete<AuthResponseData>(`${environment.apiUrl}/posting/applications/${id}`)
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        console.log(resData);
        this.handleOperatio(resData);
      })
    );
  }
}
