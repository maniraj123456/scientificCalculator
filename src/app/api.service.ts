import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private apiUrl = 'http://localhost:5141'; 

  constructor(private http: HttpClient) { }

  // Example GET request
  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/Values`);
  }

  // Example POST request
  postData(body: any): Observable<any> {
    const queryparams = {'expression':body.expression};
    return  this.http.post<any>(`${this.apiUrl}/api/Values`,queryparams);
  }
}

