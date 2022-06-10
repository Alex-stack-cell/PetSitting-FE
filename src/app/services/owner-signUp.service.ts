import { getLocaleCurrencyCode } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { getNgModuleById, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Owner } from '../Models/owner';

@Injectable({
  providedIn: 'root',
})
export class OwnerSignUpService {
  private _url: string = 'http://localhost:3000/owner';

  constructor(private _http: HttpClient) {}
  add(owner: Owner): Observable<Owner> {
    return this._http.post<Owner>(this._url, owner);
  }
}
