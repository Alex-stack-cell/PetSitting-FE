import { getLocaleCurrencyCode } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { getNgModuleById, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { Owner } from '../Models/owner';

@Injectable({
  providedIn: 'root',
})
export class OwnerSignUpService {
  //live date
  private _apiUrl: string = 'http://localhost:5000/api/Owner';
  //mock data
  private _mockUrl: string = 'http://localhost:3000/owner';

  constructor(private _http: HttpClient) {}

  add(owner: Owner): Observable<Owner> {
    return this._http.post<Owner>(this._apiUrl, owner); //swap _apiUrl for _mockUrl during testing
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
