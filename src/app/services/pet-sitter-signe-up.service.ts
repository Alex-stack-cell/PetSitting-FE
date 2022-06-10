import { Injectable, getNgModuleById } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetSitter } from '../Models/petSitter';

@Injectable({
  providedIn: 'root',
})
export class PetSitterSigneUpService {
  //live date
  private _apiUrl: string = 'http://localhost:5000/api/PetSitter';
  //mock data
  private _mockUrl: string = 'http://localhost:3000/petSitter'; //swap _apiUrl for _mockUrl during testing

  constructor(private _http: HttpClient) {}

  add(petSitter: PetSitter): Observable<PetSitter> {
    return this._http.post<PetSitter>(this._apiUrl, petSitter);
  }
}
