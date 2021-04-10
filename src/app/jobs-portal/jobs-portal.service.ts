import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { Posting } from './posting.model';
import {environment} from '../../environments/environment';
import { map, tap,catchError } from 'rxjs/operators';
import { AuthResponseData } from '../auth/auth.service';
import { Category } from './category.model';
import { PostingWithoutId } from './postingWithoutId.model';
import { PostingUpdate } from './postingUpate.model';
export interface PostingResponseData{
  postingList:Posting[]
}
@Injectable({
  providedIn: 'root'
})
export class JobsPortalService {
  constructor(private http:HttpClient) { }

  _postings = new BehaviorSubject<Posting[]>([]);
  _categories = new BehaviorSubject<Category[]>([]);

  get postings(){
    return this._postings.asObservable();
  }

  get categories(){
    return this._categories.asObservable();
  }

  fetchCategories(){
    return this.http.get<any>(`${environment.apiUrl}/categories`)
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
    return this.http.get<any>(`${environment.apiUrl}/postings`)
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
    return this.http.post<AuthResponseData>(`${environment.apiUrl}/postings`,
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
    return this.http.patch<AuthResponseData>(`${environment.apiUrl}/postings`,
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
    return this.http.delete<AuthResponseData>(`${environment.apiUrl}/postings/${id}`)
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
}
