import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Owner } from 'src/app/Models/owner';
import { User } from 'src/app/Models/Account/User';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  constructor(private _http: HttpClient) {}
  // private _urlOwner = `http://localhost:5000/api/Owner/`;
  private _urlOwner = 'http://localhost:5000/api/Owner/dashboard/';

  getOwnerInfo(id: number): Observable<User> {
    let response = this._http.get(this._urlOwner + id);

    return response;
  }
}
