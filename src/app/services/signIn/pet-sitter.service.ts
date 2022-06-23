import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/Account/User';

@Injectable({
  providedIn: 'root',
})
export class PetSitterService {
  constructor(private _http: HttpClient) {}
  private _urlPetSitter = 'http://localhost:5000/api/PetSitter/dashboard/';

  getPetSitterInfo(id: number): Observable<User> {
    let response = this._http.get(this._urlPetSitter + id);
    return response;
  }
}
