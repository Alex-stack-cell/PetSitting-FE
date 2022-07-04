import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/Models/Account/User';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  constructor(private _http: HttpClient) {}

  //mock data
  // private _mockUrl: string = 'http://localhost:3000/owner';

  //live date
  private _addOwner: string = 'http://localhost:5000/api/Owner';
  private _getOwner = 'http://localhost:5000/api/Owner/dashboard/';
  private _updateOwner = 'http://localhost:5000/api/Owner/update/';

  getOwnerInfo(id: number): Observable<User> {
    let response = this._http.get(this._getOwner + id);

    return response;
  }

  add(owner: User): Observable<User> {
    return this._http.post<User>(this._addOwner, owner); //swap _addOwner for _mockUrl during testing
  }

  updateOwner(
    owner: User,
    id: number | undefined
  ): Observable<any> | undefined {
    let response = this._http.put(this._updateOwner + id, owner);
    return response;
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
