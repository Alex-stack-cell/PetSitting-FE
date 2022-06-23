import { Injectable, getNgModuleById } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetSitter } from '../../Models/petSitter';
import { User } from 'src/app/Models/Account/User';

@Injectable({
  providedIn: 'root',
})
export class PetSitterSignUp {
  //live date
  private _apiUrl: string = 'http://localhost:5000/api/PetSitter';
  //mock data
  private _mockUrl: string = 'http://localhost:3000/petSitter'; //swap _apiUrl for _mockUrl during testing

  constructor(private _http: HttpClient) {}

  add(petSitter: User): Observable<User> {
    return this._http.post<User>(this._apiUrl, petSitter);
  }
}
