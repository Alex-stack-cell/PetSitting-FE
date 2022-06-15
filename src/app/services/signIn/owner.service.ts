import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Owner } from 'src/app/Models/owner';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  constructor(private _http: HttpClient) {}
  private _urlOwner = `http://localhost:5000/api/Owner/`;

  getInfo(id: number): Observable<any> {
    let response = this._http.get(this._urlOwner + id);

    return response;
  }
}
