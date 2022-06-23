import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/Account/User';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private _apiUrl = 'http://localhost:5000/api/Owner/update/';
  private auth_tkn = localStorage.getItem('auth_tkn');
  constructor(private _http: HttpClient) {}

  updateOwner(
    owner: User,
    id: number | undefined
  ): Observable<any> | undefined {
    return this._http.put(this._apiUrl + id, owner);
  }

  getOwnerInfo(id: number): Observable<User> {
    let response = this._http.get(
      'http://localhost:5000/api/Owner/dashboard/' + id
    );

    return response;
  }
}
