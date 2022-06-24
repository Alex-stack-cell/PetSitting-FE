import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from 'src/app/Models/pet';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private _apiUrl = 'http://localhost:5000/api/Pet/';

  constructor(private _http: HttpClient) {}

  addNewPet(pet: Pet): Observable<Pet> {
    return this._http.post(this._apiUrl, pet);
  }
}
