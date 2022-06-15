import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from 'src/app/Models/owner';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private _apiUrl = 'http://localhost:5000/api/Owner';
  constructor(private _http: HttpClient) {}

  updateOwner(owner: Owner, id: number): Observable<any> {
    return this._http.put<number>(this._apiUrl + id, owner);
  }
}
