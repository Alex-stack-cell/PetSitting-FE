import { Injectable, getNgModuleById } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/Account/User';

@Injectable({
  providedIn: 'root',
})
export class PetSitterService {
  //mock data
  // private _mockUrl: string = 'http://localhost:3000/petSitter'; //swap _apiUrl for _mockUrl during testing

  //live date
  private _addPetSitter: string = 'http://localhost:5000/api/PetSitter';
  private _getPetSitter: string =
    'http://localhost:5000/api/PetSitter/dashboard/';
  private _updatePetSitter: string =
    'http://localhost:5000/api/PetSitter/update/';

  constructor(private _http: HttpClient) {}

  add(petSitter: User): Observable<User> {
    return this._http.post<User>(this._addPetSitter, petSitter);
  }

  getPetSitterInfo(id: number): Observable<User> {
    let response = this._http.get(this._getPetSitter + id);
    return response;
  }

  updatePetSitterInfo(petSitter: User, id: number): Observable<User> {
    let response = this._http.put(this._updatePetSitter + id, petSitter);
    return response;
  }
}
